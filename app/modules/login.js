(function(Login) {

    Login.Model = Backbone.Model.extend({});
    Login.Collection = Backbone.Collection.extend({});
    Login.Router = Backbone.Router.extend({});

    // This will fetch the tutorial template and render it.
    Login.Views.Main = Backbone.View.extend({
        template: "app/templates/login.html",
        events: {
            "click #login_btn": "login"
        },
        login: function() {

            $('#invalid-login').hide();
            var user = this.$('#username').val();

            if (user.length === 0) {
                user = $('#username2').val();
            }
			
            var pwd = this.$('#password').val();
            if (pwd.length === 0) {
                pwd = $('#password2').val();
            }

            var form_data = {
                username: user,
                password: pwd,
                ajax: '1'
            };

            $.ajax({
                type: "POST",
                dataType: "json",
                url: base + "index.php/login/validate_credentials",
                data: form_data,
                success: function(msg) {
                    if (msg.UserInfo.isLoggedIn !== false) {
                        Suds.app.currentUser.set({
                            userId: msg.UserInfo.userid,
                            firstName: msg.UserInfo.firstname,
                            isLoggedIn: msg.UserInfo.isLoggedIn,
                            lastName: msg.UserInfo.lastname,
                            roleId: msg.UserInfo.roleId
                        });
                        Suds.app.router.navigate("#dashboard", {
                            trigger: true
                        });
                  
                    } else {
                        //display error here
                        $('#invalid-login').show();

                    }
                }
            });


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