(function (ForgotPassword) {

    ForgotPassword.Model = Backbone.Model.extend({});
    ForgotPassword.Collection = Backbone.Collection.extend({});
    ForgotPassword.Router = Backbone.Router.extend({});

    // This will fetch the tutorial template and render it.
    ForgotPassword.Views.Main = Backbone.View.extend({
        template: "app/templates/ForgotPassword.html",
		events:{
			"click #submit-forgot":"_submit"
		},
		_submit:function(){
			$('#error-list').empty();
			$('#error-list').hide();
            $('#invalid-email').hide();
			
			var errors = [];
			var email = $('#email_field').val();
            if (email.length === 0) {
				$('#email-control').addClass('error');
				errors.push('Email is required');
            }
			
			var count = errors.length;
			if(count===0){
				//submit
			}
			else{
				$('#invalid-email').show();	
				for (var i = 0; i < count; i++) {
			  	  	var errorLine = document.createElement('li');
			  		$(errorLine).html(errors[i]);
			  		$('#error-list').append(errorLine);
				}
				$('#error-list').show();	
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

})(Suds.module("forgotpassword"));