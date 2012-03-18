/* Author: Kevin Gaddy

*/

//global
var base_url = $('#base').val();


function baseGrowl(msg){
	 $.Growl.show(msg, {
            //settings
            "icon": false,
            "title": false,
            "cls": "",
            "speed": 500,
            "timeout": 3000
        });
}

//build the html element for the dropdown box.
function buildPredefinedDropDown(data, selectedValue) {
    var selectbox = document.createElement("select");
    var count = data.predefineddata.length;
    selectbox.setAttribute('id', 'predefinedId');
    for (var i = 0; i < count; ++i) {

        var optn = document.createElement("option");
        optn.text = data.predefineddata[i].name;
        optn.value = data.predefineddata[i].id;

        if (selectedValue == data.predefineddata[i].id) {
            optn.selected = true;
        }
        selectbox.options.add(optn);
    }
    return selectbox;
}



CORE.create_module("Header-Cap",
function(sb) {

    return {
        init: function() {

            sb.listen({
                'has-name': this.displayMemberName,
                'is-loggedIn': this.showLoggedInSetup,
                'is-admin': this.showAdminSetup,
                'log-out': this.logout
            });



        },
        destroy: function() {

            },
        logout: function() {

            $.ajax({
                type: "POST",
                dataType: "json",
                url: base_url + "index.php/login/logout",
                data: null,
                success: function() {
                    $('#logOutLink').hide();
                    $('#signInLink').show();
                    $('#top-nav-guest').show();
                    $('#top-nav-member').hide();
                    $('#top-nav-admin').hide();
                    $('#welcometext').hide();
                    window.location.reload();

                },
                error: function(msg) {
                    console.dir(msg);
                }
            });

        },
        displayMemberName: function(data) {

            $('#welcometext').html('Welcome ' + data.fullname + '!');
        },
        showLoggedInSetup: function() {

            $('#signInForm').fadeOut(400);
            $('#signInLink').hide();
            $('#top-nav-guest').hide();
            $('#top-nav-member').show();
            $('#logOutLink').show();
        },
        showAdminSetup: function() {
            $('#logOutLink').show();
            $('#signInForm').fadeOut(400);
            $('#signInLink').hide();
            $('#top-nav-guest').hide();
            $('#top-nav-member').hide();
            $('#top-nav-admin').show();
        }

    };
});




CORE.create_module("main-nav",
function(sb) {



    return {
        init: function() {

            sb.listen({
                'is-loggedIn': this.displayMemberData
            });

            base_url = $('#base').val();

        },
        destroy: function() {

            },
        displayMemberData: function() {

            //display member menu
            $('#top-nav-guest').hide();
            $('#top-nav-member').show();
        }

    };
});




//samle - used on tour
CORE.create_module("sample-contacts",
function(sb) {
    function displayUsers(data) {
        $('#users ul').html('');
        var count = data.length;
        for (var i = 0; i < count; i++) {
            var record = '<li><div class="full-name">' + data[i].FirstName + ' ' + data[i].LastName + '</div>';
            record = record + '<div class="address-one">' + data[i].AddressOne + ' ' + data[i].City + ', ' + data[i].State + ' ' + data[i].PostalCode + '</div>';
            record = record + '<div class="user-name"><span class="label">User Name:</span><span class="value"> ' + data[i].userName + '</span></div>';
            record = record + '</li>';
            $('#users ul').append(record);
        }

    }

    function loadSampleData() {

        $.ajax({
            type: 'GET',
            dataType: 'jsonp',
            jsonpCallback: "usernames",
            url: "http://192.168.1.2:8000",
            success: function(data) {

                displayUsers(data);
                //console.dir(data);
            },
            error: function(e, xhr) {
                console.log('Error!');
                console.dir(e);

            }
        });
    }
    return {
        init: function() {


            $('#reload').click(function() {

                //  loadSampleData();
                });

            // loadSampleData();
        },
        destroy: function() {

            },
        openLogin: function() {

            }

    };
});


//handels the slide down login box.
CORE.create_module("login-box",
function(sb) {

    return {
        init: function() {
            //logout
            $('#logOutLink').click(function() {

                sb.notify({
                    type: 'log-out',
                    data: null
                });

            });


            $('#signInLink').click(function() {
                $('#signInForm').slideDown(400);
            });
    

            $('.login_btn').click(function() {
            
            var user =  $('.username').val();
            if(user.length===0){
                user=$('#username2').val();
            }
            var pwd  = $('.password').val();
            if(pwd.length===0){
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
                    url: base_url + "index.php/login/validate_credentials",
                    data: form_data,
                    success: function(msg) {
                        if(msg.UserInfo.isLoggedIn!==false){
                            $('#welcometext').html('Welcome ' + msg.UserInfo.firstname + ' ' + msg.UserInfo.lastname + '!');
                            $('#signInForm').fadeOut(400);
                            $('#signInLink').hide();
                            $('#top-nav-guest').hide();
                            $('#top-nav-member').show();
                        }
                        else{
                             $('#welcometext').html('');
                              $.Growl.show("Invalid login or password.", {
                            //settings
                            "icon": false,
                            "title": false,
                            "cls": "",
                            "speed": 500,
                            "timeout": 4000
                        });
                        }
                    }
                });

                return false;
            });

            sb.listen({
                'open-login': this.openLogin
            });

        },
        destroy: function() {
            }

    };
});


//slider spotlight on front page
CORE.create_module("slider-box",
function(sb) {
    return {
        init: function() {

            //Show the paging and activate its first link
            $(".paging").show();
            $(".paging a:first").addClass("active");

            //Get size of the image, how many images there are, then determin the size of the image reel.
            var imageWidth = $(".window").width();
            var imageSum = $(".image_reel img").size();
            var imageReelWidth = imageWidth * imageSum;

            //Adjust the image reel to its new size
            $(".image_reel").css({
                'width': imageReelWidth
            });

            //Paging  and Slider Function
            var rotate = function() {
                var triggerID = $active.attr("rel") - 1;
                //Get number of times to slide
                var image_reelPosition = triggerID * imageWidth;
                //Determines the distance the image reel needs to slide
                $(".paging a").removeClass('active');
                //Remove all active class
                $active.addClass('active');
                //Add active class (the $active is declared in the rotateSwitch function)
                //Slider Animation
                $(".image_reel").animate({
                    left: -image_reelPosition
                },
                500);

            };

            //Rotation  and Timing Event
            var rotateSwitch = function() {
                play = setInterval(function() {
                    //Set timer - this will repeat itself every 5 seconds
                    $active = $('.paging a.active').next();
                    //Move to the next paging
                    if ($active.length === 0) {
                        //If paging reaches the end...
                        $active = $('.paging a:first');
                        //go back to first
                    }
                    rotate();
                    //Trigger the paging and slider function
                },
                5000);
                //Timer speed in milliseconds (5 seconds)
            };

            rotateSwitch();
            //Run function on launch
            //On Hover
            $(".image_reel a").hover(function() {
                clearInterval(play);
                //Stop the rotation
            },
            function() {
                rotateSwitch();
                //Resume rotation timer
            });

            //On Click
            $(".paging a").click(function() {
                $active = $(this);
                //Activate the clicked paging
                //Reset Timer
                clearInterval(play);
                //Stop the rotation
                rotate();
                //Trigger rotation immediately
                rotateSwitch();
                // Resume rotation timer
                return false;
                //Prevent browser jump to link anchor
            });

        },
        destroy: function() {}

    };
});





CORE.create_module("mocksDetail",
function(sb) {



    return {
        init: function() {
            $('#exposeMoxFrm').click(function() {

                $('#editMox').slideDown(400);
                //editMox
            });
            $('#submitMox').click(function() {
                var qmockName = $('#mockName').val();
                var qmockMin = $('#mockMin').val();
                var qmockMax = $('#mockMax').val();
                var serviceId = $('#mockId').val();

                sb.notify({
                    type: 'update-ServiceDataTemplate',
                    data: {
                        mockName: qmockName,
                        mockMin: qmockMin,
                        mockMax: qmockMax,
                        mockId: serviceId
                    }
                });

            });
            sb.listen({
                'update-ServiceDataTemplate': this.updateServiceDataTemplate
            });

            base_url = $('#base').val();

        },
        destroy: function() {

            },
        updateServiceDataTemplate: function(data) {

            var form_data = {
                mockName: data.mockName,
                mockMin: data.mockMin,
                mockMax: data.mockMax,
                langVar: 'en-us',
                mockId: data.mockId
            };


            $.ajax({
                type: "POST",
                dataType: "json",
                url: base_url + "index.php/mock/update",
                data: form_data,
                success: function(msg) {
                   baseGrowl('Update Successful!!');
                },
                error: function(msg) {
                    console.dir(msg);
                }
            });
        }


    };

});







CORE.create_module("editField-Modal",
function(sb) {
    return {
        init: function() {

            $('#submitField').live('click',
            function() {
                var name = $('#txtName').val();
                var typeId = 1;
                var options = $('#txtoptions').val();
                var predefinedSampleDataId = $('#predefinedId').val();
                var sampleD = $('#txtSampleData').val();
                var mockId = $('#mockId').val();
                var predefinedSampleName = '';//$('#predefinedId').text();

      
                $("#predefinedId option:selected").each(function () {
                    predefinedSampleName += $(this).text() + " ";
                });

                var form_data = {
                    txtName: name,
                    typeId: typeId,
                    txtoptions: options,
                    predefinedSampleDataId: predefinedSampleDataId,
                    txtSampleData: sampleD,
                    mockId: mockId
                };


                $.ajax({
                    type: "POST",
                    dataType: "json",
                    url: base_url + "index.php/mock/addServiceField",
                    data: form_data,
                    success: function(msg) {
                        $('#editform').fadeOut(400);
                        $('#editform fieldset').remove();

                        //we need to add new row to table.
                        var row = document.createElement('tr');
                        row.setAttribute('id', 'tr_' + msg);

                        var cell = document.createElement('td');
                        var str = '<input type="hidden" id="predefinedId_' + msg + '" value="' + predefinedSampleDataId + '">';
                        str = str + '<input type="hidden" id="name_' + msg + '" value="' + name + '">';
                        str = str + '<input type="hidden" id="options_' + msg + '" value="' + options + '">';
                        str = str + '<input type="hidden" id="sample_' + msg + '" value="' + sampleD + '">';
                        str = str + '<a href="#" rel="' + msg + '" class="edit-field" title="Edit Field">Edit</a>';
                        str = str + '<a href="#" rel="' + msg + '" class="delete-field" title="Delete Field">Delete</a>';
                        $(cell).html(str);
                        row.appendChild(cell);

                        var cell2 = document.createElement('td');
                        $(cell2).html(name);
                        row.appendChild(cell2);

                        var cell3 = document.createElement('td');

                        $(cell3).html(predefinedSampleName);


                        row.appendChild(cell3);

                        $('#tblMocks').append(row);
                        $.Growl.show("Success!", {
                            //settings
                            "icon": false,
                            "title": false,
                            "cls": "",
                            "speed": 500,
                            "timeout": 3000
                        });


                    },
                    error: function(msg) {
                        console.dir(msg);
                    }
                });
            });



            $('#updateField').live('click',
            function() {
                var id = $('#fieldId').val();
                var name = $('#txtName').val();
                var typeId = 1;
                var options = $('#txtoptions').val();
                var predefinedSampleDataId = $('#predefinedId').val();
                var sampleD = $('#txtSampleData').val();
                  var predefinedSampleName = '';//$('#predefinedId').text();

      
                $("#predefinedId option:selected").each(function () {
                    predefinedSampleName += $(this).text() + " ";
                });

                var form_data = {
                    txtName: name,
                    typeId: typeId,
                    txtoptions: options,
                    predefinedSampleDataId: predefinedSampleDataId,
                    txtSampleData: sampleD,
                    sid: id
                };

                $.ajax({
                    type: "POST",
                    dataType: "json",
                    url: base_url + "index.php/mock/updateServiceField",
                    data: form_data,
                    success: function(msg) {
                        $('#editform').fadeOut();

                        //need to update hidden fields
                        $('#predefinedId_' + id).val(predefinedSampleDataId);
                        $('#name_' + id).val(name);
                        $('#options_' + id).val(options);
                        $('#sample_' + id).val(sampleD);
                        $('#editform fieldset').remove();
                        $.Growl.show("Update Successful", {
                            //settings
                            "icon": false,
                            "title": false,
                            "cls": "",
                            "speed": 500,
                            "timeout": 3000
                        });

                    },
                    error: function(msg) {
                        console.dir(msg);
                    }
                });



            });


            $('#addField').click(function() {
                sb.notify({
                    type: 'open-FieldForm',
                    data: null
                });
            });

            //delete field button clicked.
            $('.delete-field').live('click',
            function() {
                var fId = $(this).attr('rel');

                var form_data = {
                    fieldId: fId
                };


                $.ajax({
                    type: "POST",
                    dataType: "json",
                    url: base_url + "index.php/mock/deleteServiceField",
                    data: form_data,
                    success: function(msg) {
                        var sel = '#tr_' + fId;
                        $(sel).remove();
                        $.Growl.show("Field Removed", {
                            //settings
                            "icon": false,
                            "title": false,
                            "cls": "",
                            "speed": 500,
                            "timeout": 3000
                        });
                        // console.dir(msg);
                    },
                    error: function(msg) {
                        console.dir(msg);
                    }
                });
            });

            $('.edit-field').live('click',
            function() {
                //first remove any other field form
                $('#editform fieldset').remove();



                var id = $(this).attr('rel');

                var rowSel = '#tr_' + id;

                //$(rowSel).hide();
                //build edit form - editform
                var ni = document.getElementById('editform');
                var editFieldDiv = document.createElement('div');
                var editFieldFieldSet = document.createElement('fieldset');

                //name
                var rowDiv = document.createElement('div');
                var editNameLabel = document.createElement('label');
                editNameLabel.setAttribute('title', 'Name');
                editNameLabel.innerHTML = "Name:";
                editNameLabel.setAttribute('for', 'txtName');
                var editNameInput = document.createElement('input');
                editNameInput.setAttribute('id', 'txtName');
                editNameInput.setAttribute('type', 'text');
                var dName = $('#name_' + id).val();
                editNameInput.setAttribute('value', dName);
                rowDiv.appendChild(editNameLabel);
                rowDiv.appendChild(editNameInput);
                editFieldFieldSet.appendChild(rowDiv);

                //options
                var rowDiv2 = document.createElement('div');
                var oLabel = document.createElement('label');
                oLabel.setAttribute('title', 'Options');
                oLabel.innerHTML = "Options:";
                oLabel.setAttribute('for', 'txtoptions');
                rowDiv2.appendChild(oLabel);

                var optionsInput = document.createElement('input');
                optionsInput.setAttribute('id', 'txtoptions');
                optionsInput.setAttribute('type', 'text');
                var doption = $('#options_' + id).val();
                optionsInput.setAttribute('value', doption);
                rowDiv2.appendChild(optionsInput);
                editFieldFieldSet.appendChild(rowDiv2);

                //sample data
                var rowDiv3 = document.createElement('div');
                var sLabel = document.createElement('label');
                sLabel.setAttribute('title', 'Sample data');
                sLabel.innerHTML = "Sample Data:";
                sLabel.setAttribute('for', 'txtSampleData');
                rowDiv3.appendChild(sLabel);

                var sampleInput = document.createElement('input');
                sampleInput.setAttribute('id', 'txtSampleData');
                sampleInput.setAttribute('type', 'text');
                var dsample = $('#sample_' + id).val();
                sampleInput.setAttribute('value', dsample);
                rowDiv3.appendChild(sampleInput);
                editFieldFieldSet.appendChild(rowDiv3);

                //perdefineddata type
                var rowDiv4 = document.createElement('div');
                var pdLabel = document.createElement('label');
                pdLabel.setAttribute('title', 'Predefined Data Type');
                pdLabel.innerHTML = "Predefined Data Type:";
                pdLabel.setAttribute('for', 'pdDataType');
                rowDiv4.appendChild(pdLabel);

                //fieldId
                var idHidden = document.createElement('input');
                idHidden.setAttribute('type', 'hidden');
                idHidden.setAttribute('id', 'fieldId');
                idHidden.setAttribute('name', 'fieldId');
                idHidden.setAttribute('value', id);


                editFieldFieldSet.appendChild(idHidden);


                $.ajax({
                    type: "GET",
                    dataType: "json",
                    url: base_url + "index.php/predefineddata/getallpredefineddata",
                    success: function(data) {
                        var typeId = $('#predefinedId_' + id).val();

                        var dropBox = buildPredefinedDropDown(data, typeId);
                        rowDiv4.appendChild(dropBox);
                        editFieldFieldSet.appendChild(rowDiv4);

                        //the update button
                        var rowDiv5 = document.createElement('div');
                        var button = document.createElement('input');
                        button.setAttribute('id', 'updateField');
                        button.setAttribute('type', 'button');
                        button.setAttribute('value', 'Update Field');
                        rowDiv5.appendChild(button);
                        editFieldFieldSet.appendChild(rowDiv5);


                        editFieldDiv.appendChild(editFieldFieldSet);
                        ni.appendChild(editFieldDiv);
                        $('#editform').fadeIn(400);
                    },
                    error: function(msg) {
                        //console.dir(msg)
                        }
                });


            });
            sb.listen({
                'open-FieldForm': this.openFieldForm
            });





        },
        destroy: function() {

            },
        openFieldForm: function(data) {

            $('#editform fieldset').remove();
            var buttontitle = "Submit";
            var buttonId = "submitField";
            var id = '';
            var rowSel = '';
            var dName = '';
            var doption = '';
            var dsample = '';

            var typeId = '';
            if (data) {
                id = data.id
                rowSel = '#tr_' + id;
                dName = $('#name_' + id).val();
                doption = $('#options_' + id).val();
                dsample = $('#sample_' + id).val();
                typeId = $('#predefinedId_' + id).val();
            }


            //build edit form - editform
            var ni = document.getElementById('editform');
            var editFieldDiv = document.createElement('div');
            var editFieldFieldSet = document.createElement('fieldset');

            //name
            var rowDiv = document.createElement('div');
            var editNameLabel = document.createElement('label');
            editNameLabel.setAttribute('title', 'Name');
            editNameLabel.innerHTML = "Name:";
            editNameLabel.setAttribute('for', 'txtName');
            var editNameInput = document.createElement('input');
            editNameInput.setAttribute('id', 'txtName');
            editNameInput.setAttribute('type', 'text');

            editNameInput.setAttribute('value', dName);
            rowDiv.appendChild(editNameLabel);
            rowDiv.appendChild(editNameInput);
            editFieldFieldSet.appendChild(rowDiv);

            //options
            var rowDiv2 = document.createElement('div');
            var oLabel = document.createElement('label');
            oLabel.setAttribute('title', 'Options');
            oLabel.innerHTML = "Options:";
            oLabel.setAttribute('for', 'txtoptions');
            rowDiv2.appendChild(oLabel);

            var optionsInput = document.createElement('input');
            optionsInput.setAttribute('id', 'txtoptions');
            optionsInput.setAttribute('type', 'text');

            optionsInput.setAttribute('value', doption);
            rowDiv2.appendChild(optionsInput);
            editFieldFieldSet.appendChild(rowDiv2);

            //sample data
            var rowDiv3 = document.createElement('div');
            var sLabel = document.createElement('label');
            sLabel.setAttribute('title', 'Sample data');
            sLabel.innerHTML = "Sample Data:";
            sLabel.setAttribute('for', 'txtSampleData');
            rowDiv3.appendChild(sLabel);

            var sampleInput = document.createElement('input');
            sampleInput.setAttribute('id', 'txtSampleData');
            sampleInput.setAttribute('type', 'text');

            sampleInput.setAttribute('value', dsample);
            rowDiv3.appendChild(sampleInput);
            editFieldFieldSet.appendChild(rowDiv3);

            //perdefineddata type
            var rowDiv4 = document.createElement('div');
            var pdLabel = document.createElement('label');
            pdLabel.setAttribute('title', 'Predefined Data Type');
            pdLabel.innerHTML = "Predefined Data Type:";
            pdLabel.setAttribute('for', 'pdDataType');
            rowDiv4.appendChild(pdLabel);

            //fieldId
            var idHidden = document.createElement('input');
            idHidden.setAttribute('type', 'hidden');
            idHidden.setAttribute('id', 'fieldId');
            idHidden.setAttribute('name', 'fieldId');
            idHidden.setAttribute('value', id);


            editFieldFieldSet.appendChild(idHidden);


            $.ajax({
                type: "GET",
                dataType: "json",
                url: base_url + "index.php/predefineddata/getallpredefineddata",
                success: function(data) {


                    var dropBox = buildPredefinedDropDown(data, typeId);
                    rowDiv4.appendChild(dropBox);
                    editFieldFieldSet.appendChild(rowDiv4);

                    //the update button
                    var rowDiv5 = document.createElement('div');
                    var button = document.createElement('input');
                    button.setAttribute('id', buttonId);
                    button.setAttribute('type', 'button');
                    button.setAttribute('value', buttontitle);
                    rowDiv5.appendChild(button);
                    editFieldFieldSet.appendChild(rowDiv5);


                    editFieldDiv.appendChild(editFieldFieldSet);
                    ni.appendChild(editFieldDiv);
                    $('#editform').fadeIn(400);
                },
                error: function(msg) {
                    //console.dir(msg)
                    }
            });
        }


    };
});



CORE.create_module("AddNewMox",
function(sb) {


    return {
        init: function() {

            $('#submitNewMox').click(function() {
                var qmockName = $('#mockName').val();
                var qmockMin = $('#mockMin').val();
                var qmockMax = $('#mockMax').val();
                var serviceId = $('#mockId').val();
                var userId = $('#userId').val();

                sb.notify({
                    type: 'add-MoxSvc',
                    data: {
                        mockName: qmockName,
                        mockMin: qmockMin,
                        mockMax: qmockMax,
                        mockId: serviceId,
                        mockuserId: userId
                    }
                });

            });

            sb.listen({
                'add-MoxSvc': this.addMoxSvc
            });


        },
        destroy: function() {},
        addMoxSvc: function(data) {

            var form_data = {
                mockName: data.mockName,
                mockMin: data.mockMin,
                mockMax: data.mockMax,
                langVar: 'en-us',
                mockuserId: data.mockuserId
            };


            $.ajax({
                type: "POST",
                dataType: "json",
                url: base_url + "index.php/mock/create",
                data: form_data,
                success: function(msg) {


                    window.location = base_url + 'index.php/mock?mockid=' + msg;



                },
                error: function(msg) {
                    $.Growl.show(msg, {
                        //settings
                        "icon": false,
                        "title": false,
                        "cls": "",
                        "speed": 500,
                        "timeout": 3000
                    });
                    console.dir(msg);
                }
            });

        }
    };
});







CORE.create_module("Session",
function(sb) {

    var isloggedin;
    return {
        init: function() {

            isloggedin = $('#isLoggedIn').val();

            if (isloggedin == '1') {


                sb.notify({
                    type: 'is-loggedIn',
                    data: null
                });

                sb.notify({
                    type: 'has-name',
                    data: {
                        fullname: $('#firstName').val() + ' ' + $('#lastName').val()
                    }
                });

                sb.notify({
                    type: 'has-role',
                    data: {
                        fullname: $('#roleId').val()
                    }
                });

                if ($('#roleId').val() === '1') {
                    sb.notify({
                        type: 'is-admin',
                        data: null
                    });
                }

            }


        },
        destroy: function() {}
    };
});


$(document).ready(function() {

    CORE.start_all();

});





















