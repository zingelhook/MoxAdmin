

(function (Tour) {

    Tour.Model = Backbone.Model.extend({});
    Tour.Collection = Backbone.Collection.extend({});
    Tour.Router = Backbone.Router.extend({});

    // This will fetch the tutorial template and render it.
    Tour.Views.Main = Backbone.View.extend({
        template: "app/templates/tour.html",

        render: function (done) {

            var view = this;
            // Fetch the template, render it to the View element and call done.
            Suds.fetchTemplate(this.template, function (tmpl) {
                view.el.innerHTML = tmpl({});
                done(view.el);
            });
        }
    });

})(Suds.module("tour"));
