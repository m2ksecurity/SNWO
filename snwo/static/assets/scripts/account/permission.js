$(document).ready(function(){
    // adduser()
    // activeAccount()
    delete_permission();
    edit_permission();
    generateDataTable();
    
})


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


function delete_permission(){

    $('.deletePermission').click(function (){
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
                    url: '/delete_permission/',
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



function edit_permission(){
    $('.editPermission').click(function(){
        var id = $(this).data('id');
        var content_id = $(this).data('content_id');
        var codename = $(this).data('codename');
        var name = $(this).data('name');
        $('#editModal').modal('show')
        $.ajax({
            url:'/get_content_value/',
            type: 'GET',
            data:{
                'id': content_id,
            },
            success: function(response){
                $('#up_content_type').append('<option selected value="'+response.id+'">'+response.app_label+"."+response.model+'</option>');
                // console.log(response)
            }
        })
        
        $('#info').text(codename)
        $('#up_code_name').val(codename)
        $('#up_name').val(name)


        $('#updateForm').submit(function (e){
            e.preventDefault();
                var up_content_type = $('#up_content_type').val();
                var up_code_name = $('#up_code_name').val()
                var up_name = $('#up_name').val()
                // alert(up_content_type)
                $.ajax({
                    url: '/edit_permission/',
                    type: "POST",
                    data: {
                        'id': id,
                        'content_type': up_content_type,
                        'codename':up_code_name,
                        'name':up_name,
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
