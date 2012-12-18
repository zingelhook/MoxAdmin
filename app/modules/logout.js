

(function (Logout) {

    Logout.Model = Backbone.Model.extend({});
    Logout.Collection = Backbone.Collection.extend({});
    Logout.Router = Backbone.Router.extend({});

	var shared =  Suds.module("shared");
    Logout.Views.LogoutPage = Backbone.View.extend({
        template: "app/templates/logout.html",
        render: function (done) {
            var view = this;
			Suds.app.currentUser.Logout();
			
        	$('#menu_5').show();//login
        	$('#menu_4').hide();//mocks
        	$('#menu_6').hide();//logout
	
          
		
			
            // Fetch the template, render it to the View element and call done.
            Suds.fetchTemplate(this.template, function (tmpl) {
                view.el.innerHTML = tmpl({});
                done(view.el);
            });
        }
    });

})(Suds.module("logout"));
