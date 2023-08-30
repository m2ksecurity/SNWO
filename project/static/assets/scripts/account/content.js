$(document).ready(function(){
    // adduser()
    // activeAccount()
    deletecontent()
    editcontent()
    create_content();
    generateDataTable();
    
})



function create_content(){
    $('#registercontent').submit(function(e){
        e.preventDefault();
        var app_label =  $('#app_label').val();
        var model =  $('#model').val();
        $.ajax({
            url:'/add_content/',
            type: 'POST',
            data:{
                'app_label': app_label,
                'model': model,
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
    })
}


function deletecontent(){

    $('.deleteContent').click(function (){
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
                    url: '/delete_content/',
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



function editcontent(){
    $('.editContent').click(function(){
        var id = $(this).data('id');
        var app_label = $(this).data('app_label');
        var model = $(this).data('model');
        $('#editModal').modal('show')
        // alert(id)
        $('#info-info').text(model)
        $('#up_app_label').val(app_label)
        $('#up_model').val(model)


        $('#updateForm').submit(function (e){
            e.preventDefault();
                var up_app_label = $('#up_app_label').val(app_label)
                var up_model = $('#up_model').val(model)
                $.ajax({
                    url: '/edit_content/',
                    type: "POST",
                    data: {
                        'id': id,
                        'app_label':up_app_label,
                        'model':up_model,
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
