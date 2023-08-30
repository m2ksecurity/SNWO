$(document).ready(function() {
    readClean();
    createClean();
    MakePayment();
    // EditClean();
})

function createClean(){
    $('#registerForm').submit(function (e){
        e.preventDefault();

        $Enviroment = $('#enviroment').val();
        $Date = $('#date').val();
        $status = 0

        if($Enviroment != null && $Date != null && $status == 0) {
            
            // console.log($District + " " + $Type + " " + $CleanNo+ " " + $status)
            $.ajax({
                url: '',
                type: "POST",
                data: {
                    'enviroment': $Enviroment,
                    'date': $Date,
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

                        $('#newServices').hide();
                        readClean()
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

function readClean(){

    $.ajax({
        url: "cleaning/",
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

function MakePayment(){
    $('.payfee').click(function(){
        $id = $(this).data('id');
        $('#paymentModal').modal('show');
        $('#servid').val($id)

        $('#PaymentForm').submit(function(e){
            e.preventDefault();
            $services_id = $('#servid').val()
            $account = $('#account').val()
            $dateSer = $('#dateSer').val()
            $price = 5
            $status = 0

            // alert($services_id+" "+$account+" "+$dateSer+"  "+$price)

            $.ajax({
                url: "/makepayment/",
                type: 'POST',
                data: {
                    'service':$services_id,
                    'account':$account,
                    'date':$dateSer,
                    'price':$price,
                    'status':$status,
                    csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()  
                },
                success: function(response){
                    swal({
                        title: "Success !",
                        text: response.message,
                        icon: "success",
                        timer: 8000, // time in milliseconds
                        timerProgressBar: true,
                        showConfirmButton: false
                    })
                    .then(function(){

                        $('#paymentModal').hide();
                        // readClean()
                        location.reload();
                    })

                },
                error:function(error){
                    swal({
                        title: "Error !",
                        text: 'OPS Not Saved!',
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


// function EditClean(){

//     $('#CleanEdit').click(function(){
//         $id=$(this).attr('name');
//         alert($id)
//         // $('#updateClean').modal('show');
//         // $('#udistrict').val($id)


//     })

// }