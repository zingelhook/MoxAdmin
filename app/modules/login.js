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
			$('#error-list').empty();
			$('#error-list').hide();
            $('#invalid-login').hide();
            var email = this.$('#email-input').val();
			var errors = [];
            if (email.length === 0) {
				$('#email-control').addClass('error');
				errors.push('Email is required');
            }
			
            var pwd = this.$('#password').val();
            if (pwd.length === 0) {
				$('#pwd-control').addClass('error');
				errors.push('Password is required');
            }
			var count = errors.length;
			if(count===0){
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
				  	  	var errorLine = document.createElement('li');
				  		$(errorLine).html("Invalid Login");
				  		$('#error-list').append(errorLine);
						$('#error-list').show();
					}
				}
				Suds.app.currentUser.Login(email,pwd,callback);	
			}else{
				$('#invalid-login').show();	
				for (var i = 0; i < count; i++) {
			  	  	var errorLine = document.createElement('li');
			  		$(errorLine).html(errors[i]);
			  		$('#error-list').append(errorLine);
				}
				$('#error-list').show();
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
})(Suds.module("login"));