$(function () {
    $('#header-search-form').on('beforeSubmit', function (e) {
        var form = $(this),
            formData = form.serialize(),
            redirectUrl = form.data('redirect-url');

        if (form.find('.has-error').length) {
            return false;
        }

        $.ajax({
            url: form.attr("action"),
            type: form.attr("method"),
            data: formData,
            success: function (data) {
                if (data.success === true) {
                    form[0].reset();
                    console.log('success');
                    window.location.href = redirectUrl;
                }
            }
        });

        return false;
    }).on('submit', function (e) {
        e.preventDefault();
    });
});