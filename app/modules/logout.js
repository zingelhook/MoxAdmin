

(function (Logout) {

    Logout.Model = Backbone.Model.extend({});
    Logout.Collection = Backbone.Collection.extend({});
    Logout.Router = Backbone.Router.extend({});

    // This will fetch the tutorial template and render it.
    Logout.Views.LogoutPage = Backbone.View.extend({
        template: "app/templates/logout.html",
        render: function (done) {
            var view = this;
            // Fetch the template, render it to the View element and call done.
            Suds.fetchTemplate(this.template, function (tmpl) {
                view.el.innerHTML = tmpl({});
                done(view.el);
            });
        }
    });

})(Suds.module("logout"));
