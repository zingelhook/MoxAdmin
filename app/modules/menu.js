(function (Menu) {

    Menu.Model = Backbone.Model.extend({});
    Menu.Collection = Backbone.Collection.extend({});
    Menu.Router = Backbone.Router.extend({});
	
	Menu.Model.MenuItem = Backbone.Model.extend({
		
	});
	
	Menu.Collection.MenuItems = Backbone.Collection.extend({
		model: Menu.Model.MenuItem,
		loadDefaultMenu:function(){
			this.add([
  			  	{title: "Home", url: "#home"},
  				{title: "Tour", url: "#tour"},
				{title: "Documentation", url: "#docs"},
				{title: "Sign In", url: "#login"}
			]);
		}
	});


    Menu.Views.MainMenu = Backbone.View.extend({
	    initialize: function () {
	        _.bindAll(this, "render");
	    },
        render: function (done) {
            // Fetch the template, render it to the View element and call done.
			var view =this;
	        var list = $("#main-menu");
	        list.empty();
	        this.collection.each(function (mainMenuItem) {
	            var item = new Menu.Views.MainMenuItem({ model: mainMenuItem });
	            list.append(item.render().el);
	        });
	        return this;
        }
    });
	
	
	Menu.Views.MainMenuItem  = Backbone.View.extend({
		 tagName: "li",
		template: _.template("<a href='<%=url%>'><%=title%></a>"),
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
	
	
})(Suds.module("menu"));