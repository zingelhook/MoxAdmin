(function(Mock) {
	Mock.Model = Backbone.Model.extend({});
	Mock.Collection = Backbone.Collection.extend({});
	Mock.Router = Backbone.Router.extend({});
	var shared = Suds.module("shared");
	var submock = Suds.module("submock");
	var mockfield = Suds.module("mockfield");
	var codesamples = Suds.module("codesamples");
	Mock.Model.Mock = Backbone.Model.extend({
		getMockFields: function(callback) {
			var mdl = this;
			var form_data = {
				id: mdl.get('id')
			};
			//once the firlds are loaded, execute this
			var successCallback = function(msg) {
				var count = msg.MockFields.length;
				shared.currentMockFields = new mockfield.Collection.MockFields();;

				for (var i = 0; i < count; i++) {
					var mf = new mockfield.Model.Field({
						options: msg.MockFields[i].fieldoptions,
						id: msg.MockFields[i].id,
						name: msg.MockFields[i].name,
						predefefinedSampleDataType: msg.MockFields[i].predefefinedSampleDataType,
						predefinedSampleDataId: msg.MockFields[i].predefinedSampleDataId,
						sampleData: msg.MockFields[i].sampleData
					})

					shared.currentMockFields.add(mf);
				}
				if (callback) {
					callback(msg);
				}
			};

			//make the ajax call
			var rpc = new RPC('GET', 'json', 'index.php/mock/GetMocksFields', form_data, successCallback, null);

		},
		getMockChildren: function(callback, failcallback) {
			var mdl = this;
			var subModules = new submock.Collection.SubMocks();

			var successCallback = function(msg) {
				if (msg.userid == false) { //session expired
					Suds.app.currentUser.Logout();

				} else {
					var count = msg.MockChildren.length;
					for (var i = 0; i < count; i++) {
						var um = new submock.Model.SubMock({
							mockId: msg.MockChildren[i].dataTemplateId,
							id: msg.MockChildren[i].id,
							childTemplateId: msg.MockChildren[i].childTemplateId,
							objectName: msg.MockChildren[i].objectName
						});
						subModules.add(um);
					}
					mdl.set({
						subMocks: subModules
					})
				}
				if (callback) {
					callback(subModules);
				}
			}

			var form_data = {
				id: this.get('id')
			};
			//make the ajax call
			var rpc = new RPC('GET', 'json', 'index.php/mock/GetMockChildren', form_data, successCallback, null);

		},

		save: function(callback) {
			var mdl = this;
			var form_data = {
				id: mdl.get('id'),
				name: mdl.get('name'),
				min: mdl.get('min'),
				max: mdl.get('max'),
				langVar: 'en:us',
				childMocks: []
			};
			
			shared.currentMock = this;
			shared.currentMockFields.reset();

			var url = "index.php/mock/save";
			if (parseInt(mdl.get('id'), 10) > 0) {
				url = "index.php/mock/update"
			}
			var successCallback = function(msg) {
				mdl.set({
					id: msg
				})
				callback(msg);
			}

			var rpc = new RPC('POST', 'json', url, form_data, successCallback, null);

		},
		addSubMocks: function(subMockCollection) {

			var mdl = this;
			var form_data = {
				id: mdl.get('id'),
				subMocks: subMockCollection.toJSON()
			};
			var url = "index.php/mock/AddSubMocks";

			var successCallback = function() {
				//do something
			}

			var rpc = new RPC('POST', 'json', url, form_data, successCallback, null);
		},
		delete: function(callback) {
			var mdl = this;
			var form_data = {
				id: mdl.get('id'),
				userid: Suds.app.currentUser.get('userId')
			};
			var url = "index.php/mock/delete";
			var successCallback = function(msg) {
				if (msg.userid == false) { //session expired
					Suds.app.currentUser.Logout();

				} else {
					shared.userMocks.remove(mdl);
					callback(msg);
				}
			}

			var rpc = new RPC('POST', 'json', url, form_data, successCallback, null);
		}
	});

	Mock.Collection.Mocks = Backbone.Collection.extend({
		model: Mock.Model.Mock,
		loadUserMocks: function(callback, failcallback) {
			var col = this;
			var form_data = {
				userid: Suds.app.currentUser.get('userId')
			};

			var url = "index.php/mock/GetUserMocks";

			var successCallback = function(msg) {
				if (msg.userid == false) { //session expired
					Suds.app.currentUser.Logout();

				} else {
					var count = msg.UserMocks.length;
					for (var i = 0; i < count; i++) {
						var um = new Mock.Model.Mock({
							name: msg.UserMocks[i].name,
							id: msg.UserMocks[i].id,
							max: msg.UserMocks[i].max,
							min: msg.UserMocks[i].min,
							idCode: msg.UserMocks[i].idCode
						});
						col.add(um);
					}
					if (callback) {
						callback();
					}
				}
			}

			var rpc = new RPC('GET', 'json', url, form_data, successCallback, null);
		}
	});

	Mock.Views.SubMocksTableRow = Backbone.View.extend({
		tagName: "tr",
		template: _.template("<td class='sub-mock' id='submock_<%=id%>'><i class='<%=iconStatus%>'></i><%=name%></td>"),
		events: {
			"click .sub-mock": "_toggleMock"
		},
		initialize: function() {
			_.bindAll(this, "render");
			this.subMocks = new submock.Collection.SubMocks();
			//this.subMocks.getByParent

		},
		_toggleMock: function(e) {
			var mock = shared.userMocks.get(e.currentTarget.id.split("_")[1]);
			if ($("#" + e.currentTarget.id + " i").hasClass('icon-ok')) {
				$("#" + e.currentTarget.id + " i").removeClass('icon-ok').addClass('icon-remove');

			} else {
				$("#" + e.currentTarget.id + " i").removeClass('icon-remove').addClass('icon-ok');
			}
		},
		render: function() {
			var view = this;
			var html = view.template(view.model.toJSON());
			$(this.el).append(html);
			return this;
		}
	});


	Mock.Views.SubMocksTable = Backbone.View.extend({
		initialize: function() {
			_.bindAll(this, "render");
		},
		render: function() {
			var view = this;
			var table = $("#sub-mocksTable tbody");
			table.empty();
			this.collection.each(function(singelMock) {

				//check to make sure the mock is already selected.childTemplateId
				var subMockSel = shared.currentMock.get('subMocks').where({
					childTemplateId: singelMock.get('id')
				});

				if (subMockSel.length > 0) {
					singelMock.set({
						iconStatus: 'icon-ok'
					})
				} else {
					singelMock.set({
						iconStatus: 'icon-remove'
					})
				}

				var row = new Mock.Views.SubMocksTableRow({
					model: singelMock
				});
				table.append(row.render().el);
			});
			if (this.collection.length === 0) {
				$('#new-user').show();
			} else {
				$('#new-user').hide();
			}
			return this;
		}
	});

	Mock.Views.MocksTableRow = Backbone.View.extend({
		tagName: "tr",
		template: _.template("<td class='mock' id='<%=id%>'><%=name%></td>"),
		events: {
			"click .mock": "_showMock"
		},
		initialize: function() {
			_.bindAll(this, "render");
		},
		_showMock: function(e) {
			var mock = shared.userMocks.get(e.currentTarget.id);
			mock.set({
				mode: 'none'
			});

			var view = this;
			var info = new Mock.Views.MockInfo({
				model: mock
			});

			info.render(function(el) {
				$("#mock-info").html(el);
			});

			var callback = function(msg) {

				var fieldTable = new Mock.Views.FieldTable({
					collection: shared.currentMockFields
				});

				fieldTable.render(function(el) {
					$("#mock-info").html(el);
				});

			}
			mock.getMockFields(callback);
		},
		render: function() {
			var view = this;
			var html = view.template(view.model.toJSON());
			$(this.el).append(html);
			return this;
		}
	});

	Mock.Views.MocksTable = Backbone.View.extend({
		initialize: function() {
			_.bindAll(this, "render");
		},
		render: function() {
			var view = this;
			var table = $("#mocksTable tbody");
			table.empty();
			this.collection.each(function(singelMock) {
				var row = new Mock.Views.MocksTableRow({
					model: singelMock
				});
				table.append(row.render().el);
			});
			if (this.collection.length === 0) {
				$('#new-user').show();
			} else {
				$('#new-user').hide();
			}
			return this;
		}
	});
	
	Mock.Views.FieldTableRow = Backbone.View.extend({
		tagName: "tr",
		template: _.template("<td class='field' id='<%=id%>'><%=name%></td><td><%=options%></td><td><%=predefefinedSampleDataType%></td><td><%=sampleData%></td><td><button type='button' id='edit_<%=id%>' class='edit-mockfield btn btn-primary btn-small'>Edit</button>&nbsp;<button type='button' id='<%=id%>' class='del-field btn btn-danger btn-small'>Delete</button></td>"),
		events: {
			"click .del-field": "_delField",
			"click .edit-mockfield": "_editField"
		},
		initialize: function() {
			_.bindAll(this, "render");
		},
		_editField: function(e) {

			var id = e.currentTarget.id.replace("edit_", "");
			var currentField = shared.currentMockFields.get(id);
			var editView = new mockfield.Views.EditMockField({
				model: currentField
			});

			editView.render(function(el) {
				$("#mock-info").html(el);
			});
		},
		_delField: function(e) {

			var id = e.currentTarget.id;
			var currentField = shared.currentMockFields.get(id);

			var callback = function(msg) {
				//console.log(e.currentTarget);
				 $(e.currentTarget).parent().parent().remove(); 
			}
			currentField.delete(callback);

		},
		render: function() {
			var view = this;
			var html = view.template(view.model.toJSON());
			$(this.el).append(html);
			return this;
		}
	});

	Mock.Views.FieldTable = Backbone.View.extend({
		initialize: function() {
			_.bindAll(this, "render");
		},
		render: function() {
			var view = this;
			var table = $("#mock-fields tbody");
			table.empty();
			this.collection.each(function(singelField) {
				var row = new Mock.Views.FieldTableRow({
					model: singelField
				});
				table.append(row.render().el);
			});
			return this;
		}
	});


	Mock.Views.MockInfo = Backbone.View.extend({
		template: "app/templates/mock-info.html",
		initialize: function() {
			_.bindAll(this, "render");
		},
		events: {
			"click #addsubmock": "_addSubMock",
			"click #addfield": "_addField",
			"click #delete-mock": "_deleteMock",
			"click #edit-mock": "_editMock",
			"click #jsfiddle": "_jsFiddle",
			"click #jsonp": "_jsonp"
		},
		_addSubMock: function() {
			var view = this;
			$("#addSubMock").remove();
			var subMock = new submock.Views.AddSubMock({
				model: view.model
			})
			//var addMock = new Mock.Views.AddMock();
			subMock.render(function(el) {
				$("body").append(el);
				$('#addSubMock').modal();
			});
		},
		_addField: function() {
			var addMockFieldPage = new mockfield.Views.AddMockField();
			// Attach the tutorial to the DOM
			addMockFieldPage.render(function(el) {
				$("#mock-info").html(el);
			});
		},
		_jsonp: function() {
			//call edit mock view
			this.model.set({
				url: Suds.app.externalMoxURL
			})
			var jsonp = new codesamples.Views.JSONP({
				model: this.model
			});

			jsonp.render(function(el) {
				$("#code-example").html(el);
			});
		},
		_jsFiddle: function() {
			//call edit mock view
			this.model.set({
				url: Suds.app.externalMoxURL
			})
			var jsFid = new codesamples.Views.JSFiddle({
				model: this.model
			});

			jsFid.render(function(el) {
				$("#code-example").html(el);
			});
		},
		_editMock: function() {
			//call edit mock view
			var editMock = new Mock.Views.EditMock({
				model: this.model
			});

			editMock.render(function(el) {
				$("#mock-info").html(el);
			});
		},
		_deleteMock: function() {
			var callback = function(msg) {
				$('#mock-info').empty();
			}
			this.model.delete(callback);
		},
		_buildJSONPExample: function() {
			var code = '$.ajax({type: "GET",dataType: "jsonp",jsonpCallback: "moxsvc",url:"';
			code += Suds.app.externalMoxURL;
			code += '?id=';
			code += this.model.get('idCode');
			code += '",success: function(data) {console.log(data)}});';
			var pre = document.createElement('pre');
			var codeEl = document.createElement('code');

			$(codeEl).html(code);
			$(codeEl).addClass('javascript');
			pre.appendChild(codeEl);

			$('#code-example').html(pre);

		},
		render: function(done) {
			var view = this;

			// Fetch the template, render it to the View element and call done.
			Suds.fetchTemplate(this.template, function(tmpl) {
				
				shared.currentMock = view.model;
				view.el.innerHTML = tmpl(view.model.toJSON());
				done(view.el);

				//sub mocks
				var callback = function(collection) {
					var subMocksTbl = new submock.Views.SubMocksTable({
						collection: collection
					});
					subMocksTbl.render(function(el) {});
				}
				view.model.getMockChildren(callback);

				view._buildJSONPExample();

				//view.model.getMockChildren();

				var fieldTable = new Mock.Views.FieldTable({
					collection: shared.currentMockFields
				});

				fieldTable.render(function(el) {
					$("#mock-info").html(el);
				});

			});

			return this;
		}
	});

	Mock.Views.EditMock = Backbone.View.extend({
		template: "app/templates/editMock.html",
		events: {
			"click #submitMox": "_editMock",
			"click #cancel_btn": "_cancel"
		},
		_cancel: function() {
			$("#mock-info").empty();

			var info = new Mock.Views.MockInfo({
				model: shared.currentMock
			});
			info.render(function(el) {
				$("#mock-info").html(el);
			});

			var fieldTable = new Mock.Views.FieldTable({
				collection: shared.currentMockFields
			});

			fieldTable.render(function(el) {
				$("#mock-info").append(el);
			});
		},
		_editMock: function() {
			var view = this;
			$('#invalid-mock').hide();
			$('#error-list').empty();
			var name = $('#mockName').val();
			var min = $('#mockMin').val();
			var max = $('#mockMax').val();
			var mockid = $('#mockId').val();

			var errorlist = [];
			if (name.length === 0) {
				errorlist.push({
					name: 'name-control',
					msg: 'Name is required!'
				})
			}
			if (min.length === 0) {
				errorlist.push({
					name: 'min-control',
					msg: 'Min Rows is required!'
				})
			}

			if (max.length === 0) {
				errorlist.push({
					name: 'max-control',
					msg: 'Max Rows is required!'
				})
			}

			if (!isNumber(min)) {
				errorlist.push({
					name: 'min-control',
					msg: 'Min Rows must be a number!'
				})
			}

			if (!isNumber(max)) {
				errorlist.push({
					name: 'min-control',
					msg: 'Max Rows must be a number!'
				})
			}

			if (errorlist.length === 0) {
				view.model.set({
					name: name,
					min: min,
					max: max
				});

				var callback = function(msg) {
					$("#mock-info").empty();

					var info = new Mock.Views.MockInfo({
						model: shared.currentMock
					});
					info.render(function(el) {
						$("#mock-info").html(el);
					});

					var fieldTable = new Mock.Views.FieldTable({
						collection: shared.currentMockFields
					});

					fieldTable.render(function(el) {
						$("#mock-info").append(el);
					});
				}
				this.model.save(callback);
			} else {
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
					id: view.model.get("id"),
					name: view.model.get("name"),
					min: view.model.get("min"),
					max: view.model.get("max")
				});
				done(view.el);
			});
		}
	});
	Mock.Views.AddMock = Backbone.View.extend({
		template: "app/templates/addMock.html",
		events: {
			"click #submitMox": "_addMock",
			"click #cancel_btn": "_cancel"
		},
		_cancel: function() {
			$("#mock-info").empty();
		},
		_addMock: function() {

			//remove old validation
			$('.error').removeClass('error');

			var name = $('#mockName').val();
			var min = $('#mockMin').val();
			var max = $('#mockMax').val();

			var errorlist = [];
			if (name.length === 0) {
				errorlist.push({
					name: 'name-control',
					msg: 'Name is required!'
				})
			}
			if (min.length === 0) {
				errorlist.push({
					name: 'min-control',
					msg: 'Min Rows is required!'
				})
			}

			if (max.length === 0) {
				errorlist.push({
					name: 'max-control',
					msg: 'Max Rows is required!'
				})
			}

			if (!isNumber(min)) {
				errorlist.push({
					name: 'min-control',
					msg: 'Min Rows must be a number!'
				})
			}

			if (!isNumber(max)) {
				errorlist.push({
					name: 'min-control',
					msg: 'Max Rows must be a number!'
				})
			}

			if (errorlist.length === 0) {
				var newMock = new Mock.Model.Mock({
					id: 0,
					name: name,
					min: min,
					max: max
				});
				var callback = function(msg) {

					var info = new Mock.Views.MockInfo({
						model: shared.currentMock
					});
					info.render(function(el) {
						$("#mock-info").html(el);
					});

					var fieldTable = new Mock.Views.FieldTable({
						collection: shared.currentMockFields
					});

					fieldTable.render(function(el) {
						$("#mock-info").append(el);
					});
				}
				newMock.save(callback);

				//update mock list
				shared.userMocks.loadUserMocks();
				var mocksTable = new Mock.Views.MocksTable({
					collection: shared.userMocks
				});

				mocksTable.render(function(el) {
					$("#mocks-list").html(el);
				});
			} else {

				var count = errorlist.length;
				for (var i = 0; i < count; i++) {

					$('#' + errorlist[i].name).addClass('error');
					var errorLine = document.createElement('li');
					$(errorLine).html(errorlist[i].msg);

				}
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