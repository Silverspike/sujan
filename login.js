$(function () {

    $.ajaxSetup({
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true
    });

    $('#login-form').on('submit', (function (e) {
        e.preventDefault();
        let user = {
            username: $("#username").val(),
            password: $("#password").val()
        };
        $.ajax({
            type: 'POST',
            url: 'http://localhost:3000/users/login',
            dataType: 'json',
            data: user,
            success: function (reply) {
                
                if (reply.status==='Admin')
                {
                    //console.log('You are Admin')
                    alert("Admin Logged in.");
                    window.location.href = '../html/dashboard.html';
                } else {
                    //console.log('You are Normal')
                    alert("You are logged in.");
                    window.location.href = '../html/home.html';
                }

                
            },
            error: function () {
                alert("Username or Password do not match");
                $("#login-form").trigger('reset');
            }

        });
    }));
});