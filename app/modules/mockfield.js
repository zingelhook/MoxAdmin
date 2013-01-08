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
					mdl.set({
						id:msg
					});
					
					collection:shared.currentMockFields.add(mdl);
					callback(msg);
				},
				error: function(msg) {
					//console.log(msg);
				}
			});
		},
		delete:function(callback){
			var mdl = this;
			var form_data = {
				fieldId:mdl.get('id')
			};
		
			$.ajax({
				type: "POST",
				dataType: "json",
				url: base + "index.php/mock/deleteServiceField",
				data: form_data,
				success: function(msg) {
					shared.currentMockFields.remove(mdl);
					callback(msg);
				},
				error: function(msg) {
					//console.log(msg);
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
	MockField.Views.EditMockField = Backbone.View.extend({
        template: "app/templates/editMockField.html",
		events:{
			"click #submitMoxField":"_editMockField",
			"change #predefinedSampleData":"_predefinedSampleDataClick",
			"click #cancel_btn": "_cancel"
		},
		_cancel:function(){
		
			var info = new mock.Views.MockInfo({ model: shared.currentMock  });

			var callback = function(msg){
				info.render(function (el) {
					$("#mock-info").html(el);
				});

					
				var fieldTable = new mock.Views.FieldTable({
					collection:shared.currentMockFields
				});
           
				fieldTable.render(function(el) {
					$("#mock-info").append(el);
				});
			}

			shared.currentMock.getMockFields(callback);	
		
		},
		_predefinedSampleDataClick:function(e){
		
			var value = $("#predefinedSampleData").val();
			if(value==='14'){
				$('#sample-control').show();
			}
			else{
				$('#sample-control').hide();
			}

		},
		_editMockField:function(){
			var view = this;
			var mockField = new MockField.Model.Field();
			var mockId = shared.currentMock.get('id');

			var errorlist = [];
			if($('#mockFieldName').val().length===0){
				errorlist.push({name:'name-control',msg:'Name is required!'})
			}
			
			if($("#predefinedSampleData").val()==='14' && $('#sampledata').val().length<=1){
				errorlist.push({name:'sample-control',msg:'Sample Data is required for Custom Data!'})	
			}

			if(errorlist.length===0){
				this.model.set({
					name:$('#mockFieldName').val(),
					typeId:1,
					options:$('#options').val(),
					mockId:mockId,
					predefinedSampleDataId:$('#predefinedSampleData').val(),
					sampleData:$('#sampledata').val()
				})
			
				var callback = function(msg){
					
					if(parseInt(msg,10)>0){
						$("#mock-info").empty();
					
						var info = new mock.Views.MockInfo({ model: shared.currentMock  });
						info.render(function (el) {
							$("#mock-info").html(el);
						});
					
			            var fieldTable = new mock.Views.FieldTable({
			                collection:shared.currentMockFields
			            });
           
			            fieldTable.render(function(el) {
			                $("#mock-info").append(el);
			            });
			
					}
				}
				this.model.save(callback);
			}
			else{

				var count = errorlist.length;
				for (var i = 0; i < count; i++) {
					$('#' + errorlist[i].name).addClass('error');
					var errorLine = document.createElement('li');
					$(errorLine).html(errorlist[i].msg);
					$('#error-list').append(errorLine);	
				}
				$('#invalid-mockfield').show();
			}	
		},
        render: function (done) {
            var view = this;
            // Fetch the template, render it to the View element and call done.
            Suds.fetchTemplate(this.template, function (tmpl) {
                view.el.innerHTML = tmpl({
                	name:view.model.get('name'),
                	predefinedSampleDataId:view.model.get('predefinedSampleDataId'),
                	sampledata:view.model.get('sampleData')
                });
                var id = view.model.get('predefinedSampleDataId');
			
                done(view.el);
				$("#predefinedSampleData").val(id);
				view._predefinedSampleDataClick();
            });
        }
    });
	
    MockField.Views.AddMockField = Backbone.View.extend({
        template: "app/templates/addMockField.html",
		events:{
			"click #submitMoxField":"_addMockField",
			"change #predefinedSampleData":"_predefinedSampleDataClick",
			"click #cancel_btn": "_cancel"
		},
		_cancel:function(){
			var info = new mock.Views.MockInfo({ model: shared.currentMock  });

			var callback = function(msg){
				info.render(function (el) {
					$("#mock-info").html(el);
				});
	
				var fieldTable = new mock.Views.FieldTable({
					collection:shared.currentMockFields
				});
           
				fieldTable.render(function(el) {
					$("#mock-info").append(el);
				});
			}

			shared.currentMock.getMockFields(callback);	
		},
		_predefinedSampleDataClick:function(e){
			var value = $("#predefinedSampleData").val();
			if(value==='14'){
				$('#sample-control').show();
			}
			else{
				$('#sample-control').hide();
			}
		},
		_addMockField:function(){
			$('#error-list').empty();
			//create an instance of the mockfield
			var mockField = new MockField.Model.Field();
			//get the mockid
			var mockId = shared.currentMock.get('id');

			//start off with empty errorlist, and check inputs
			var errorlist = [];
			if($('#mockFieldName').val().length===0){
				errorlist.push({name:'name-control',msg:'Name is required!'})
			}
			if($("#predefinedSampleData").val()==='14' && $('#sampledata').val().length<=1){
				errorlist.push({name:'sample-control',msg:'Sample Data is required for Custom Data!'})	
			}
			//if we have no errors
			if(errorlist.length===0){
				//populate the mockfield model
				mockField.set({
					name:$('#mockFieldName').val(),
					typeId:1,
					options:$('#options').val(),
					mockId:mockId,
					predefinedSampleDataId:$('#predefinedSampleData').val(),
					predefefinedSampleDataType:$('#predefinedSampleData option:selected').text(),
					sampleData:$('#sampledata').val()
				})

				//create the callback that will fire once we have a successful ajax call	
				var callback = function(){
					var info = new mock.Views.MockInfo({ model: shared.currentMock  });

					var callback = function(msg){
						info.render(function (el) {
							$("#mock-info").html(el);
						});
			
						var fieldTable = new mock.Views.FieldTable({
							collection:shared.currentMockFields
						});
		           
						fieldTable.render(function(el) {
							$("#mock-info").append(el);
						});
					}

					shared.currentMock.getMockFields(callback);	
				}	
				mockField.save(callback);
			}
			else{
				var count = errorlist.length;
				for (var i = 0; i < count; i++) {
					$('#' + errorlist[i].name).addClass('error');
					var errorLine = document.createElement('li');
					$(errorLine).html(errorlist[i].msg);
					$('#error-list').append(errorLine);
				}
				$('#invalid-mockfield').show();
			}
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
