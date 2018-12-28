$(function () {

    $.ajaxSetup({
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true
    });

    $('#register-form').on('submit', (function (e) {
        e.preventDefault();
        let user = {
            firstname: $("#firstname").val(),
            lastname: $("#lastname").val(),
            username: $("#username").val(),
            password: $("#password").val()
        };
        $.ajax({
            type: 'POST',
            url: 'http://localhost:3000/users/signup',
            dataType: 'json',
            data: user,
            success: function (reply) {
                console.log(reply);
                alert("Your are Registered!");
                window.location.href = '../index.html';
            },
            error: function () {
                alert("Username taken or invalid data");
                //$("#register-form").trigger('reset');
            }

        });
    }));
});