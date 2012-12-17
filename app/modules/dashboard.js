(function(Dashboard) {

    Dashboard.Model = Backbone.Model.extend({});
    Dashboard.Collection = Backbone.Collection.extend({});
    Dashboard.Router = Backbone.Router.extend({});
    var mock = Suds.module("mock");
	var shared =  Suds.module("shared");
    // This will fetch the tutorial template and render it.
    Dashboard.Views.MainPage = Backbone.View.extend({
        template: "app/templates/dashboard.html",
		events:{
			"click #addmock":"_openAddMock"
		},
		_openAddMock:function(){
			var addMock = new mock.Views.AddMock();
            addMock.render(function(el) {
                $("#mock-info").html(el);
            });
		},
        loadUserMocks: function() {
            var view = this;
            shared.userMocks.loadData();  
            var mocksTable = new mock.Views.MocksTable({
                collection:shared.userMocks
            });
           
            mocksTable.render(function(el) {
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