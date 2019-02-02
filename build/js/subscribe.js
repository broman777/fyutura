$(function () {

    $('.ajax-subscribe-form').on('beforeSubmit', function (e) {
        var form = $(this);
        var formData = $(this).serialize(),
            submitBtn = form.find(':submit');

        if (form.find('.has-error').length) {
            return false;
        }

        submitBtn.attr("disabled", true);

        $.ajax({
            url: form.attr("action"),
            type: form.attr("method"),
            data: formData,
            success: function (data) {
                if (data.success === true) {
                    form[0].reset();

                    if (form.hasClass('box')) {
                        form.addClass('submitted');
                    } else {
                        form.parents('.box').addClass('submitted');
                    }

                    setTimeout("showPop('ok')", 500);
                    setTimeout("closePop()", 3500);
                }

                submitBtn.attr("disabled", false);
            },
            error: function () {
                submitBtn.attr("disabled", false);
            }
        });

        return false;
    }).on('submit', function (e) {
        e.preventDefault();
    });
});