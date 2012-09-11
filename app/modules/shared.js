(function (Shared) {
    Shared.Model = Backbone.Model.extend({});
    Shared.Collection = Backbone.Collection.extend({});
    Shared.Router = Backbone.Router.extend({});
	var mock = Suds.module("mock");
	Shared.userMocks = new mock.Collection.Mocks();

    Shared.Model.User = Backbone.Model.extend(
    {
        defaults: {
            "userId": 0
        },
  	  	Login:function(userName,pwd){

        }
    });
})(Suds.module("shared"));