(function(SubMock) {



    var shared = Suds.module("shared");
    var mock = Suds.module("mock");
    var mockField = Suds.module("mockfield");

    SubMock.Model = Backbone.Model.extend({});
    SubMock.Collection = Backbone.Collection.extend({});
    SubMock.Router = Backbone.Router.extend({});


    SubMock.Model.SubMock = Backbone.Model.extend({});
    SubMock.Collection.SubMocks = Backbone.Collection.extend({
        model: SubMock.Model.SubMock
    });


    SubMock.Views.AddSubMock = Backbone.View.extend({
        initialize: function() {
            _.bindAll(this, "render");
        },
        events: {
            "click .close": "_closeModal",
            "click #saveSubMock": "_saveSubMock"
        },
        _saveSubMock: function(e) {
            var view = this;
            e.preventDefault();
            //save locic here
            //loop through each row
            var subM = new SubMock.Collection.SubMocks();
            $(".sub-mock").each(function(index) {
                if ($("#" + $(this).attr('id') + " i").hasClass("icon-ok")) {
                    var m = new mock.Model.Mock();
                    var id = $(this).attr('id').split("_")[1];
                    m = shared.userMocks.get(id);
                    var sm = new SubMock.Model.SubMock({
                        dataTemplateId: view.model.get('id'),
                        childTemplateId: id,
                        objectName: m.get('name')
                    })
                  subM.add(sm);                    
                }
            });

            //call model to add sub mocks.
            view.model.addSubMocks(subM);
       
            $('#addSubMock').modal('hide');
        },
        _closeModal: function(e) {
            e.preventDefault();
            $('#addSubMock').modal('hide')
        },
        template: "app/templates/addSubMock.html",
        render: function(done) {
            var view = this;
            // Fetch the template, render it to the View element and call done.
            Suds.fetchTemplate(this.template, function(tmpl) {
                view.el.innerHTML = tmpl({});
                done(view.el);

                //var mockTable= new mock.Views.SubMocksTable();
                var mocksTable = new mock.Views.SubMocksTable({
                    collection: shared.userMocks
                });

                mocksTable.render(function(el) {
                    $("#mock-list").html(el);
                });
            });
            return this;
        }
    });

    SubMock.Views.SubMocksTable = Backbone.View.extend({
        initialize: function() {
            _.bindAll(this, "render");
        },
        render: function() {
            var view = this;
            var table = $("#subMocksTable tbody");
            table.empty();
            this.collection.each(function(singelSubMock) {
                var row = new SubMock.Views.SubMocksTableRow({
                    model: singelSubMock
                });
                table.append(row.render().el);
            });
            if (this.collection.length === 0) {
                $('#new-user').show();
            } else {
                $('#new-user').hide();
            }
            return this;
        }
    });

    SubMock.Views.SubMocksTableRow = Backbone.View.extend({
        tagName: "tr",
        template: _.template("<td class='mock' id='<%=childTemplateId%>'><%=objectName%></td>"),
        events: {
            "click .mock": "_showSubMock"
        },
        initialize: function() {
            _.bindAll(this, "render");
        },
        _showSubMock: function(e) {
            var view = this;

            var smock = shared.userMocks.get(e.currentTarget.id);

            smock.set({
                mode: 'none'
            });

            var info = new mock.Views.MockInfo({
                model: smock
            });

            info.render(function(el) {
                $("#mock-info").html(el);
            });

            var callback = function(msg) {
                var count = msg.MockFields.length;
                var mockFields = new mockField.Collection.MockFields();
                //shared.currentMockFields = mockFields;

                for (var i = 0; i < count; i++) {
                    var mf = new mockField.Model.Field({
                        options: msg.MockFields[i].fieldoptions,
                        id: msg.MockFields[i].id,
                        name: msg.MockFields[i].name,
                        predefefinedSampleDataType: msg.MockFields[i].predefefinedSampleDataType,
                        predefinedSampleDataId: msg.MockFields[i].predefinedSampleDataId,
                        sampleData: msg.MockFields[i].sampleData
                    })

                    mockFields.add(mf);
                }

                var fieldTable = new mock.Views.FieldTable({
                    collection: mockFields
                });

                fieldTable.render(function(el) {
                    //$("#mock-info").html(el);
                });

            }
            smock.getMockFields(callback);
        },
        render: function() {
            var view = this;
            var html = view.template(view.model.toJSON());
            $(this.el).append(html);
            return this;
        }
    });



    // This will fetch the tutorial template and render it.
    SubMock.Views.Main = Backbone.View.extend({
        template: "app/templates/submock.html",
        render: function(done) {
            var view = this;
            // Fetch the template, render it to the View element and call done.
            Suds.fetchTemplate(this.template, function(tmpl) {
                view.el.innerHTML = tmpl({});
                done(view.el);
            });
        }
    });

})(Suds.module("submock"));