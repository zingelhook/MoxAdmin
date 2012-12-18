(function (CodeSamples) {

    CodeSamples.Model = Backbone.Model.extend({});
    CodeSamples.Collection = Backbone.Collection.extend({});
    CodeSamples.Router = Backbone.Router.extend({});

    // This will fetch the tutorial template and render it.
    CodeSamples.Views.JSFiddle = Backbone.View.extend({
        template: "app/templates/jsfiddle.html",
        render: function (done) {
            var view = this;
			var data = view.model.toJSON();
            // Fetch the template, render it to the View element and call done.
            Suds.fetchTemplate(this.template, function (tmpl) {
                view.el.innerHTML = tmpl(data);
                done(view.el);
            });
        }
    });

})(Suds.module("codesamples"));