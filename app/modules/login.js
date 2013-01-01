(function(Login) {

    Login.Model = Backbone.Model.extend({});
    Login.Collection = Backbone.Collection.extend({});
    Login.Router = Backbone.Router.extend({});


    Login.Views.Main = Backbone.View.extend({
        template: "app/templates/login.html",
        events: {
            "click #login_btn": "login"
        },
        login: function() {

            $('#invalid-login').hide();
            var user = this.$('#username').val();

            if (user.length === 0) {
                user = $('#username2').val();
            }
			
            var pwd = this.$('#password').val();
            if (pwd.length === 0) {
                pwd = $('#password2').val();
            }
			
			//one user is logged in
			var callback = function(msg){
				if (msg.UserInfo.isLoggedIn !== false) {
                    Suds.app.router.navigate("#dashboard", {
                        trigger: true
                    });
		        	$('#menu_5').hide();//login
		        	$('#menu_4').show();//mocks
		        	$('#menu_6').show();//logout
					$('#menu_7').show();//reports
				}
				else{
                    //display error here
                    $('#invalid-login').show();	
				}
			}
			
			Suds.app.currentUser.Login(user,pwd,callback);
			
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
})(Suds.module("login"));