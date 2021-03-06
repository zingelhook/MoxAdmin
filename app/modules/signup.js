(function (SignUp) {

    SignUp.Model = Backbone.Model.extend({});
    SignUp.Collection = Backbone.Collection.extend({});
    SignUp.Router = Backbone.Router.extend({});

	//main signup form
    SignUp.Views.MainPage = Backbone.View.extend({
        template: "app/templates/signup.html",
        events: {
            "click #sign-up": "_register",
            "click #cancel-sign-up": "_cancel"
        },
        _cancel: function(){
			Suds.app.router.navigate("#home", true);
        },
		_register: function() {

			//firstName,lastName,email,userName,pwd,confirmPwd,callback
			$('#error-list').hide();
			$('#invalid-signup').hide();
			$('#error-list').empty();
		
			var firstName = $('#firstname').val();
			var lastName = $('#lastname').val();
			var email = $('#email').val();
			var userName = $('#username').val();
			var pwd = $('#pwd').val();
			var confirmPwd = $('#cpwd').val();
			
			var errors = [];
			//check values first
			if(firstName.length===0){
				$('#firstname-control').addClass('error');
				errors.push('First Name is required');
			}
			else{
				$('#firstname-control').removeClass('error');
			}
			
			if(lastName.length===0){
				$('#lastname-control').addClass('error');
				errors.push('Last Name is required');
			}
			else{
				$('#lastname-control').removeClass('error');
			}
			
			if(email.length===0){
				$('#email-control').addClass('error');
				errors.push('Email is required');
			}
			else{
				$('#email-control').removeClass('error');
			}
			/*	
			if(userName.length===0){
				$('#username-control').addClass('error');
				errors.push('User Name is required');
			}
			else{
				$('#username-control').removeClass('error');
			}
			*/
			
			if(pwd.length===0){
				$('#pwd-control').addClass('error');
				errors.push('Password is required');
			}
			else{
				$('#pwd-control').removeClass('error');
			}	
			
			if(confirmPwd.length===0){
				$('#cpwd-control').addClass('error');
				errors.push('Confirm Password is required');
			}	
			else{
				$('#cpwd-control').removeClass('error');
			}	
			
			var count = errors.length;
			if(count===0){
				$('#error-list').hide();
				$('#invalid-signup').hide();
				$('#error-list').empty();
				
				var callback = function(msg){
				
					$('#error-list').empty();
					if(msg.hasError){
						if(msg.moreerrors!=null){
							var count = msg.moreerrors.length;
							for (var i = 0; i < count; i++) {
								var errorLine = document.createElement('li');
								$(errorLine).html(msg.moreerrors[i]);
								$('#error-list').append(errorLine);
							}
						}

						$('#error-list').show();
						$('#invalid-signup').show();
					}
					else{
						Suds.app.router.navigate("#tour", true);
					}
				}
				Suds.app.currentUser.Register(firstName,lastName,email,userName,pwd,confirmPwd,callback);
			}
			else{
				$('#error-list').empty();
			
				for (var i = 0; i < count; i++) {
			  	  	var errorLine = document.createElement('li');
			  		$(errorLine).html(errors[i]);
			  		$('#error-list').append(errorLine);
				}
				$('#error-list').show();
				$('#invalid-signup').show();

				
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

})(Suds.module("signup"));