$(function() {
    var $input = $('#footer .subscribe-wrapper .frm-email');
    var $btn = $('#footer .subscribe-wrapper .subscribe-button');
    var $error_msg = $('#footer .subscribe-wrapper .bf-validation-error-msg');
    var language = $('#footer .subscribe-wrapper .frm-language').val();
    var email_regex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    var url = location.href;
    var modal_btn = $('.subscribe-modal a');

    modal_btn.on('click', function() {
        modal_btn.attr('href',url);
    });

    function formValid() {
        $input.addClass('bf-validation-success');
    }

    function formInvalid() {
        $input.addClass('bf-validation-error');
        $error_msg.show();
    }

    function formReset() {
        $input.removeClass('bf-validation-success');
        $input.removeClass('bf-validation-error');
        $error_msg.hide();
    }

    $input.on('blur', function() {
        var email = $input.val();
        if(email_regex.test(email)) {
            formValid();
        } else {
            formInvalid();
        }
    });

    $input.on('focus', function() {
        formReset();
    });

    $btn.on('click', function() {
        $btn.attr('disabled', true);
        $btn.css({ cursor:'wait'});

        var email = $input.val();
        if(!email || !email_regex.test(email)) {
            formInvalid();
            $btn.attr('disabled', false);
            $btn.css({ cursor:'pointer'});
            return;
        }

        $.ajax({
            url: '/subscribe/registerSubscribers',
            type: 'POST',
            cache: false,
            dataType: 'json',
            data: {
                email: email,
                language_code: language,
                subscription_form: 'front_footer'
            }
        }).done(function(data) {
            $('.subscribe-modal').show();
        }).fail(function(data) {
            formInvalid();
        }).always(function() {
            $btn.attr('disabled', false);
            $btn.css({ cursor:'pointer'});
        });
    });

});