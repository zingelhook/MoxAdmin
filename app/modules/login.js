(function (Login) {

    Login.Model = Backbone.Model.extend({});
    Login.Collection = Backbone.Collection.extend({});
    Login.Router = Backbone.Router.extend({});

    // This will fetch the tutorial template and render it.
    Login.Views.Main = Backbone.View.extend({
        template: "app/templates/login.html",

        render: function (done) {

            var view = this;
            // Fetch the template, render it to the View element and call done.
            Suds.fetchTemplate(this.template, function (tmpl) {
                view.el.innerHTML = tmpl({});
                done(view.el);
            });
        }
    });

})(Suds.module("login"));