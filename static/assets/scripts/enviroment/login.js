$(document).ready(function () {
  
})


function login(){
    $('#loginForm').submit(function(){

        $email =  $('#email').val()
        $password = $('#password').val()
        

        $.ajax({
            url: '/login/',
            type: 'POST',
            data: {
                'email': $email,
                'password': $password,
                csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val() 

            },
            success: function(response) {
                console.log(response);
            },
            error: function(error) {
                console.log(error);
            }

        })
    })
}