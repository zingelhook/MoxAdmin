(function(Mock) {
	Mock.Model = Backbone.Model.extend({});
	Mock.Collection = Backbone.Collection.extend({});
	Mock.Router = Backbone.Router.extend({});

	Mock.Model.Mock = Backbone.Model.extend({});
	Mock.Collection.Mocks = Backbone.Collection.extend({
		model: Mock.Model.Mock,
		loadData: function(callback, failcallback) {
			console.log('loading data');
			var form_data = {
                userid: 1
            };
			$.ajax({
				type: "GET",
				dataType: "json",
				url: base + "index.php/mock/GetUserMocks",
				data: form_data,
				success: function(msg) {

					console.log(msg);

				},
				error: function(msg) {
					console.log(msg);
				}

			});
		}
	});

})(Suds.module("mock"));