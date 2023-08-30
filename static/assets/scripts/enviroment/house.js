$(document).ready(function() {
    readHouse();
    createHouse();
    EditHouse();
    DeleteHouse();
    
})

function createHouse(){
    $('#registerForm').submit(function (e){
        e.preventDefault();

        $District = $("#district").val();
        $DistrictApr = $("#district option:selected").data("foo");
        $Type = $('#type').val();
        $HouseNo = $('#houseno').val();
        $HouseNumber = $DistrictApr + "" + $HouseNo
        $status = 0

        
        if($District != null && $DistrictApr != null && $Type != null && $HouseNo != null && $HouseNumber != null && $status == 0) {
            
            // alert(`Option Value: ${$District}\ndata-foo: ${$DistrictApr}\nHouseNumer: ${$HouseNumber}`);
       
     
            // console.log($District + " " + $Type + " " + $HouseNo+ " " + $status)
            $.ajax({
                url: '/createHouse/',
                type: "POST",
                data: {
                    'district': $District,
                    'type': $Type,
                    'houseno': $HouseNumber,
                    'status': $status,
                    csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()                    
                },
                success: function(data) {
                    swal({
                        title: "Success !",
                        text: "You have successfully Created",
                        icon: "success",
                        timer: 1000, // time in milliseconds
                        timerProgressBar: true,
                        showConfirmButton: false
                    })
                    .then(function(){

                        $('#newUser').hide();
                        readHouse()
                        location.reload();
                    })

                },
                error:function(data){
                    swal({
                        title: "Error !",
                        text: "There was an error: "+data,
                        icon: "error",
                        timer: 4000, // time in milliseconds
                        timerProgressBar: true,
                        showConfirmButton: false
                    })
                    // console.log("Erro is "+data)
                }
            })
         

            
        }
        else{
                swal({
                        title: "Error !",
                        text: "There was an error for Saving",
                        icon: "error",
                        timer: 4000, // time in milliseconds
                        timerProgressBar: true,
                        showConfirmButton: false
                    })
        }


    })
}

function readHouse(){

    $.ajax({
        url: "house/",
        type: "POST",
        async: false,
        data:{
            res : 1,
            csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
        },
        success: function(response){
            $('#tbody_data').html(response)
        }
    })

}

function EditHouse(){

    $('.houseEdit').click(function(){
        $id=$(this).data('id');
        $district=$(this).data('district');
        $type=$(this).data('type');
        $houseno=$(this).data('houseno');
        // alert($district)
        $('#UpdateHouse').modal('show');
        $('#uid').val($id)
        $('#udistrict').val($district)
        $('#utype').val($type)
        $('#uhouseno').val($houseno)


        $('#updateForm').submit(function (e){
            e.preventDefault();
            

            
            $UpdateDistrict = $("#udistrict").val();
            $UpdateDistrictApr = $("#udistrict option:selected").data("foo");
            $UpdateType = $('#utype').val();
            $UpdateHouseNo = $('#uhouseno').val();
            $HouseNumber = $UpdateDistrictApr + "" + $UpdateHouseNo
    
           
                
                // console.log($District + " " + $Type + " " + $NetworkNo+ " " + $status)
                $.ajax({
                    url: '/updateHouse/',
                    type: "POST",
                    data: {
                        'id': $id,
                        'district': $UpdateDistrict,
                        'type': $UpdateType,
                        'houseno': $HouseNumber,
                        csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val() 
                    },
                  
                    success: function(data) {
                      
                        swal("Success", data, "success")
                        .then(function(){
                            $('#UpdateHouse').hide();
                            readHouse()
                            location.reload();
                        })
    
                    },
                    error: function(data){
                       
                        swal("Error", data, "error");
                        // swal({
                        //     title: "Error !",
                        //     text: "There was an error: "+data,
                        //     icon: "error",
                        //     timer: 4000, // time in milliseconds
                        //     timerProgressBar: true,
                        //     showConfirmButton: false
                        // })
                    }
                })
    
    
        })




    })

}

function DeleteHouse(){

    $('.houseDelete').click(function (){
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
                    url: '/deleteHouse/',
                    type: "POST",
                    data: {
                        'id': $id,
                        'status': $status,
                        csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val() 
                    },
                  
                    success: function(data) {
                      
                        swal("Success", data, "success")
                        .then(function(){
                            // $('#UpdateHouse').hide();
                            readHouse()
                            location.reload();
                        })
    
                    },
                    error: function(data){
                       
                        swal("Error", data, "error");
                       
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