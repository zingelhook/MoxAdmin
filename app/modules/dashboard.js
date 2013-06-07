(function(Dashboard) {

    Dashboard.Model = Backbone.Model.extend({});
    Dashboard.Collection = Backbone.Collection.extend({});
    Dashboard.Router = Backbone.Router.extend({});
    var mock = Suds.module("mock");
    var shared = Suds.module("shared");
    // This will fetch the tutorial template and render it.
    Dashboard.Views.MainPage = Backbone.View.extend({
        template: "app/templates/dashboard.html",
        events: {
            "click #addmock": "_openAddMock"
        },
        _openAddMock: function() {
            var addMock = new mock.Views.AddMock();
            addMock.render(function(el) {
                $("#mock-info").html(el);
            });
        },
        loadUserMocks: function() {
            var view = this;
            var callback = function() {
                var mocksTable = new mock.Views.MocksTable({
                    collection: shared.userMocks
                });

                mocksTable.render(function(el) {
                    $("#mocks-list").html(el);
                });
            }
            shared.userMocks.loadUserMocks(callback,null);

        },
        render: function(done) {
            var view = this;
            var userId = Suds.app.currentUser.get('userId');
            if (parseInt(userId, 10) > 0) {


                view.loadUserMocks();
                // Fetch the template, render it to the View element and call done.
                Suds.fetchTemplate(this.template, function(tmpl) {
                    view.el.innerHTML = tmpl({});
                    view.loadUserMocks();
                    done(view.el);

                });
            } else { //redirect to login
                Suds.app.router.navigate("#login", true);
            }

        }
    });

})(Suds.module("dashboard"));