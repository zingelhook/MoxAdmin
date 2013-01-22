(function (ForgotPassword) {

    ForgotPassword.Model = Backbone.Model.extend({});
    ForgotPassword.Collection = Backbone.Collection.extend({});
    ForgotPassword.Router = Backbone.Router.extend({});

    // This will fetch the tutorial template and render it.
    ForgotPassword.Views.Main = Backbone.View.extend({
        template: "app/templates/ForgotPassword.html",
        render: function (done) {
            var view = this;
            // Fetch the template, render it to the View element and call done.
            Suds.fetchTemplate(this.template, function (tmpl) {
                view.el.innerHTML = tmpl({});
                done(view.el);
            });
        }
    });

})(Suds.module("forgotpassword"));