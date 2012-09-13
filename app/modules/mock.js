(function(Mock) {
	Mock.Model = Backbone.Model.extend({});
	Mock.Collection = Backbone.Collection.extend({});
	Mock.Router = Backbone.Router.extend({});
	var shared =  Suds.module("shared");
	Mock.Model.Mock = Backbone.Model.extend({
		getMockFields:function(callback){
			var mdl = this;
			var form_data = {
				id: mdl.get('id')
			};
			$.ajax({
				type: "GET",
				dataType: "json",
				url: base + "index.php/mock/GetMocksFields",
				data: form_data,
				success: function(msg) {
					callback(msg);
					//console.log(msg);
					/*
					var count = msg.UserMocks.length;
					for (var i = 0; i < count; i++) {
						var um = new Mock.Model.Mock({
							name: msg.UserMocks[i].name,
							id:msg.UserMocks[i].id,
							max:msg.UserMocks[i].max,
							min: msg.UserMocks[i].min
						});
						col.add(um);
					}
					*/
				},
				error: function(msg) {
					console.log(msg);
				}
			});
		}
	});
	Mock.Model.Field = Backbone.Model.extend({});
	
	Mock.Collection.Mocks = Backbone.Collection.extend({
		model: Mock.Model.Mock,
		loadData: function(callback, failcallback) {
			var col = this;
			var form_data = {
				userid: Suds.app.currentUser.get('userId')
				
			};
			$.ajax({
				type: "GET",
				dataType: "json",
				url: base + "index.php/mock/GetUserMocks",
				data: form_data,
				success: function(msg) {
					var count = msg.UserMocks.length;
					for (var i = 0; i < count; i++) {
						var um = new Mock.Model.Mock({
							name: msg.UserMocks[i].name,
							id:msg.UserMocks[i].id,
							max:msg.UserMocks[i].max,
							min: msg.UserMocks[i].min
						});
						col.add(um);
					}
				},
				error: function(msg) {
					console.log(msg);
				}
			});
		}
	});
	
	
	Mock.Collection.MockFields = Backbone.Collection.extend({
		model: Mock.Model.Field
	});
	
	
	Mock.Views.MocksTableRow  = Backbone.View.extend({
	    tagName: "tr",
		template: _.template("<td class='mock' id='<%=id%>'><%=name%></td>"),
	    events: {
	        "click .mock": "_showMock"
	    },
	    initialize: function () {
	        _.bindAll(this, "render");
	    },
		_showMock:function(e){
			var mock = shared.userMocks.get(e.currentTarget.id);
			var view=this;
			var info = new Mock.Views.MockInfo({ model: mock });
			info.render(function (el) {
				$("#mock-info").html(el);
			});
		
			var callback = function(msg){
				var count = msg.MockFields.length;
				var mockFields = new Mock.Collection.MockFields();
				
				for (var i = 0; i < count; i++) {
					mockFields.add(msg.MockFields[i]);
				}
				
	            var fieldTable = new Mock.Views.FieldTable({
	                collection:mockFields
	            });
           
	            fieldTable.render(function(el) {
	                $("#mock-info").html(el);
	            });
			

			}
			mock.getMockFields(callback);
			

		},
	    render: function () {
			var view=this;
			var html = view.template(view.model.toJSON());
			$(this.el).append(html);
	        return this;
	    }
	});

	Mock.Views.MocksTable  = Backbone.View.extend({
	    initialize: function () {
	        _.bindAll(this, "render");
	        this.collection.bind("all", this.render);
	    },
	    render: function () {
			var view =this;
	        var table = $("#mocksTable tbody");
	        table.empty();
	        this.collection.each(function (singelMock) {
	            var row = new Mock.Views.MocksTableRow({ model: singelMock });
	            table.append(row.render().el);
	        });
	        return this;
	    }
	});
	
	
	
	Mock.Views.FieldTableRow  = Backbone.View.extend({
	    tagName: "tr",
		template: _.template("<td class='field' id='<%=id%>'><%=name%></td><td><%=fieldoptions%></td><td><%=predefefinedSampleDataType%></td><td><%=sampleData%></td>"),

	    initialize: function () {
	        _.bindAll(this, "render");
	    },

	    render: function () {
			var view=this;
			var html = view.template(view.model.toJSON());
			$(this.el).append(html);
	        return this;
	    }
	});
	
	Mock.Views.FieldTable  = Backbone.View.extend({
	    initialize: function () {
	        _.bindAll(this, "render");
	        this.collection.bind("all", this.render);
	    },
	    render: function () {
			var view =this;
	        var table = $("#mock-fields tbody");
	        table.empty();
	        this.collection.each(function (singelField) {
	            var row = new Mock.Views.FieldTableRow({ model: singelField });
	            table.append(row.render().el);
	        });
	        return this;
	    }
	});
	
	
	Mock.Views.MockInfo  = Backbone.View.extend({
		template: _.template("<div class='info'><ul class='unstyled'><li><h2>Name: <%=name%></h2></li><li>Min: <%=min%></li><li>Max: <%=max%></li></ul><div id='code-example'></div><h3>Fields</h3><table id='mock-fields' class='table table-bordered'><thead><tr><th>Name</th><th>Options</th><th>Type</th><th>Sample Data</th></thead><tbody><tbody></table></div>"),
	    initialize: function () {
	        _.bindAll(this, "render");
	    },
		_buildJSONPExample:function(){
	
			var code = "$.ajax({ type: 'GET',dataType: 'jsonp',jsonpCallback: 'moxsvc',url: '" + Suds.app.externalMoxURL + "?id=" + this.model.get('id') + "',success: function(data) {console.log(data)}});";
			
			
			var html="<code>" + code + "</code>";
	
			$('#code-example').html(html);
		},
	    render: function (done) {
			var view=this;
		
            view.el.innerHTML = view.template(view.model.toJSON());
            done(view.el);
			
			view._buildJSONPExample();
	        return this;
	    }
	});
	

})(Suds.module("mock"));