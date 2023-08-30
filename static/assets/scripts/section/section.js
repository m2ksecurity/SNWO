$(document).ready(function(){
    // adduser()
    // activeAccount()
    deleteSection()
    editSection()
    createSection();
    generateDataTable();
    
})



function createSection(){
    $('#registerSection').submit(function(e){
        e.preventDefault();
        var section =  $('#section').val();
        $.ajax({
            url:'/add_section/',
            type: 'POST',
            data:{
                'section': section,
                csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val() 
            },
            success: function(response){
                if(response.success){
                    swal("Successfully !", response.message, "success").then(function(){
                        location.reload();
                      });
                }else{
                    swal("Error !", response.message, "error")
                }
            }
        })
        alert(section)
    })
}


function deleteSection(){

    $('.deleteSection').click(function (){
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
                    url: '/delete_section/',
                    type: "POST",
                    data: {
                        'id': $id,
                        csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val() 
                    },
                    success : function(response){
                        if(response.success){
                            swal("Successfully !", response.message, "success").then(function(){
                                location.reload();
                              });
                        }else{
                            swal("Error !", response.message, "error")
                        }
                       
                    },
                
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





// function activeAccount(){
//     $('.activeAccount').click(function(){
//         $id = $(this).data('id');
       
//         $('#generateModal').modal('show');
//         $('#userid').val($id)
//         $('#activeAccountForm').submit(function (e){
//             e.preventDefault()
//             $userid = $('#userid').val()
//             $password = $('#password').val()

//             $.ajax({
//                 url : '/activeAccount/',
//                 type : 'POST',
//                 data : {
//                     'id' : $userid,
//                     'password' : $password,
//                     csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()  
//                 },
//                 success : function(response){
//                     if(response.success){
//                         swal({
//                             title: "Success !",
//                             text: response.message,
//                             icon: "success",
//                             timer: 4000, // time in milliseconds
//                             timerProgressBar: true,
//                             showConfirmButton: false
    
//                         })
//                         .then(function(){
//                             location.reload();
//                         })

//                     }
//                 },
//                 error: function(error){
//                     swal({
//                         title: "Error !",
//                         text: "There was an error: "+error,
//                         icon: "error",
//                         timer: 4000, // time in milliseconds
//                         timerProgressBar: true,
//                         showConfirmButton: false
//                     })

//                 }
//             })

//         });
//     })
// }

// function disableAccount(){

//     $('.disableAccount').click(function (){
//         $id= $(this).data('id');
//         // alert($id)
//         swal({
//             title: "Are you sure?",
//             text: "Do you really want to delete this record?",
//             icon: "warning",
//             buttons: ['No', 'Yes'],
//             dangerMode: true,
//         })
//         .then((willDelete) => {
//             if(willDelete){
//                 // alert($id)
//                 $status = 1

//                 $.ajax({
//                     url: '/disableAccount/',
//                     type: "POST",
//                     data: {
//                         'id': $id,
//                         csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val() 
//                     },
//                     success : function(response){
//                         if(response.success){
//                             swal({
//                                 title: "Success !",
//                                 text: response.message,
//                                 icon: "success",
//                                 timer: 4000, // time in milliseconds
//                                 timerProgressBar: true,
//                                 showConfirmButton: false
        
//                             })
//                             .then(function(){
//                                 location.reload();
//                             })
    
//                         }
//                     },
//                     error: function(error){
//                         swal({
//                             title: "Error !",
//                             text: "There was an error: "+error,
//                             icon: "error",
//                             timer: 4000, // time in milliseconds
//                             timerProgressBar: true,
//                             showConfirmButton: false
//                         })
    
//                     }
//                 })


//             }
//             else {
//                 swal({
//                     title: "Canceled !",
//                     text: "You have successfully Cancelled",
//                     icon: "error",
//                     timer: 3000, // time in milliseconds
//                     timerProgressBar: true,
//                     showConfirmButton: true
//                 }).then(function () {
//                     location.reload()

//                 })
//             }
//         })

//     })

// }

function editSection(){
    $('.editSection').click(function(){
        var id = $(this).data('id');
        var section = $(this).data('section');
        // alert('The ID of this row is: ' + id+network+description+state);
        $('#editModal').modal('show')
        // alert(id)
        $('#user-info').text(section)
        $('#up_section').val(section)


        $('#updateForm').submit(function (e){
            e.preventDefault();
                var upsection = $('#up_section').val();
                $.ajax({
                    url: '/editSection/',
                    type: "POST",
                    data: {
                        id: id,
                        'section':upsection,
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
    
    
        })



        
    })


}

function generateDataTable(){
    $('#myTableExport').dataTable({
        columnDefs: [{ sortable: false, targets: [2, 3] }],
      });
}
