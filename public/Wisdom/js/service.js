var plan = "";

$(document).ready(function(){
    var date_input=$('input[name="date"]'); //our date input has the name "date"
    var container=$('.bootstrap-iso form').length>0 ? $('.bootstrap-iso form').parent() : "body";
    var options={
        format: 'mm/dd/yyyy',
        container: container,
        todayHighlight: true,
        autoclose: true,
    };
    date_input.datepicker(options);
});

$( "#register" ).click(function() {
    postTest();
});

$( "#plan1" ).click(function() {
    clearForm();
    plan = "Plan1";
});

$( "#plan2" ).click(function() {
    clearForm();
    plan = "Plan2";
});

$( "#plan3" ).click(function() {
    clearForm();
    plan = "Plan3";
});

function getTest() {
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "http://localhost:3000/test",
        "method": "GET"
    };

    $.ajax(settings).done(function (response) {
        console.log(response);
    });
}

function ValidateEmail(mail)
{
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
    {
        return true;
    }
    return (false)
}

function postTest (){
    var info = {};
    var User = {};
    User.name = $('#nameInput').val();
    User.email = $('#inputEmail').val();
    User.phone = $('#inputPhone').val();
    User.location = markerCoordinates;

    info.startDate = $('#date').val();
    info.typeTutorial = $('#sel1').val();
    info.state = "interesting";
    info.plan = plan;
    info.User = User;
    console.log(info);
    clearLabels();
    if (User.name.trim() != ""){
        if (User.email.trim() != "" && ValidateEmail(User.email)){
            if (User.phone.trim() != "") {
                if(info.startDate.trim() != ""){
                    var settings = {
                        "async": true,
                        "crossDomain": true,
                        "url": "https://evening-headland-97724.herokuapp.com/wisdom/register",
                        //"url": "http://localhost:3000/wisdom/register",
                        "method": "POST",
                        "headers": {
                            "content-type": "application/json",
                            "cache-control": "no-cache",
                            'Access-Control-Allow-Origin': '*'
                        },
                        "processData": false,
                        "data": JSON.stringify(info),
                        "contentType": "application/json"
                    };

                    $.ajax(settings).done(function (response) {
                        console.log(response);
                        $('#ModalRegister').modal('toggle');
                    });
                }else{
                    $('#labelDate').css('color', 'red');
                    console.log("Completed date")
                }
            }else{
                $('#labelPhone').css('color', 'red');
                console.log("Completed phone")
            }
        }else{
            $('#labelEmail').css('color', 'red');
            console.log("Completed email")
        }
    }else{
        $('#labelName').css('color', 'red');
        console.log("Completed name")
    }
}

function clearLabels(){
    $('#labelName').css('color', '#8c9099');
    $('#labelEmail').css('color', '#8c9099');
    $('#labelPhone').css('color', '#8c9099');
    $('#labelDate').css('color', '#8c9099');
}

function clearForm(){
    $('#nameInput').val("");
    $('#inputEmail').val("");
    $('#inputPhone').val("");
    $('#date').val("");
}