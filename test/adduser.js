module("Add User", {
  setup: function() {
    // opens the page you want to test
    S.open("../index.php");
  }
})

test('signupPage',function(){
	expect(7);
	S('#menu_5').exists().click(function (){
		S('#SignUp_btn').exists().click(function(){
			ok(true,'We see the signup button');
			S('#sign-up').exists(function(){
				ok(true, 'We see submit button');
				//S('#sign-up').trigger('click');
				S('#sign-up').exists().click(function(){
					S('#error-list').visible(function(){
						ok(true,'We can see the error list');
						ok(S('#error-list li').size() ===6,S('#error-list li').size());
						//todo: check messages
						ok(S('#firstname-control').hasClass('error'),'first name is highlighted');
						S('#firstname').exists().click().type('billybob');
					
						S('#sign-up').exists().click(function(){
							S('#error-list').visible(function(){
								ok(!S('#firstname-control').hasClass('error'),'first name is not highlighted');
								ok(S('#error-list li').size() ===5,S('#error-list li').size());
							});		
						});

					});	
				});
			});
		})
	})
})