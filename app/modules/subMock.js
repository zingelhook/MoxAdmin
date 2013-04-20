(function(SubMock) {

    SubMock.Model = Backbone.Model.extend({});
    SubMock.Collection = Backbone.Collection.extend({});
    SubMock.Router = Backbone.Router.extend({});


    SubMock.Model.SubMock = Backbone.Model.extend({});
    SubMock.Collection.SubMocks = Backbone.Collection.extend({
        model: SubMock.Model.SubMock
    });



    SubMock.Views.SubMocksTable = Backbone.View.extend({
        initialize: function() {
            _.bindAll(this, "render");
            console.log(this.collection);
            this.collection.bind("all", this.render);
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
            var mock = shared.userMocks.get(e.currentTarget.id);
            mock.set({
                mode: 'none'
            });

            var view = this;
            var info = new Mock.Views.MockInfo({
                model: mock
            });
            info.render(function(el) {
                $("#mock-info").html(el);
            });

            var callback = function(msg) {
                var count = msg.MockFields.length;
                var mockFields = new mockfield.Collection.MockFields();
                shared.currentMockFields = mockFields;

                for (var i = 0; i < count; i++) {
                    var mf = new mockfield.Model.Field({
                        options: msg.MockFields[i].fieldoptions,
                        id: msg.MockFields[i].id,
                        name: msg.MockFields[i].name,
                        predefefinedSampleDataType: msg.MockFields[i].predefefinedSampleDataType,
                        predefinedSampleDataId: msg.MockFields[i].predefinedSampleDataId,
                        sampleData: msg.MockFields[i].sampleData
                    })

                    mockFields.add(mf);
                }

                var fieldTable = new Mock.Views.FieldTable({
                    collection: mockFields
                });

                fieldTable.render(function(el) {
                    $("#mock-info").html(el);
                });

            }
            mock.getMockFields(callback);
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