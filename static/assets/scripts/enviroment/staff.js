$(document).ready(function(){
    adduser()
    activeAccount()
    disableAccount()
    
})

function adduser(){

    

    $('#adduserForm').submit(function (e){
        e.preventDefault();

        $first_name = $('#first_name').val();
        $last_name = $('#last_name').val();
        $user_name = $('#user_name').val();
        $email = $('#email').val();

        console.log($email+""+$first_name+" "+$last_name+" "+$user_name)

        $.ajax({
            url : '/adduser/',
            type: 'POST',
            data : {
                'first_name': $first_name,
                'last_name': $last_name,
                'user_name': $user_name,
                'email': $email,
                csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()  
            },
            success: function (response){
                if (response.success){
                    swal({
                        title: "Success !",
                        text: response.message,
                        icon: "success",
                        timer: 4000, // time in milliseconds
                        timerProgressBar: true,
                        showConfirmButton: false

                    })
                    .then(function(){
                        location.reload();
                    })
                    
                }
            },
            error: function(error){
                swal({
                    title: "Error !",
                    text: "There was an error: "+error,
                    icon: "error",
                    timer: 4000, // time in milliseconds
                    timerProgressBar: true,
                    showConfirmButton: false
                })
            }

        })

    })
}


function activeAccount(){
    $('.activeAccount').click(function(){
        $id = $(this).data('id');
       
        $('#generateModal').modal('show');
        $('#userid').val($id)
        $('#activeAccountForm').submit(function (e){
            e.preventDefault()
            $userid = $('#userid').val()
            $password = $('#password').val()

            $.ajax({
                url : '/activeAccount/',
                type : 'POST',
                data : {
                    'id' : $userid,
                    'password' : $password,
                    csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()  
                },
                success : function(response){
                    if(response.success){
                        swal({
                            title: "Success !",
                            text: response.message,
                            icon: "success",
                            timer: 4000, // time in milliseconds
                            timerProgressBar: true,
                            showConfirmButton: false
    
                        })
                        .then(function(){
                            location.reload();
                        })

                    }
                },
                error: function(error){
                    swal({
                        title: "Error !",
                        text: "There was an error: "+error,
                        icon: "error",
                        timer: 4000, // time in milliseconds
                        timerProgressBar: true,
                        showConfirmButton: false
                    })

                }
            })

        });
    })
}


function disableAccount(){

    $('.disableAccount').click(function (){
        $id= $(this).data('id');
        // alert($id)
        swal({
            title: "Are you sure?",
            text: "Do you really want to delete this record?",
            icon: "warning",
            buttons: ['No', 'Yes'],
            dangerMode: true,
        })
        .then((willDelete) => {
            if(willDelete){
                // alert($id)
                $status = 1

                $.ajax({
                    url: '/disableAccount/',
                    type: "POST",
                    data: {
                        'id': $id,
                        csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val() 
                    },
                    success : function(response){
                        if(response.success){
                            swal({
                                title: "Success !",
                                text: response.message,
                                icon: "success",
                                timer: 4000, // time in milliseconds
                                timerProgressBar: true,
                                showConfirmButton: false
        
                            })
                            .then(function(){
                                location.reload();
                            })
    
                        }
                    },
                    error: function(error){
                        swal({
                            title: "Error !",
                            text: "There was an error: "+error,
                            icon: "error",
                            timer: 4000, // time in milliseconds
                            timerProgressBar: true,
                            showConfirmButton: false
                        })
    
                    }
                })


            }
            else {
                swal({
                    title: "Canceled !",
                    text: "You have successfully Cancelled",
                    icon: "error",
                    timer: 3000, // time in milliseconds
                    timerProgressBar: true,
                    showConfirmButton: true
                }).then(function () {
                    location.reload()

                })
            }
        })

    })

}