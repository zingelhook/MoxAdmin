(function (Home) {

    Home.Model = Backbone.Model.extend({});
    Home.Collection = Backbone.Collection.extend({});
    Home.Router = Backbone.Router.extend({});

    // This will fetch the tutorial template and render it.
    Home.Views.MainPage = Backbone.View.extend({
        template: "app/templates/Home.html",
        render: function (done) {
            var view = this;
            // Fetch the template, render it to the View element and call done.
            Suds.fetchTemplate(this.template, function (tmpl) {
                view.el.innerHTML = tmpl({});
                done(view.el);
            });
        }
    });

})(Suds.module("home"));
