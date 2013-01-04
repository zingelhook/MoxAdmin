module("Add User", {
  setup: function() {
    // opens the page you want to test
    S.open("../index.php");
  }
})

test('signupPage - validations',function(){
	expect(16);
	S('#menu_5').exists().click(function (){
		S('#SignUp_btn').exists().click(function(){
			ok(true,'We see the signup button');
			S('#sign-up').exists(function(){
				ok(true, 'We see submit button');
				S('#sign-up').exists().click(function(){
					S('#error-list').visible(function(){
						ok(true,'We can see the error list');
						ok(S('#error-list li').size() ===6,S('#error-list li').size());
						
						//make sure all are highlighted
						ok(S('#firstname-control').hasClass('error'),'first name is highlighted');
						ok(S('#lastname-control').hasClass('error'),'first name is highlighted');
						
					});	
				});
				
				S('#firstname').exists(20000);
				var input = S('#firstname');
				input.click().type('[ctrl]a[ctrl-up][delete]', function() {
					input.click().type('billybob');
					S('#sign-up').exists().click(function(){
						S('#error-list').visible(function(){
							ok(!S('#firstname-control').hasClass('error'),'first name is not highlighted');
							ok(S('#error-list li').size() ===5,S('#error-list li').size());
						});		
					});
				});
				
				
				
				var inputB = S('#lastname');
				inputB.type('[ctrl]a[ctrl-up][delete]', function() {
					inputB.type('Doe');
					S('#sign-up').exists().click(function(){
						S('#error-list').visible(function(){
							ok(!S('#lastname-control').hasClass('error'),'last name is not highlighted');
							ok(S('#error-list li').size() ===4,S('#error-list li').size());
						});		
					});
				});
				
				var inputC = S('#email');
				inputC.type('[ctrl]a[ctrl-up][delete]', function() {
					inputC.type('Doe@email.com');
					S('#sign-up').exists().click(function(){
						S('#error-list').visible(function(){
							ok(!S('#email-control').hasClass('error'),'email is not highlighted');
							ok(S('#error-list li').size() ===3,S('#error-list li').size());
						});		
					});
				});
				
				
				var inputD = S('#username');
				inputD.type('[ctrl]a[ctrl-up][delete]', function() {
					inputD.type('bbdoe');
					S('#sign-up').exists().click(function(){
						S('#error-list').visible(function(){
							ok(!S('#email-control').hasClass('error'),'user name is not highlighted');
							ok(S('#error-list li').size() ===2,S('#error-list li').size());
						});		
					});
				});
				
				
				var inputE = S('#pwd');
				inputE.type('1234', function() {
					S('#sign-up').exists().click(function(){
						S('#error-list').visible(function(){
							ok(!S('#pwd-control').hasClass('error'),'password is not highlighted');
							ok(S('#error-list li').size() ===1,S('#error-list li').size());
						});		
					});
				});
				
				
				var inputF = S('#cpwd');
				inputF.type('1234', function() {
					S('#sign-up').exists().click(function(){
						//S('#error-list').visible(function(){
						//	ok(!S('#pwd-control').hasClass('error'),'confirm password is not highlighted');
						//	ok(S('#error-list li').size() ===1,S('#error-list li').size());
						//});		
					});
				});
	
				
			});
		})
	})
})