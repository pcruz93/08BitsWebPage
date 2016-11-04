// Enviar el correo con los datos de la solicitud
$(function () {

    $("#requestForm input,#requestForm textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function ($form, event, errors) {
            // additional error messages or events
        },
        submitSuccess: function ($form, event) {
            // Prevent spam click and default submit behaviour
            $("#btnRequest").attr("disabled", true);
            event.preventDefault();

            // get values from FORM
            var name = $("#namerequest").val();
            var email = $("#emailrequest").val();
            var phone = $("#phonerequest").val();
            var budget = $("#sel1").val();
            var message = $("#messagerequest").val();

            if(name == '' || email == '' || phone == '' || message == ''){
                // Fail message
                $('#successrequest').html("<div class='alert alert-danger'>");
                $('#successrequest > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                    .append("</button>");
                $('#successrequest > .alert-danger').append("<strong>Faltan datos por llenar.");
                $('#successrequest > .alert-danger').append('</div>');
            } else {
                $.post("././request", {
                    name: name,
                    email: email,
                    phone: phone,
                    budget: budget,
                    message: message
                }, function (data) {
                    if (data === 'done') {
                        // Enable button & show success message
                        $("#btnRequest").attr("disabled", false);
                        $('#successrequest').html("<div class='alert alert-success'>");
                        $('#successrequest > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                            .append("</button>");
                        $('#successrequest > .alert-success')
                            .append("<strong>La información ha sido enviada correctamente. Nos comunicaremos pronto.</strong>");
                        $('#successrequest > .alert-success')
                            .append('</div>');

                        //clear all fields
                        $('#requestForm').trigger("reset");
                    }
                    else {
                        // Fail message
                        $('#successrequest').html("<div class='alert alert-danger'>");
                        $('#successrequest > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                            .append("</button>");
                        $('#successrequest > .alert-danger').append("<strong>Ha ocurrido un error al enviar la información. Inténtalo más tarde.");
                        $('#successrequest > .alert-danger').append('</div>');
                        //clear all fields
                        $('#requestForm').trigger("reset");
                    }
                });
            }
        },
        filter: function () {
            return $(this).is(":visible");
        },
    });

    $("a[data-toggle=\"tab\"]").click(function (e) {
        e.preventDefault();
        $(this).tab("show");
    });
});

// When clicking on Full hide fail/success boxes
$('#namerequest').focus(function () {
    $('#successrequest').html('');
    $("#btnRequest").attr("disabled", false);
});

// When clicking on Full hide fail/success boxes
$('#emailrequest').focus(function () {
    $('#successrequest').html('');
    $("#btnRequest").attr("disabled", false);
});

// When clicking on Full hide fail/success boxes
$('#phonerequest').focus(function () {
    $('#successrequest').html('');
    $("#btnRequest").attr("disabled", false);
});

// When clicking on Full hide fail/success boxes
$('#sel1').focus(function () {
    $('#successrequest').html('');
    $("#btnRequest").attr("disabled", false);
});

// When clicking on Full hide fail/success boxes
$('#messagerequest').focus(function () {
    $('#successrequest').html('');
    $("#btnRequest").attr("disabled", false);
});

