// Treat the jQuery ready function as the entry point to the application.
// Inside this function, kick-off all initialization, everything up to this
// point should be definitions.
jQuery(function($) {

    // Shorthand the application namespace
    var app = Suds.app;

    // Include the modules
    var shared      = Suds.module("shared");
    var home        = Suds.module("home");
    var tour        = Suds.module("tour");
    var login       = Suds.module("login");
    var dashboard   = Suds.module("dashboard");
    var mock        = Suds.module("mock");
	
	//App Global Vars
    Suds.app.currentUser = new shared.Model.User({});
	Suds.app.externalMoxURL = 'http://97.91.145.243:8000'

    // Defining the application router, you can attach sub routers here.
    var Router = Backbone.Router.extend({
        routes: {
            "": "index",
            "index": "index",
            "home": "index",
            "tour": "tour",
            "login": "login",
            "dashboard": "dashboard"

        },
        dashboard:function(hash){
            var route = this;
            var dashPage = new dashboard.Views.MainPage();
            // Attach the tutorial to the DOM
            dashPage.render(function(el) {
                $("#main").html(el);
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
        },
        login: function(hash) {

            var route = this;
            var loginPage = new login.Views.Main();
            // Attach the tutorial to the DOM
            loginPage.render(function(el) {
                $("#main").html(el);
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
        },
        tour: function(hash) {

            var route = this;
            var tourPage = new tour.Views.Main();
            // Attach the tutorial to the DOM
            tourPage.render(function(el) {
                $("#main").html(el);
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
        },
        index: function(hash) {

            var route = this;
            var mainPage = new home.Views.MainPage();
            // Attach the tutorial to the DOM
            mainPage.render(function(el) {
                $("#main").html(el);
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
    $(document).on("click", "a:not([data-bypass])", function(evt) {
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