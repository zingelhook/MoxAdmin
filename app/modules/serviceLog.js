(function (ServiceLog) {

    ServiceLog.Model = Backbone.Model.extend({});
    ServiceLog.Collection = Backbone.Collection.extend({});
    ServiceLog.Router = Backbone.Router.extend({});

    ServiceLog.Views.MainPage = Backbone.View.extend({
        template: "app/templates/reports.html",
        render: function (done) {
            var view = this;
            // Fetch the template, render it to the View element and call done.
            Suds.fetchTemplate(this.template, function (tmpl) {
                view.el.innerHTML = tmpl({});
                done(view.el);
            });
        }
    });
})(Suds.module("servicelog"));