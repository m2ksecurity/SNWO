
create_terorist();  
hideSIzes();
selectType();
creat_case();
generateDataTable();
generateDataTablePrint();

function creat_case(){
    $('#caseForm').submit(function (e){
        e.preventDefault();
        var form_type=0
        var district = $('#district').val();
        var cases = $('#case').val();
        var unit = $('#unit').val();
        var sub_unit = $('#sub_unit').val();
        var type = $('#type').val();
        // var status = $('#status').val();
        var description = $('#description').val();
        var file = $('#image')[0].files[0];
        // console.log(district);
        // console.log(cases);
        // console.log(unit);
        // console.log(sub_unit);
        // console.log(type);
        // // console.log(status);
        // console.log(description);
        // console.log(image);

        var formData = new FormData();
        formData.append('form_type', form_type);
        formData.append('district', district);
        formData.append('unit', unit);
        formData.append('sub_unit', sub_unit);
        formData.append('type', type);
        formData.append('case', cases);
        formData.append('file', file);
        // formData.append('status', status);
        formData.append('description', description);
        formData.append('csrfmiddlewaretoken', $('input[name=csrfmiddlewaretoken]').val());





        $.ajax({
            url: '/add_case/',
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
            },
            error: function (response){
                if(response.success == false){
                    swal("Error !", response.message, "error")
                }
            }
            });
    });

}

function create_terorist(){
    $('#teroristForm').submit(function (e){
        e.preventDefault();
        var form_type=1
        var district = $('#district').val();
        var unit = $('#unit').val();
        var sub_unit = $('#sub_unit').val();
        var status = $('#status').val();
        var description = $('#description').val();
        var info = $('#info').val();
        var file = $('#image')[0].files[0];
        // console.log(district);
        // console.log(cases);
        // console.log(unit);
        // console.log(sub_unit);
        // console.log(type);
        // // console.log(status);
        // console.log(description);
        // console.log(image);

        var formData = new FormData();
        formData.append('form_type', form_type);
        formData.append('district', district);
        formData.append('unit', unit);
        formData.append('sub_unit', sub_unit);
        formData.append('info', info);
        formData.append('file', file);
        formData.append('status', status);
        formData.append('description', description);
        formData.append('csrfmiddlewaretoken', $('input[name=csrfmiddlewaretoken]').val());





        $.ajax({
            url: '/add_terorist/',
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
            },
            error: function (response){
                if(response.success == false){
                    swal("Error !", response.message, "error")
                }
            }
            });
    });

}

function generateDataTable(){
    $('#myTableExport').dataTable({
        columnDefs: [{ sortable: false, targets: [2, 3] }],
      });
}
function generateDataTablePrint(){
    $('#myTableExportPrint').dataTable({
        dom: 'Bfrtip',
        buttons: [
            // 'copy', 
            'csv', 
            // 'excel', 
            'pdf', 
          'print'
        ]
      });
}
function selectType(){
    
    $('#case').on('change',function(e){
        e.preventDefault();
        var choose_case = $(this).val();
        Choosing(choose_case)
    
    });
}
function hideSIzes(){
    $('#status_container').hide();
}
function Choosing(choose_case){
    if(choose_case == 'Dil'){
        $('.case-text').text(choose_case+'- ka');
        $('#type-label').show();
        
    }
    if(choose_case == 'Dagaal'){
        $('.case-text').text(choose_case+'- ka');
        $('#type-label').show();
    }
    if(choose_case == 'Maandooriye'){
        $('.case-text').text(choose_case+'- ka');
        $('#type-label').show();
    }
    if(choose_case == 'Kufsi'){
        $('.case-text').text(choose_case+'- ka');
        $('#type-label').hide();
    }
    if(choose_case == 'Case Dumar'){
        $('.case-text').text(choose_case+'- ka');
        $('#type-label').show();
    }
    if(choose_case == ''){
        $('#type-label').show();
        
        $('.case-text').text('');   
        hideSIzes()

    }
}
