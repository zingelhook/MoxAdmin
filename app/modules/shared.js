
function isNumber(n) {
	"use strict"
  return !isNaN(parseFloat(n)) && isFinite(n);
}

(function (Shared) {
	"use strict"
    Shared.Model = Backbone.Model.extend({});
    Shared.Collection = Backbone.Collection.extend({});
    Shared.Router = Backbone.Router.extend({});
	var mock = Suds.module("mock");
	var mockField = Suds.module("mockfield");
	Shared.userMocks = new mock.Collection.Mocks();
	Shared.currentMockFields = new mockField.Collection.MockFields();
	Shared.currentMock = new mock.Model.Mock();
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
		Register:function(firstName,lastName,email,userName,pwd,confirmPwd,callback){
			//todo:validate pwd and confirm pwd works
				
            var form_data = {
                firstname: firstName,
                lastname: lastName,
				email:email,
				username: userName,
				password:pwd,
				password2:confirmPwd,
                ajax: '1'
            };
			
			
            $.ajax({
                type: "POST",
                dataType: "json",
                url: base + "index.php/login/createMember",
                data: form_data,
                success: function(msg) {
               
					if(callback!=null){
						callback(msg);
					}
                },
				error:function(msg){
					console.log(msg);
				}
            });
		}
    });
})(Suds.module("shared"));