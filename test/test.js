module("MoxSVCHomePage", {
  setup: function() {
    // opens the page you want to test
    S.open("../index.php");
  }
})

test("page has content", function(){
  ok( S("body *").size(), "There be elements in that there body")
})


test("Header", function(){
  //ok( S("body *").size(), "There be elements in that there body")
	S('#header-cap').visible(function(){
		ok(true,'We see the topmost bar on the header.');
		
		//singnin link is visible.
		S('#signInLink').visible(function(){
			ok(true,'We can see the sign-in link.')
		});
		
		
		//we are not logged in. so do not show welcome text.
		var txt = S('#welcometext').html();
		ok(txt==='','No welcome text:' + txt);
	});
})



//test footer


//test login
module("Login-Test-Account", {

})

test("LoginBox", function(){
  //ok( S("body *").size(), "There be elements in that there body")
	S('#header-cap').visible(function(){
	
		
		//singnin link is visible.
		S('#signInLink').visible(function(){
			ok(true,'We can see the sign-in link.')
			S('#signInLink').click();
				S('#signInForm').visible(function(){
					S('#username').click().text('test');
					S('#password').click().text('test');
				});
		
			
			
		});
		

	});
})