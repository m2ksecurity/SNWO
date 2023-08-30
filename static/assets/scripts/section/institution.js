$(document).ready(function(){
    // adduser()
    // activeAccount()
    deleteInstitution()
    editInstitution()
    createInstitutionWithSection()
    createInstitution();
    generateDataTable();
    
})



function createInstitution(){
    $('#registerInstitution').submit(function(e){
        e.preventDefault();
        var sec_id = $('#detail_id').text();
        var institutionName =  $('#institutionName').val();
        $.ajax({
            url:'/add_institution/',
            type: 'POST',
            data:{
                'sec_id':sec_id,
                'institution': institutionName,
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
function createInstitutionWithSection(){
    $('#registerInstitutionwithSection').submit(function(e){
        e.preventDefault();
        var sec_id = $('#section').val();
        var institutionName =  $('#institutionName').val();
        $.ajax({
            url:'/add_institution/',
            type: 'POST',
            data:{
                'sec_id':sec_id,
                'institution': institutionName,
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


function deleteInstitution(){

    $('.deleteInstitution').click(function (){
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
                    url: '/delete_Institution/',
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



function editInstitution(){
    $('.editInstitution').click(function(){
        var id = $(this).data('id');
        var get_Institution = $(this).data('institution');
        // alert('The ID of this row is: ' + id+network+description+state);
        $('#editModal').modal('show')
        $('#user-info').text(get_Institution)
        $('#up-institutionName').val(get_Institution)


        $('#updateForm').submit(function (e){
            e.preventDefault();
                var upInstitution = $('#up-institutionName').val();
                $.ajax({
                    url: '/editInstitution/',
                    type: "POST",
                    data: {
                        id: id,
                        'institution':upInstitution,
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
