jQuery(function ($) {
    // Shorthand the application namespace
    var app = Suds.app;

    // Include the modules
    var shared = Suds.module("shared");
    var home = Suds.module("home");
    var tour = Suds.module("tour");
    var login = Suds.module("login");
    var dashboard = Suds.module("dashboard");
    var mock = Suds.module("mock");
    var mockfield = Suds.module("mockfield");
    var menu = Suds.module("menu");
    var docs = Suds.module("docs");
    var signup = Suds.module("signup");
    var logout = Suds.module("logout");
    var codesamples = Suds.module("codesamples");
    var servicelog = Suds.module("servicelog");
    var forgotpassword = Suds.module("forgotpassword");
	
    //App Global Vars
    Suds.app.MenuLoaded = false;
    Suds.app.currentUser = new shared.Model.User({});
    Suds.app.currentManinMenu = new menu.Collection.MenuItems();
    Suds.app.externalMoxURL = 'http://localhost:8000';
	
    //check populated user
    var userId = $('#userId').val();
    if (userId > 0) {
        Suds.app.currentUser.set({
            userId: userId,
            firstName: $('#firstName').val(),
            isLoggedIn: true,
            lastName: $('#lastName').val(),
            roleId: $('#roleId').val()
        });
    }
    else {
        Suds.app.currentUser.set({
            userId: 0
        });
    }
	
    //loads the default - not signed in menu
    Suds.app.currentManinMenu.loadDefaultMenu();

    // Defining the application router, you can attach sub routers here.
    var Router = Backbone.Router.extend({
        routes: {
            "": "index",
            "index": "index",
            "home": "index",
            "tour": "tour",
            "docs": "docs",
            "login": "login",
            "signup": "signup",
            "dashboard": "dashboard",
            "editmock": "editmock",
            "logout": "logout",
            "reports": "reports",
            "forgot_password": "forgotpassword"
        },
        forgotpassword: function (hash) {
            var route = this;
            var forgotPasswordPage = new forgotpassword.Views.Main();
            // Attach the tutorial to the DOM
            forgotPasswordPage.render(function (el) {
                $("#main").html(el);
                route._loadMainMenu();
                // Fix for hashes in pushState and hash fragment
                if (hash && !route._alreadyTriggered) {
                    // Reset to home, pushState support automatically converts hashes
                    Backbone.history.navigate("", false);
                    // Trigger the default browser behavior
                    location.hash = hash;
                    // Set an internal flag to stop recursive looping
                    route._alreadyTriggered = true;
                }
            });
            route.appPageView();
        },
        reports: function (hash) {
            var route = this;
            var reportsPage = new servicelog.Views.MainPage();
            // Attach the tutorial to the DOM
            reportsPage.render(function (el) {
                $("#main").html(el);
                route._loadMainMenu();
			
                // Fix for hashes in pushState and hash fragment
                if (hash && !route._alreadyTriggered) {
                    // Reset to home, pushState support automatically converts hashes
                    Backbone.history.navigate("", false);
                    // Trigger the default browser behavior
                    location.hash = hash;
                    // Set an internal flag to stop recursive looping
                    route._alreadyTriggered = true;
                }

            });
            route.appPageView();
        },
        logout: function (hash) {
            var route = this;
            var logoutPage = new logout.Views.LogoutPage();
            // Attach the tutorial to the DOM
            logoutPage.render(function (el) {
                $("#main").html(el);
                //since we logged out  we need to reload the menu.
                route._loadMainMenu();
                // Fix for hashes in pushState and hash fragment
                if (hash && !route._alreadyTriggered) {
                    // Reset to home, pushState support automatically converts hashes
                    Backbone.history.navigate("", false);
                    // Trigger the default browser behavior
                    location.hash = hash;
                    // Set an internal flag to stop recursive looping
                    route._alreadyTriggered = true;
                }
            });
            route.appPageView();
        },
        _loadMainMenu: function () {
            var route = this;
            if (Suds.app.MenuLoaded === false) {
                Suds.app.MenuLoaded = true;
                var mainMenu = new menu.Views.MainMenu({
                    collection: Suds.app.currentManinMenu
                });
                mainMenu.render(function (el) {
                    $("#top-nav-guest").html(el);
                });
            }
            route.appPageView();
        },
        editmock: function (hash) {
            var route = this;
            var editMockPage = new mock.Views.EditMock();
            editMockPage.render(function (el) {
                $("#mock-info").html(el);
                route._loadMainMenu();
                // Fix for hashes in pushState and hash fragment
                if (hash && !route._alreadyTriggered) {
                    // Reset to home, pushState support automatically converts hashes
                    Backbone.history.navigate("", false);
                    // Trigger the default browser behavior
                    location.hash = hash;
                    // Set an internal flag to stop recursive looping
                    route._alreadyTriggered = true;
                }
            });
            route.appPageView();
        },
        addmockfield: function (hash) {
            var route = this;
            var addMockFieldPage = new mockfield.Views.AddMockField();
            addMockFieldPage.render(function (el) {
                $("#mock-info").html(el);
                route._loadMainMenu();
                // Fix for hashes in pushState and hash fragment
                if (hash && !route._alreadyTriggered) {
                    // Reset to home, pushState support automatically converts hashes
                    Backbone.history.navigate("", false);
                    // Trigger the default browser behavior
                    location.hash = hash;
                    // Set an internal flag to stop recursive looping
                    route._alreadyTriggered = true;
                }
            });
            route.appPageView();
        },
        dashboard: function (hash) {
            var route = this;
            var dashPage = new dashboard.Views.MainPage();
            dashPage.render(function (el) {
                $("#main").html(el);
                route._loadMainMenu();
                // Fix for hashes in pushState and hash fragment
                if (hash && !route._alreadyTriggered) {
                    // Reset to home, pushState support automatically converts hashes
                    Backbone.history.navigate("", false);
                    // Trigger the default browser behavior
                    location.hash = hash;
                    // Set an internal flag to stop recursive looping
                    route._alreadyTriggered = true;
                }
            });
            route.appPageView();
        },
        signup: function (hash) {
            var route = this;
            var signupPage = new signup.Views.MainPage();
            signupPage.render(function (el) {
                $("#main").html(el);
                route._loadMainMenu();
                // Fix for hashes in pushState and hash fragment
                if (hash && !route._alreadyTriggered) {
                    // Reset to home, pushState support automatically converts hashes
                    Backbone.history.navigate("", false);
                    // Trigger the default browser behavior
                    location.hash = hash;
                    // Set an internal flag to stop recursive looping
                    route._alreadyTriggered = true;
                }
            });
            route.appPageView();
        },
        login: function (hash) {
            var route = this;
            var loginPage = new login.Views.Main();
            loginPage.render(function (el) {
                $("#main").html(el);
                route._loadMainMenu();
                // Fix for hashes in pushState and hash fragment
                if (hash && !route._alreadyTriggered) {
                    // Reset to home, pushState support automatically converts hashes
                    Backbone.history.navigate("", false);
                    // Trigger the default browser behavior
                    location.hash = hash;
                    // Set an internal flag to stop recursive looping
                    route._alreadyTriggered = true;
                }
            });
            route.appPageView();
        },
        docs: function (hash) {
            var route = this;
            var docsPage = new docs.Views.Main();
            docsPage.render(function (el) {
                $("#main").html(el);
                route._loadMainMenu();
                // Fix for hashes in pushState and hash fragment
                if (hash && !route._alreadyTriggered) {
                    // Reset to home, pushState support automatically converts hashes
                    Backbone.history.navigate("", false);
                    // Trigger the default browser behavior
                    location.hash = hash;
                    // Set an internal flag to stop recursive looping
                    route._alreadyTriggered = true;
                }
            });
            route.appPageView();
        },
        tour: function (hash) {
            var route = this;
            var tourPage = new tour.Views.Main();
            tourPage.render(function (el) {
                $("#main").html(el);
                route._loadMainMenu();
                // Fix for hashes in pushState and hash fragment
                if (hash && !route._alreadyTriggered) {
                    // Reset to home, pushState support automatically converts hashes
                    Backbone.history.navigate("", false);
                    // Trigger the default browser behavior
                    location.hash = hash;
                    // Set an internal flag to stop recursive looping
                    route._alreadyTriggered = true;
                }
            });
            route.appPageView();
        },
        appPageView: function () {
            $("body").removeClass('backgroundone');
        },
        mainPageView: function () {
            $("body").addClass('backgroundone');
        },
        index: function (hash) {
            var route = this;
            var mainPage = new home.Views.MainPage();
            mainPage.render(function (el) {
                $("#main").html(el);
                route._loadMainMenu();
                // Fix for hashes in pushState and hash fragment
                if (hash && !route._alreadyTriggered) {
                    // Reset to home, pushState support automatically converts hashes
                    Backbone.history.navigate("", false);
                    // Trigger the default browser behavior
                    location.hash = hash;
                    // Set an internal flag to stop recursive looping
                    route._alreadyTriggered = true;
                }
            });
            route.mainPageView();
        }
    });

    // Define your master router on the application namespace and trigger all
    // navigation from this instance.
    app.router = new Router();

    // Trigger the initial route and enable HTML5 History API support
    Backbone.history.start({
        pushState: false
    });

    // All navigation that is relative should be passed through the navigate
    // method, to be processed by the router.  If the link has a data-bypass
    // attribute, bypass the delegation completely.
    $(document).on("click", "a:not([data-bypass])", function (evt) {

        if ($(this).hasClass('backbone')) {
            // Get the anchor href and protcol
            var href = $(this).attr("href");
            var protocol = this.protocol + "//";

            // Ensure the protocol is not part of URL, meaning its relative.
            if (href && href.slice(0, protocol.length) !== protocol) {
                // Stop the default event to ensure the link will not cause a page
                // refresh.
                evt.preventDefault();
                // This uses the default router defined above, and not any routers
                // that may be placed in modules.  To have this work globally (at the
                // cost of losing all route events) you can change the following line
                // to: Backbone.history.navigate(href, true);
                app.router.navigate('#' + href, true);
            }
        }
    });
});