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
  			  	{title: "Home", url: "#home", id: "1"},
  				{title: "Tour", url: "#tour", id: "2"},
				{title: "Documentation", url: "#docs", id: "3"},
				{title: "Mocks", url: "#dashboard", id: "4"},
				{title: "Reports", url: "#reports", id: "7"},
				{title: "Sign In", url: "#login", id: "5"},
				{title: "Sign Out", url: "#logout", id: "6"}
			
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
	        var userId = Suds.app.currentUser.get('userId');
			var roleId = Suds.app.currentUser.get('roleId');
	
			$('#menu_7').hide();//reports
	        if(userId>0){//logged in
	        	$('#menu_5').hide();//login
	        	$('#menu_4').show();//mocks
	        	$('#menu_6').show();//logout
				if(roleId==='1'){
					$('#menu_7').show();//reports
				}
	        }
	        else{//not logged in
	        	$('#menu_5').show();//login
	        	$('#menu_4').hide();//mocks
	        	$('#menu_6').hide();//logout
	        }

	        return this;
        }
    });
	
	
	Menu.Views.MainMenuItem  = Backbone.View.extend({
		 tagName: "li",
		template: _.template("<a href='<%=url%>' id='menu_<%=id%>'><%=title%></a>"),
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