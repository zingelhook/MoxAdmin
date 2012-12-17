(function(Mock) {
	Mock.Model = Backbone.Model.extend({});
	Mock.Collection = Backbone.Collection.extend({});
	Mock.Router = Backbone.Router.extend({});
	var shared =  Suds.module("shared");
	var mockfield = Suds.module("mockfield");
	Mock.Model.Mock = Backbone.Model.extend({
		getMockFields:function(callback){
			var mdl = this;
			var form_data = {
				id: mdl.get('id')
			};
			$.ajax({
				type: "GET",
				dataType: "json",
				url: base + "index.php/mock/GetMocksFields",
				data: form_data,
				success: function(msg) {
					callback(msg);
				},
				error: function(msg) {
					console.log(msg);
				}
			});
		},
		save:function(callback){	
			var mdl = this;
			var form_data = {
				id:mdl.get('id'),
				name: mdl.get('name'),
				min:mdl.get('min'),
				max:mdl.get('max'),
				langVar:'en:us'
			};
			
			shared.currentMock = this; 
			
		
			var url = "index.php/mock/save";
			if(parseInt(mdl.get('id'),10)>0){
				url = "index.php/mock/update"
			}
	
			$.ajax({
				type: "POST",
				dataType: "json",
				url: base + url,
				data: form_data,
				success: function(msg) {
					
					shared.currentMock.set({
						id:msg
					})
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

	Mock.Collection.Mocks = Backbone.Collection.extend({
		model: Mock.Model.Mock,
		loadData: function(callback, failcallback) {
			var col = this;
			var form_data = {
				userid: Suds.app.currentUser.get('userId')
				
			};
			$.ajax({
				type: "GET",
				dataType: "json",
				url: base + "index.php/mock/GetUserMocks",
				data: form_data,
				success: function(msg) {
					var count = msg.UserMocks.length;
					for (var i = 0; i < count; i++) {
						var um = new Mock.Model.Mock({
							name: msg.UserMocks[i].name,
							id:msg.UserMocks[i].id,
							max:msg.UserMocks[i].max,
							min: msg.UserMocks[i].min
						});
						col.add(um);
					}
				},
				error: function(msg) {
					console.log(msg);
				}
			});
		}
	});
	

	
	Mock.Views.MocksTableRow  = Backbone.View.extend({
	    tagName: "tr",
		template: _.template("<td class='mock' id='<%=id%>'><%=name%></td>"),
	    events: {
	        "click .mock": "_showMock"
	    },
	    initialize: function () {
	        _.bindAll(this, "render");
	    },
		_showMock:function(e){
			var mock = shared.userMocks.get(e.currentTarget.id);
			mock.set({
				mode:'none'
			});

			var view=this;
			var info = new Mock.Views.MockInfo({ model: mock });
			info.render(function (el) {
				$("#mock-info").html(el);
			});
		
			var callback = function(msg){
				var count = msg.MockFields.length;
				var mockFields = new mockfield.Collection.MockFields();
				shared.currentMockFields = mockFields;
				
				for (var i = 0; i < count; i++) {
					mockFields.add(msg.MockFields[i]);
				}
				
	            var fieldTable = new Mock.Views.FieldTable({
	                collection:mockFields
	            });
           
	            fieldTable.render(function(el) {
	                $("#mock-info").html(el);
	            });
				
			}
			mock.getMockFields(callback);
		},
	    render: function () {
			var view=this;
			var html = view.template(view.model.toJSON());
			$(this.el).append(html);
	        return this;
	    }
	});

	Mock.Views.MocksTable  = Backbone.View.extend({
	    initialize: function () {
	        _.bindAll(this, "render");
	        this.collection.bind("all", this.render);
	    },
	    render: function () {
			var view =this;
	        var table = $("#mocksTable tbody");
	        table.empty();
	        this.collection.each(function (singelMock) {
	            var row = new Mock.Views.MocksTableRow({ model: singelMock });
	            table.append(row.render().el);
	        });
	        return this;
	    }
	});
	
	
	
	Mock.Views.FieldTableRow  = Backbone.View.extend({
	    tagName: "tr",
		template: _.template("<td class='field' id='<%=id%>'><%=name%></td><td><%=fieldoptions%></td><td><%=predefefinedSampleDataType%></td><td><%=sampleData%></td><td><button type='button' id='edit_<%=id%>' class='edit-mock btn btn-primary btn-small'>Edit</button>&nbsp;<button type='button' id='<%=id%>' class='del-field btn btn-danger btn-small'>Delete</button></td>"),
		events:{
			"click .del-field":"_delField",
			"click .edit-mock": "_editField"
		},
	    initialize: function () {
	        _.bindAll(this, "render");
	    },
		_editField:function(e){
			
			var id = e.currentTarget.id.replace("edit_","");;
			var currentField = shared.currentMockFields.get(id);

			var editView = new mockfield.Views.EditMockField({
				model:currentField
			});
			editView.render(function(el) {
                $("#mock-info").html(el);
			});
		},
		_delField:function(e){
			
			var id = e.currentTarget.id;
			var currentField = shared.currentMockFields.get(id);
			
			var callback = function(msg){
				//todo
			}
			currentField.delete(callback);
			
		},
	    render: function () {
			var view=this;
			var html = view.template(view.model.toJSON());
			$(this.el).append(html);
	        return this;
	    }
	});
	
	Mock.Views.FieldTable  = Backbone.View.extend({
	    initialize: function () {
	        _.bindAll(this, "render");
	        this.collection.bind("all", this.render);
	    },
	    render: function () {
			var view =this;
	        var table = $("#mock-fields tbody");
	        table.empty();
	        this.collection.each(function (singelField) {
	            var row = new Mock.Views.FieldTableRow({ model: singelField });
	            table.append(row.render().el);
	        });
	        return this;
	    }
	});
	
	
	Mock.Views.MockInfo  = Backbone.View.extend({
		template: _.template("<div class='info'><ul class='unstyled'><li><h2>Name: <%=name%></h2><p><button class='btn btn-primary' id='edit-mock' type='button'>Edit Mock</button>&nbsp;&nbsp;<button class='btn btn-danger' id='delete-mock' type='button'>Delete Mock</button></p></li><li>Min: <%=min%></li><li>Max: <%=max%></li></ul><p id='code-example'></p><p><a id='addfield' class='btn btn-primary btn-small' href='#addmockfield'>Add Field</a></p><table id='mock-fields' class='table table-bordered'><thead><tr><th>Name</th><th>Options</th><th>Type</th><th>Sample Data</th></thead><tbody></tbody></table></div>"),
	    initialize: function () {
	        _.bindAll(this, "render");
	    },
	    events:{
	        "click #delete-mock": "_deleteMock",
			"click #edit-mock": "_editMock"
	    },
	    _editMock:function(){
			//call edit mock view
			var editMock = new Mock.Views.EditMock({
				model:this.model
			});
			
			editMock.render(function(el) {
                $("#mock-info").html(el);
			});
	    },
	    _deleteMock:function(){
	    	var callback = function(msg){
	    		$('#mock-info').empty();
	    	}
	    	this.model.delete(callback);
	    },
		_buildJSONPExample:function(){
			var code = "$.ajax({ type: 'GET',dataType: 'jsonp',jsonpCallback: 'moxsvc',url: '" + Suds.app.externalMoxURL + "?id=" + this.model.get('id') + "',success: function(data) {console.log(data)}});";
			var html="<code>" + code + "</code>";
			$('#code-example').html(html);
		},
	    render: function (done) {
			var view=this;
			shared.currentMock = this.model;
            view.el.innerHTML = view.template(view.model.toJSON());
            done(view.el);
			view._buildJSONPExample();
			
			
            var fieldTable = new Mock.Views.FieldTable({
                collection:shared.currentMockFields
            });
           
            fieldTable.render(function(el) {
                $("#mock-info").html(el);
            });
			
	        return this;
	    }
	});
	
	
	
    Mock.Views.EditMock = Backbone.View.extend({
        template: "app/templates/editMock.html",
		events:{
			"click #submitMox": "_editMock",
			"click #cancel_btn":"_cancel"
		},
		_cancel:function(){
			$("#mock-info").empty();
					
			var info = new Mock.Views.MockInfo({ model: shared.currentMock  });
			info.render(function (el) {
				$("#mock-info").html(el);
			});
					
            var fieldTable = new Mock.Views.FieldTable({
                collection:shared.currentMockFields
            });
           
            fieldTable.render(function(el) {
                $("#mock-info").append(el);
            });
		},
		_editMock:function(){
			$('#invalid-mock').hide();
			$('#error-list').empty();
			var name = $('#mockName').val();
			var min = $('#mockMin').val();
			var max = $('#mockMax').val();
			var mockid = $('#mockId').val();
			
			var errorlist = [];
			if(name.length===0){
				errorlist.push({name:'name-control',msg:'Name is required!'})
			}
			if(min.length===0){
				errorlist.push({name:'min-control',msg:'Min Rows is required!'})
			}
			
			if(max.length===0){
				errorlist.push({name:'max-control',msg:'Max Rows is required!'})
			}
			
			if(!isNumber(min)){
				errorlist.push({name:'min-control',msg:'Min Rows must be a number!'})
			}
		
			if(!isNumber(max)){
				errorlist.push({name:'min-control',msg:'Max Rows must be a number!'})
			}
			
			if(errorlist.length===0){
				this.model.set({
					id:mockid,
					name:name,
					min:min,
					max:max
				});
				var callback = function(msg){
					$("#mock-info").empty();
					
					var info = new Mock.Views.MockInfo({ model: shared.currentMock  });
					info.render(function (el) {
						$("#mock-info").html(el);
					});
					
		            var fieldTable = new Mock.Views.FieldTable({
		                collection:shared.currentMockFields
		            });
           
		            fieldTable.render(function(el) {
		                $("#mock-info").append(el);
		            });
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
				$('#invalid-mock').show();
				
			}
		},
        render: function(done) {
            var view = this;
            // Fetch the template, render it to the View element and call done.
            Suds.fetchTemplate(this.template, function(tmpl) {
                view.el.innerHTML = tmpl({
					id:view.model.get("id"),
					name:view.model.get("name"),
					min:view.model.get("min"),
					max:view.model.get("max")
				});
                done(view.el);
            });
        }
    });
    Mock.Views.AddMock = Backbone.View.extend({
        template: "app/templates/addMock.html",
		events:{
			"click #submitMox": "_addMock"
		},
		_addMock:function(){
			
			//remove old validation
			
			$('.error').removeClass('error');
	
			var name = $('#mockName').val();
			var min = $('#mockMin').val();
			var max = $('#mockMax').val();
			
			var errorlist = [];
			if(name.length===0){
				errorlist.push({name:'name-control',msg:'Name is required!'})
			}
			if(min.length===0){
				errorlist.push({name:'min-control',msg:'Min Rows is required!'})
			}
			
			if(max.length===0){
				errorlist.push({name:'max-control',msg:'Max Rows is required!'})
			}
			
			if(!isNumber(min)){
				errorlist.push({name:'min-control',msg:'Min Rows must be a number!'})
			}
		
			if(!isNumber(max)){
				errorlist.push({name:'min-control',msg:'Max Rows must be a number!'})
			}
			
			if(errorlist.length===0){
				var newMock = new Mock.Model.Mock({
					id:0,
					name:name,
					min:min,
					max:max
				});
				var callback = function(msg){
					var info = new Mock.Views.MockInfo({ model: shared.currentMock  });
					info.render(function (el) {
						$("#mock-info").html(el);
					});
					
		            var fieldTable = new Mock.Views.FieldTable({
		                collection:shared.currentMockFields
		            });
           
		            fieldTable.render(function(el) {
		                $("#mock-info").append(el);
		            });

				
				}
				newMock.save(callback);			
			}
			else{
			
				var count = errorlist.length;
				for (var i = 0; i < count; i++) {
				
					$('#' + errorlist[i].name).addClass('error');
					var errorLine = document.createElement('li');
					$(errorLine).html(errorlist[i].msg);
					
				}


				
				/*
				for (var name in errorlist) {
				  if (errorlist.hasOwnProperty(name)) {
					var errorLine = document.createElement('li');
					$(errorLine).html(errorlist[name]);
					console.log(errorLine);
					$('#error-list').append(errorLine);
				  }
				}*/
				//$('#invalid-signup').show();
			}
			

		
			
		},
        render: function(done) {
            var view = this;
            // Fetch the template, render it to the View element and call done.
            Suds.fetchTemplate(this.template, function(tmpl) {
                view.el.innerHTML = tmpl({});
                done(view.el);
            });
        }
    });
})(Suds.module("mock"));