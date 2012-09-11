(function(Mock) {
	Mock.Model = Backbone.Model.extend({});
	Mock.Collection = Backbone.Collection.extend({});
	Mock.Router = Backbone.Router.extend({});
	var shared =  Suds.module("shared");
	Mock.Model.Mock = Backbone.Model.extend({});
	Mock.Collection.Mocks = Backbone.Collection.extend({
		model: Mock.Model.Mock,
		loadData: function(callback, failcallback) {
			var col = this;
			var form_data = {
				userid: 1
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
	
	Mock.Views.MockInfo  = Backbone.View.extend({
		template: _.template("<div class='info'><%=name%></div>"),
	    initialize: function () {
	        _.bindAll(this, "render");
	    },
	    render: function (done) {
			var view=this;
            view.el.innerHTML = view.template(view.model.toJSON());
            done(view.el);
	        return this;
	    }
	});
	

})(Suds.module("mock"));