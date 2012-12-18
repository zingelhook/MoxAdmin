(function (SignUp) {

    SignUp.Model = Backbone.Model.extend({});
    SignUp.Collection = Backbone.Collection.extend({});
    SignUp.Router = Backbone.Router.extend({});

    
	
	//main signup form
    SignUp.Views.MainPage = Backbone.View.extend({
        template: "app/templates/signup.html",
        events: {
            "click #sign-up": "register"
        },
		register: function() {
			//firstName,lastName,email,userName,pwd,confirmPwd,callback
			$('#invalid-signup').hide();
			$('#error-list').empty();
			var firstName = $('#firstname').val();
			var lastName = $('#lastname').val();
			var email = $('#email').val();
			var userName = $('#username').val();
			var pwd = $('#pwd').val();
			var confirmPwd = $('#cpwd').val();
			var callback = function(msg){
				if(msg.hasError){
					for (var name in msg.errors) {
					  if (msg.errors.hasOwnProperty(name)) {
						var errorLine = document.createElement('li');
						$(errorLine).html(msg.errors[name]);
						$('#error-list').append(errorLine);
					  }
					}
					$('#invalid-signup').show();
				}
				else{
					Suds.app.router.navigate("#tour", true);
				}
			}
			Suds.app.currentUser.Register(firstName,lastName,email,userName,pwd,confirmPwd,callback);
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