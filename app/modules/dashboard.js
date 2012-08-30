(function (Dashboard) {

    Dashboard.Model = Backbone.Model.extend({});
    Dashboard.Collection = Backbone.Collection.extend({});
    Dashboard.Router = Backbone.Router.extend({});

    // This will fetch the tutorial template and render it.
    Dashboard.Views.MainPage = Backbone.View.extend({
        template: "app/templates/dashboard.html",

        render: function (done) {

            var view = this;
            // Fetch the template, render it to the View element and call done.
            Suds.fetchTemplate(this.template, function (tmpl) {
                view.el.innerHTML = tmpl({});
                done(view.el);
            });
        }
    });

})(Suds.module("dashboard"));