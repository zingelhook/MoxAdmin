(function(SubMock) {

    SubMock.Model = Backbone.Model.extend({});
    SubMock.Collection = Backbone.Collection.extend({});
    SubMock.Router = Backbone.Router.extend({});


    SubMock.Model.SubMock = Backbone.Model.extend({});
    SubMock.Collection.SubMocks = Backbone.Collection.extend({
        model:SubMock.Model.SubMock 
    });

    // This will fetch the tutorial template and render it.
    SubMock.Views.Main = Backbone.View.extend({
        template: "app/templates/submock.html",
        render: function(done) {
            var view = this;
            // Fetch the template, render it to the View element and call done.
            Suds.fetchTemplate(this.template, function(tmpl) {
                view.el.innerHTML = tmpl({});
                done(view.el);
            });
        }
    });

})(Suds.module("submock"));