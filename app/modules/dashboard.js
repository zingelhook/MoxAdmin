(function(Dashboard) {

    Dashboard.Model = Backbone.Model.extend({});
    Dashboard.Collection = Backbone.Collection.extend({});
    Dashboard.Router = Backbone.Router.extend({});
    var mock = Suds.module("mock");
    // This will fetch the tutorial template and render it.
    Dashboard.Views.MainPage = Backbone.View.extend({
        template: "app/templates/dashboard.html",
        loadUserMocks: function() {
            var view = this;
            var mocks = new mock.Collection.Mocks();
            mocks.loadData();
            console.log('yoyoma');

            var mocksTable = new mock.Views.MocksTable({
                collection:mocks
            });
            console.log(mocksTable);
            mocksTable.render(function(el) {
                console.log('dddd');
                $("#mocks-list").html(el);

            });

        },

        render: function(done) {
            var view = this;
            // Fetch the template, render it to the View element and call done.
            Suds.fetchTemplate(this.template, function(tmpl) {
                view.el.innerHTML = tmpl({});
                done(view.el);
                view.loadUserMocks();
            });
        }
    });

})(Suds.module("dashboard"));