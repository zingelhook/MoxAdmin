(function(Mock) {
	Mock.Model = Backbone.Model.extend({});
	Mock.Collection = Backbone.Collection.extend({});
	Mock.Router = Backbone.Router.extend({});

	Mock.Model.Mock = Backbone.Model.extend({});
	Mock.Collection.Mocks = Backbone.Collection.extend({
		model: Mock.Model.Mock,
		loadData: function(callback, failcallback) {
			var col = this;
			console.log('loading data');
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
							name: msg.UserMocks[i].name
						});
						col.add(um);
					}
					console.log(msg);

				},
				error: function(msg) {
					console.log(msg);
				}

			});
		}
	});
	
	
	Mock.Views.MocksTableRow  = Backbone.View.extend({
	    tagName: "tr",
		template: _.template("<td><%=name%></td>"),
	    events: {
	        "click .delete": "deleteZone"
	    },
	    initialize: function () {
	        _.bindAll(this, "render");
	    },
	    render: function () {
			var view=this;
	        //$(this.el).append($("#dns-zone-item-template").tmpl(this.model.toJSON()));
			//$(this.el).append($("<td>name</td>").tmpl(this.model.toJSON()));
			console.log(this.model.toJSON());
			var html = view.template(view.model.toJSON());
			$(this.el).append(html);
	        return this;
	    },
	    deleteZone: function () {
	        forms.confirmDialog("Are you sure you want to delete this zone? This cannot be undone.", function () {
	            this.model.destroy();
	        });
	    }
	});

	Mock.Views.MocksTable  = Backbone.View.extend({

	    initialize: function () {
	        _.bindAll(this, "render");
	        this.collection.bind("all", this.render);
	    },
	    render: function () {
	        var table = $("#mocksTable tbody");
	        table.empty();
	        this.collection.each(function (dnsZone) {
	            var row = new Mock.Views.MocksTableRow({ model: dnsZone });
	            table.append(row.render().el);
	        });
	        return this;
	    }
	});
	/*
	Mock.Views.MocksTable  = Backbone.View.extend({
		template: _.template(["<ul class='mock_list'>", "<% items.each(function(item) { %>", "<%= itemTemplate(item) %>", "<% }); %>", "</ul>"].join('')),

		itemTemplate: _.template("<li>ddd<%= name %></li>"),

		render: function(done) {
			console.log(this.collection);
			console.log($(this.el));
			var html = this.template({
				items: this.collection 
				,
				itemTemplate: this.itemTemplate
			});
			console.log(html);
			$(this.el).append(html);

			 done(this.el);
		}
	});
*/
	/*

	//Views
	Mock.Views.MocksTable = Backbone.View.extend({
		template: "app/templates/mocks_table.html",
		render: function(done) {
			var view = this;


 var html = this.template({
    
      itemTemplate: this.itemTemplate
    });

    $(this.el).append(html);





			// Fetch the template, render it to the View element and call done.
			
			Suds.fetchTemplate(this.template, function(tmpl) {
				view.el.innerHTML = tmpl({});
				done(view.el);
			});
		}
	});
*/

})(Suds.module("mock"));