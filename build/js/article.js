var data = $('.user-content').children('h2'),
    headers = [], line, num, list = $('#contents ul');
if (data.length) {
    list.html('');
    for (var i = 0; i < data.length; i++) {
        num = (i >= 9) ? i + 1 : '0' + (i + 1)
        var line = '<li class="anchor"><span>' + num + '</span> <a href="#header' + i + '">' + $(data[i]).text() + '</a></li>';
        $('.user-content h2:eq(' + i + ')').attr('id', 'header' + i);
        list.html(list.html() + line);
    }
}

$(window).on('scroll', function () {
    var max = $(document).height(),
        scrolled = $(document).scrollTop(),
        wheight = $(window).height(),
        pct = Math.ceil(scrolled / (max - wheight * 2) * 100),
        navTop = $('#contents').position().top,
        asideTop = $('#text').offset().top,
        asideHeight = $('#sidebar').height(),
        articleBottom = asideTop + $('#text').height();
    // count scrolled percent in contents block
    $('#progress').height(pct + '%');
    $('#progressbar i').width(pct + '%');

    // fix contents position when scrolling article
    if (scrolled > asideTop + navTop && scrolled + (asideHeight - navTop) < articleBottom) {
        $('#sidebar').removeClass().addClass('fixed').css('top', 0 - navTop + 'px');
    }
    else if (scrolled + (asideHeight - navTop) >= articleBottom) {
        $('#sidebar').removeClass().addClass('bottom').attr('style', '');
    }
    else $('#sidebar').removeClass().attr('style', '');
});

(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s);
    js.id = id;
    js.src = 'https://connect.facebook.net/' + facebook_locale + '/sdk.js#xfbml=1&version=v3.2'; // registrer view
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

$(function () {

    $(document).ready(function () {
        $('header').prepend('<div id="progressbar"><i></i></div>');
    });

    $('.table-wrap').append('<span class="before"></span><span class="after"></span>');
    $('.table-wrap').on('touchstart', function (e) {
        $(this).removeClass().addClass('table-wrap scrolling');
    });

    function updScroll(wrap) {
        wrap.removeClass('scrolling');
        var tcont = wrap.find('.table'),
            tbl = wrap.find('table');
        if (tbl.offset().left < tcont.offset().left) { // scroll moved
            wrap.addClass('moved');
            if ((tbl.width() + tbl.offset().left - tcont.width()) == tcont.offset().left) wrap.removeClass('moved').addClass('finished');
        }

    }

    $('.table-wrap').on('touchmove', function () {
        updScroll($(this));
    });

    //insert titles for images if exists
    $('#text img').each(function (i) {
        var img = $('#text img:eq(' + i + ')');
        if (img.attr('alt').length > 0) img.after('<span class="img-hint">' + img.attr('alt') + '</span>');
    });

    $('#question-text-form').on('beforeSubmit', function (e) {
        var form = $(this);
        if (form.find('.has-error').length) {
            return false;
        }

        var value = form.find('textarea').val();
        $('#question-popup-form').find('#popup-textarea').val(value);

        setTimeout("showPop('question-popup')", 500);

        return false;
    }).on('submit', function (e) {
        e.preventDefault();
    });

    $('#question-popup-form').on('beforeSubmit', function (e) {
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

                    $('#question-text-form')[0].reset();
                    $('#question-popup-form')[0].reset();

                    closePop();
                    setTimeout("showPop('tnx')", 500);
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