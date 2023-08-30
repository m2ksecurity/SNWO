$(document).ready(function(){
    editGroup();
    deleteGroup();
    generateDataTable();
    
})
function generateDataTable(){
    $('#Datatbl').dataTable({
        columnDefs: [{ sortable: false, targets: [2, 3] }],
      });
}

function editGroup(){
    $('.edit-group').click(function(){
        var id = $(this).data('group_id');
        var name = $(this).data('group');
        $('#newGroup').modal('show');
        $('#update-info').text(name);
        $('#up-group').val(name);
        $('#updateForm').submit(function(e){
            e.preventDefault();
            var new_name = $("#up-group").val();
            $.ajax({
                url: '/update_group/',
                type: 'POST',
                data:{
                    'id':id,
                    'name': new_name,
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
        });


    });
}


function deleteGroup(){

    $('.delete-group').click(function (){
        $id= $(this).data('group_id');
        $name= $(this).data('group');
        // alert($id)
        swal({
            title: "Are you sure?",
            text: "Do you really want to delete "+$name +" this record?",
            icon: "warning",
            buttons: ['No', 'Yes'],
            dangerMode: true,
        })
        .then((willDelete) => {
            if(willDelete){
                $.ajax({
                    url: '/delete_group/',
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