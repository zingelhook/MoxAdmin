(function (Shared) {

    Shared.Model = Backbone.Model.extend({});
    Shared.Collection = Backbone.Collection.extend({});
    Shared.Router = Backbone.Router.extend({});

    Shared.Model.User = Backbone.Model.extend(
    {
        defaults: {
            "pager_number": 1
        },
        Login:function(userName,pwd){

        }
    });

})(Suds.module("shared"));