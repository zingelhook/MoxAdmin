(function (Shared) {
    Shared.Model = Backbone.Model.extend({});
    Shared.Collection = Backbone.Collection.extend({});
    Shared.Router = Backbone.Router.extend({});
	var mock = Suds.module("mock");
	Shared.userMocks = new mock.Collection.Mocks();

    Shared.Model.User = Backbone.Model.extend(
    {
        defaults: {
            "userId": 0
        },
  	  	Login:function(userName,pwd,callback){
            var form_data = {
                username: userName,
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
						
						
						if(callback!=null){
							callback(msg);
						}

                    } else {
						if(callback!=null){
							callback(msg);
						}
                    }
                }
            });
        },
		Register:function(firstName,lastName,email,userName,pwd,confirmPwd){
			
		}
    });
})(Suds.module("shared"));