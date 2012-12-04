(function (Docs) {

    Docs.Model = Backbone.Model.extend({});
    Docs.Collection = Backbone.Collection.extend({});
    Docs.Router = Backbone.Router.extend({});

    // This will fetch the tutorial template and render it.
    Docs.Views.Main = Backbone.View.extend({
        template: "app/templates/documentation.html",
        render: function (done) {
            var view = this;
            // Fetch the template, render it to the View element and call done.
            Suds.fetchTemplate(this.template, function (tmpl) {
                view.el.innerHTML = tmpl({});
                done(view.el);
            });
        }
    });

})(Suds.module("docs"));