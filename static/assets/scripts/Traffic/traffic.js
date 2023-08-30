$(document).ready(function(){
    formWizard();
    savingTraffic2();
   getingInstitution();
})

function getingInstitution(){
    $('#section').on('change', function (e) {
        e.preventDefault();
        var section = $(this).val();
        // alert(section)
        if (section != ''){
            var valueSection = $('#section option:selected').text();
            // alert(valueSection)
            
            $.ajax({
                url:'/get_institutions/',
                type : 'GET',
                data:{
                    'section':valueSection,
                },
                success: function (response){

                    console.log(response);
                    var institutionChoose = $('#institution').empty()
                    institutionChoose.empty()
                    // $('#accordion3').empty()
                     $.each(response, function(index, element) {
                       const option = document.createElement("option");
                       option.text = "Choose Instruction";
                       option.text = element.institution;
                       option.value = element.id
                       $('#institution').val(element.institution)
                       institutionChoose.append(option);
                       console.log(element.institution);
                     
             });

                }
            })
        }
        else {
            $('#institution').empty();

        }
  
      })
}

function formWizard(){
    var form = $('#trafficForm').show();
    form.steps({
        headerTag: 'h3',
        bodyTag: 'fieldset',
        transitionEffect: 'slideLeft',
        onInit: function (event, currentIndex) {

            //Set tab width
            var $tab = $(event.currentTarget).find('ul[role="tablist"] li');
            var tabCount = $tab.length;
            $tab.css('width', (100 / tabCount) + '%');

            //set button waves effect
            setButtonWavesEffect(event);
        },
        onStepChanging: function (event, currentIndex, newIndex) {
            if (currentIndex > newIndex) { return true; }

            if (currentIndex < newIndex) {
                form.find('.body:eq(' + newIndex + ') label.error').remove();
                form.find('.body:eq(' + newIndex + ') .error').removeClass('error');
            }

            form.validate().settings.ignore = ':disabled,:hidden';
            return form.valid();
        },
        onStepChanged: function (event, currentIndex, priorIndex) {
            setButtonWavesEffect(event);
        },
        onFinishing: function (event, currentIndex) {
            form.validate().settings.ignore = ':disabled';
            return form.valid();
        },
        onFinished: function (event, currentIndex) {

            savingTraffic2();
            // alert("Good job!", "Submitted!", "success");
            // location.reload();
        }
    });
}

function savingTraffic(){
    $('#trafficForm').submit(function(e){
        e.preventDefault();
        var firstName = $('#firstName').val();
        var middleName = $('#middleName').val();
        var lastName = $('#lastName').val();
        var fullName = firstName + ' ' + middleName + ' ' + lastName
        var institution = $('#institution').val();
        var title = $('#title').val();
        var plate_code = $('#plate_code').val();
        var plate_number = $('#plate_number').val();
        var plate = plate_code + " - "+plate_number
        var malePassenger = $('#malePassenger').val();
        var femalePassenger = $('#femalePassenger').val();
        var frontImage = $('#front_image')[0].files[0];
        var back_image = $('#back_image')[0].files[0];
        // console.log(fullName)
        // console.log(institution)
        // console.log(title)
        // console.log(plate)
        // console.log(malePassenger)
        // console.log(femalePassenger)
        console.log(frontImage) //
        console.log(back_image) //

        var formData = new FormData();
        formData.append('name', fullName);
        formData.append('institution', institution);
        formData.append('title', title);
        formData.append('plate', plate);
        formData.append('malePassenger', malePassenger);
        formData.append('femalePassenger', femalePassenger);
        formData.append('front_image', frontImage);
        formData.append('back_image', back_image);
        formData.append('csrfmiddlewaretoken', $('input[name=csrfmiddlewaretoken]').val());

        $.ajax({
        url: '/save_traffic/',
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        success: function(response){
            if(response.success){
                swal("Successfully !", response.message, "success").then(function(){
                    location.reload();
                  });
            }else{
                swal("Error !", response.message, "error")
            }
        }
        });
  });
} 

function savingTraffic2(){
    // $('#trafficForm').submit(function(e){
    //     e.preventDefault();
        // var firstName = $('#firstName').val();
        // var middleName = $('#middleName').val();
        // var lastName = $('#lastName').val();
        var fullName = $('#name').val();
        var institution = $('#institution').val();
        var title = $('#title').val();
        var plate_code = $('#plate_code').val();
        var plate_number = $('#plate_number').val();
        var plate = plate_code + " - "+plate_number
        var malePassenger = $('#malePassenger').val();
        var femalePassenger = $('#femalePassenger').val();
        var frontImage = $('#front_image')[0].files[0];
        var back_image = $('#back_image')[0].files[0];
        console.log(fullName)
        console.log(institution)
        console.log(title)
        console.log(plate)
        console.log(malePassenger)
        console.log(femalePassenger)
        console.log(frontImage) //
        console.log(back_image) //

        var formData = new FormData();
        formData.append('name', fullName);
        formData.append('institution', institution);
        formData.append('title', title);
        formData.append('plate', plate);
        formData.append('malePassenger', malePassenger);
        formData.append('femalePassenger', femalePassenger);
        formData.append('front_image', frontImage);
        formData.append('back_image', back_image);
        formData.append('csrfmiddlewaretoken', $('input[name=csrfmiddlewaretoken]').val());

        $.ajax({
        url: '/save_traffic/',
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        success: function(response){
            if(response.success){
                swal("Successfully !", response.message, "success").then(function(){
                    location.reload();
                  });
            }else{
                swal("Error !", response.message, "error")
            }
        }
        });
//   });
}


