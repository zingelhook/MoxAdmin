(function (MockField) {

    MockField.Model = Backbone.Model.extend({});
    MockField.Collection = Backbone.Collection.extend({});
    MockField.Router = Backbone.Router.extend({});
	var mock = Suds.module("mock");
	var shared =  Suds.module("shared");
	MockField.Model.Field = Backbone.Model.extend({
		save:function(callback){	
			var mdl = this;
		
			
			var form_data = {
				id:mdl.get('id'),
				mockId:mdl.get('mockId'),
				name: mdl.get('name'),
				typeId:mdl.get('typeId'),
				options:mdl.get('options'),
				predefinedSampleDataId:mdl.get('predefinedSampleDataId'),
				sampleData:mdl.get('sampleData')
				
			};
	
			$.ajax({
				type: "POST",
				dataType: "json",
				url: base + "index.php/mock/addServiceField",
				data: form_data,
				success: function(msg) {
				
					callback(msg);
				},
				error: function(msg) {
					console.log(msg);
				}
			});
		},
		delete:function(callback){
			var mdl = this;
			var form_data = {
				id:mdl.get('id')
			};

			$.ajax({
				type: "POST",
				dataType: "json",
				url: base + "index.php/mock/delete",
				data: form_data,
				success: function(msg) {
					shared.userMocks.remove(mdl);
					callback(msg);

				},
				error: function(msg) {
					console.log(msg);
				}
			});
	
			
		}
	});
	
	MockField.Collection.MockFields = Backbone.Collection.extend({
		model: MockField.Model.Field
	});

    MockField.Views.Main = Backbone.View.extend({
        template: "app/templates/mockfield.html",
        render: function (done) {
            var view = this;
            // Fetch the template, render it to the View element and call done.
            Suds.fetchTemplate(this.template, function (tmpl) {
                view.el.innerHTML = tmpl({});
                done(view.el);
            });
        }
    });
	
    MockField.Views.AddMockField = Backbone.View.extend({
        template: "app/templates/addMockField.html",
		events:{
			"click #submitMoxField":"_addMockField"
		},
		_addMockField:function(){
			var mockField = new MockField.Model.Field();
		
			var mockId = shared.currentMock.get('id');
			//console.log(shared.currentMock);
			mockField.set({
				name:$('#mockFieldName').val(),
				typeId:1,
				options:$('#options').val(),
				mockId:mockId,
				predefinedSampleDataId:$('#predefinedSampleData').val(),
				sampleData:$('#sampledata').val()
			})
			console.log(mockField)
			
			var callback = function(msg){
				if(msg>0){
					Suds.app.router.navigate("#dashboard", true);
				}
				
			}
			
			mockField.save(callback);
			
		},
        render: function (done) {
            var view = this;
            // Fetch the template, render it to the View element and call done.
            Suds.fetchTemplate(this.template, function (tmpl) {
                view.el.innerHTML = tmpl({});
                done(view.el);
            });
        }
    });

})(Suds.module("mockfield"));