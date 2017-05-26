$(function () {


    $("input,select").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function ($form, event, errors) {
            // additional error messages or events
        },
        submitSuccess: function ($form, event) {
            event.preventDefault(); // prevent default submit behaviour
            // get values from FORM
            var name = $("input#name").val();
            var email = $("input#email").val();
            var phone = $("input#phone").val();
            var demand = $("input[name=demandOptions]:checked").val();
            var size = $("select[name=parkingSpaces] option:selected").val();
            var valid = true;
            // validate name
            if (name === "") {
                valid = false;
                $("input#name").parent().addClass('has-error');
                $("input#name").next().text($("input#name").data('validation-required-message'));
            } else {
                $("input#name").parent().removeClass('has-error');
                $("input#name").next().text('');
            }
            // validate email
            if (email === "") {
                valid = false;
                $("input#email").parent().addClass('has-error');
                $("input#email").next().text($("input#email").data('validation-required-message'));
            } else {
                $("input#email").parent().removeClass('has-error');
                $("input#email").next().text('');
            }
            // validate phone
            if (phone === "") {
                valid = false;
                $("input#phone").parent().addClass('has-error');
                $("input#phone").next().text($("input#phone").data('validation-required-message'));
            } else {
                $("input#phone").parent().removeClass('has-error');
                $("input#phone").next().text('');
            }
            // validate demand
            if (!demand) {
                valid = false;
                $("input#demandYes").parent().parent().parent().find("p.help-block").text($("input#demandYes").data('validation-required-message'));
            } else {
                $("input#demandYes").parent().parent().parent().find("p.help-block").text('');
            }
            // validate size
            if (size === "") {
                valid = false;
                $("select[name=parkingSpaces]").parent().parent().find("p.help-block").text($("select[name=parkingSpaces]").data('validation-required-message'));
            } else {
                $("select[name=parkingSpaces]").parent().parent().find("p.help-block").text('');
            }

            var inputs = document.getElementsByTagName('input[type="hidden"]');
            for (var i = 0; i < inputs.length; ++i) {
              console.log(inputs[i]);
            }


            if (valid) {
                $.ajax({
                    url: "https://formspree.io/meealljm",
                    method: "POST",
                    dataType: "json",
                    data: {
                        name: name,
                        phone: phone,
                        email: email,
                        demand: demand,
                        size: size,
                        _cc: 'tony@unclestu.com',
                        _replyto: email,
                        _subject: 'Parkalott: Free Trial Inquiry'
                    },
                    cache: false,
                    success: function () {
                        // Success message
                        $('#success').html("<div class='alert alert-success'>");
                        $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;").append("</button>");
                        $('#success > .alert-success').append("<strong>Your message has been sent. </strong>");
                        $('#success > .alert-success').append('</div>');
                        //clear all fields
                        $('#freeTrial').trigger("reset");
                    },
                    error: function () {
                        // Fail message
                        $('#success').html("<div class='alert alert-danger'>");
                        $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;").append("</button>");
                        $('#success > .alert-danger').append("<strong>Sorry, it seems that my mail server is not responding. Please try again later!");
                        $('#success > .alert-danger').append('</div>');
                        //clear all fields
                        $('#freeTrial').trigger("reset");
                    },
                })
            }
        },

        filter: function () {
            return $(this).is(":visible");
        },
    });
    /*
    $('#freeTrial button').click(function (e) {
        e.preventDefault(); // prevent default submit behaviour
        console.log('submit form');
        // get values from FORM
        var name = $("input#name").val();
        var email = $("input#email").val();
        var phone = $("input#phone").val();
        var demand = $("input[name=demandOptions]:checked").val();
        var size = $("select[name=parkingSpaces] option:selected").val();


        $.ajax({
            url: "https://formspree.io/xeeeyzqx",
            //                url: "https://formspree.io/tonysjunk@gmail.com",
            method: "POST",
            dataType: "json",
            data: {
                name: name,
                phone: phone,
                email: email,
                demand: demand,
                size: size
            },
            cache: false,
            success: function () {
                // Success message
                $('#success').html("<div class='alert alert-success'>");
                $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;").append("</button>");
                $('#success > .alert-success').append("<strong>Your message has been sent. </strong>");
                $('#success > .alert-success').append('</div>');
                //clear all fields
                $('#contactForm').trigger("reset");
            },
            error: function () {
                // Fail message
                $('#success').html("<div class='alert alert-danger'>");
                $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;").append("</button>");
                $('#success > .alert-danger').append("<strong>Sorry, it seems that my mail server is not responding. Please try again later!");
                $('#success > .alert-danger').append('</div>');
                //clear all fields
                $('#freeTrial').trigger("reset");
            },
        })
    });
    */
    $("a[data-toggle=\"tab\"]").click(function (e) {
        e.preventDefault();
        $(this).tab("show");
    });
});
/*When clicking on Full hide fail/success boxes */
$('#name').focus(function () {
    $('#success').html('');
});
