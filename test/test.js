module("MoxSVCHomePage", {
  setup: function() {
    // opens the page you want to test
    S.open("../index.php");
  }
})

test("page has content", function(){
  ok( S("body *").size(), "There be elements in that there body")
})




test("Top Menu",function(){
	S('#main-menu').exists().visible(function () {
		ok(true, "We can see the top menu.");

		S('#menu_1').exists().visible(function(){
			ok(true, "We can see home menu item.");
		})

		S('#menu_2').exists().visible(function(){
			ok(true, "We can see tour menu item.");
		})
		S('#menu_3').exists().visible(function(){
			ok(true, "We can see docs menu item.");
		})

		S('#menu_4').invisible(function(){
			ok(true, "We cannot see dash menu item.");
		})

		S('#menu_7').invisible(function(){
			ok(true, "We cannot see reports menu item.");
		})

		S('#menu_5').visible(function(){
			ok(true, "We can see login menu item.");
		})

		S('#menu_6').invisible(function(){
			ok(true, "We cannot see logout menu item.");
		})
	});
})

test('Main content',function(){
	ok(S('h1').text()==='Moxsvc',S('h1').text());
	ok(S('#tagline').text()==='Fast data for fast web development.',S('#tagline').text())
});



test('tour',function(){
	S('#menu_2').exists().click(function(){
		S('h1').html('Getting Started');
	})
})

test('documentation',function(){
	S('#menu_3').exists().click(function(){
		S('h1').html('Documentation');
	})
})

test('login',function(){
	S('#menu_5').exists().click(function(){
		S('h1').html('Login');

		S('.control-group:first label').html('User Name:',function(){
			ok(true,S('.control-group:first label').html());
		});

		S('#username').exists(function(){
			ok(true,'user name text box exists.');
		})

		S('#password').exists(function(){
			ok(true,'password text box exists.');
		})

		S('#login_btn').exists(function(){
			ok(true,'login_btn exists.');
		})

		S('#SignUp_btn').exists(function(){
			ok(true,'SignUp_btn exists.');
		})

	})
})

