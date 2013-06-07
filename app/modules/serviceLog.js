(function (ServiceLog) {

    ServiceLog.Model = Backbone.Model.extend({});
    ServiceLog.Collection = Backbone.Collection.extend({});
    ServiceLog.Router = Backbone.Router.extend({});
	ServiceLog.Model.ServiceLogItem = Backbone.Model.extend({});
	
	ServiceLog.Collection.ServiceLogItems = Backbone.Collection.extend({
		model: ServiceLog.Model.ServiceLogItem,
		loadData: function(callback, failcallback) {
			var col = this;
			var form_data = {
				roleId: Suds.app.currentUser.get('roleId')
			};
			
			$.ajax({
				type: "GET",
				dataType: "json",
				url: base + "index.php/servicelog/AllLogs",
				data: form_data,
				success: function(msg) {
					if(msg!=null){
						var count = msg.servicelogs.length;
						for (var i = 0; i < count; i++) {
							var um = new ServiceLog.Model.ServiceLogItem({
								MoxName: msg.servicelogs[i].MoxName,
								logDate:msg.servicelogs[i].logDate,
								userAgent:msg.servicelogs[i].userAgent,
								userId: msg.servicelogs[i].userId,
								userName: msg.servicelogs[i].userName,
								name: msg.servicelogs[i].name
							});
							col.add(um);
						}
						callback(col);
					}
				},
				error: function(msg) {
					console.log(msg);
				}
			});
		}
	});
	
    ServiceLog.Views.MainPage = Backbone.View.extend({
        template: "app/templates/reports.html",
		events:{
			"click #svcLog":"_scvLog"
		},
		_scvLog:function(e){
			var view = this;
			e.preventDefault();
			
			var slCollection = new ServiceLog.Collection.ServiceLogItems();
			var callback = function(data){

				var sl = new ServiceLog.Views.LogTable({
					collection:data
				});
				sl.render(function(el) {
	                $("#reports-sec").html(el);
				});
				
			}
			slCollection.loadUserMocks(callback);
	
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
	
	ServiceLog.Views.TableRow  = Backbone.View.extend({
	    tagName: "tr",
		template: _.template("<td class='logDate'><%=logDate%></td><td class='userAgent'><%=userAgent%></td><td class='name'><%=name%></td><td class='MoxName'><%=MoxName%></td>"),
	    initialize: function () {
	        _.bindAll(this, "render");
	    },
	    render: function () {
			var view=this;
			var html = view.template(view.model.toJSON());
			$(this.el).append(html);
	        return this;
	    }
	});
	
    ServiceLog.Views.LogTable = Backbone.View.extend({
        render: function (done) {
			var view =this;
	        var table = $("#servicelog tbody");
			$(table).empty();
	        this.collection.each(function (singelField) {
	            var row = new ServiceLog.Views.TableRow({ model: singelField });				
	            table.append(row.render().el);
	        });
	        return this;
        }
    });
	
	
})(Suds.module("servicelog"));