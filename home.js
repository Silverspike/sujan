$(function () {

    $('#edit-room').hide();

    $.ajaxSetup({
        xhrFields: {
            withCredentials: true
        }
    });

    let tblBody = $("#tblbody");
    let base_url = 'http://localhost:3000/';
    let imageFile = '';

    function rowTemplate(room) {
        let oneRow = "<tr><td>" + room.name + "</td><td>" + room.desc + "</td>"+ "</td><td>" + room.price + "</td>";
        if (room.image !== '') {
            oneRow += "<td><img src= " + base_url + "uploads/" + room.image + " width='150' /></td>";
        } else {
            oneRow += "<td> No Image </td>";
            
        }
        oneRow += '<td><button type="button" class="btn btn-warning edit" room_id=' + room._id + '>Book</button></td>';
        
        return oneRow;
    }

    // Get request for fetching username
    $.ajax({
        type: 'GET',
        url: base_url + 'users',
        success: function (user) {
            $('#username').html("Welcome, " + user.username + " !");
        }
    })

    $.ajax({
        type: 'GET',
        url: base_url + 'rooms',
        success: function (rooms) {
            // console.log(document.cookie);
            let myRows = [];
            $.each(rooms, function (index, room) {
                myRows.push(rowTemplate(room));
            });
            tblBody.append(myRows);
        },
        error: function () {
            alert('Something went wrong!');
        }
    });

    $("#fileToUpload").on('change', function () {
        let formData = new FormData();
        let files = $("#fileToUpload").get(0).files;
        if (files.length > 0) {
            formData.append("imageFile", files[0]);
        }
        // $("#add-room").prop("disabled", true);
        $.ajax({
            type: 'POST',
            url: base_url + 'upload',
            contentType: false,
            cache: false,
            processData: false,
            data: formData,
            success: function (data) {
                imageFile = data.filename;
                // $("#add-room").prop("disabled", false);
            },
            error: function () {
                alert("Image upload failed!");
            }
        });
    });

    $("#add-room").on('click', function (e) {
        // e.preventDefault();
        let room = {
            name: $("#name").val(),
            desc: $("#desc").val(),
            price: $("#price").val(),
            image: imageFile
        };
        $.ajax({
            type: 'POST',
            url: base_url + 'rooms',
            data: room,
            success: function (room) {
                tblBody.append(rowTemplate(room));
                imageFile = '';
                $('#room-form').trigger('reset');
            },
            error: function () {
                alert("Fill all the form fields!");
            }
        });
    });

    $("#remove-rooms").on('click', function () {
        if (confirm("Do you want to delete all rooms?")) {
            $.ajax({
                type: 'DELETE',
                url: base_url + 'rooms',
                success: function () {
                    location.reload();
                },
                error: function () {
                    alert("Couldn't delete all rooms");
                }
            });
        }
    });

    tblBody.on('click', '.delete', function () {
        $.ajax({
            type: 'DELETE',
            url: base_url + 'rooms/' + $(this).attr('room_id'),
            success: function () {
                location.reload();
            }
        })
    });
    let roomId;
    tblBody.on('click', '.edit', function () {
        roomId = $(this).attr('room_id');


        $.ajax({
            type: 'GET',
            url: base_url + 'rooms/' + roomId,
            success: function (room) {

                if(room.book !== "")
                {
                    console.log("Already Booked")
                    alert('Already Booked')
                } else {
                    console.log("Khali xa")
                    alert('Booked')
                    $.ajax({
                        type: 'GET',
                        url: base_url + 'users',
                        success: function (user) {
                            //$('#username').html("Welcome, " + user.username + " !");
                           let filez = { book: user.username };
                           //console.log(filez)
            
                           $.ajax({
                            type: 'PUT',
                            url: base_url + 'rooms/' + roomId,
                            data: filez,
                            success: function (room) {
                                console.log("Booked")
                                console.log(room);
                                
                            },
                            error: function () {
                                console.log("Cannot Book!");
                            }
                        });
            
                        }
                    })

                }

            }
        })

        
    });

    $('#edit-room').on('click', function () {
        let room = {
            name: $("#name").val(),
            desc: $("#desc").val(),
            price: $("#price").val(),
            image: imageFile
        };
        $.ajax({
            type: 'PUT',
            url: base_url + 'rooms/' + roomId,
            data: room,
            success: function (room) {
                console.log(room);
                location.reload();
            }
        })

    });

    $('#logout').on('click', function () {

        $.ajax({
            type: 'GET',
            url: base_url + 'users/logout' ,
            success: function (user) {
                console.log("You are logged out");
                window.location.href = '../index.html';
                
            },error: function () {
                console.log("Not Logged in!");
            }
        })

    });

});