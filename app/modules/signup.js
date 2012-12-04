(function (SignUp) {

    SignUp.Model = Backbone.Model.extend({});
    SignUp.Collection = Backbone.Collection.extend({});
    SignUp.Router = Backbone.Router.extend({});

    
	
	//main signup form
    SignUp.Views.MainPage = Backbone.View.extend({
        template: "app/templates/signup.html",
        render: function (done) {
            var view = this;
            // Fetch the template, render it to the View element and call done.
            Suds.fetchTemplate(this.template, function (tmpl) {
                view.el.innerHTML = tmpl({});
                done(view.el);
            });
        }
    });
	
	
	

})(Suds.module("signup"));