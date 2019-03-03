function closePop() {
	$('#popup').removeClass('active');
}
function showPop(id) {
	closePop();
	$('#popup').addClass('active');
}
var vid = document.getElementById("video");
function playVid() { 
	$('#stats .text').fadeOut(300);
    vid.play(); 
}
function pauseVid() { 
	$('#stats .text').fadeIn(300);
    vid.pause(); 
}
function scrollTo(target) {
	if ($(target).offset()) {
		var to = $(target).offset().top,
			distance = parseInt(to - $(document).scrollTop());
		if (distance < 0) distance = 0-distance;
		if (target == '#portfolio') to = to-80;
		$('html, body').animate({scrollTop: to}, 300 + distance*0.2);
	}
	else console.warn('No block found!')
}
function toggleMenu() {
	$('#hamburger, #menu').toggleClass('active');
}
function toggleVideo(max) {
	var vid = $('#autoplay'),
		res = $(window).width();
	if (res >= 1024) vid.attr('src', vid.data('src'));
	else vid.removeAttr('src');
}
function animateVisible(e, a) {
    var t = $(document).scrollTop()
      , i = $(window).height();
    $(e).each(function(e, o) {
        var n, s = parseInt($(o).offset().top), d = parseInt($(o).height());
        n = $(o).data("shift") > 0 ? parseInt($(o).data("shift")) : a,
        t + i - n > s && t < s + d + n && $(o).addClass("animated")
    })
}
$(window).resize(toggleVideo);
$(document).ready(function(){
	toggleVideo();
	setTimeout(function(){
		$('header').addClass('active');
		$('#top .header, #top .top-hint, #top .btn').addClass('animated');
	}, 400);
	$('#recent').slick({
		arrows: false,
		dots: true
	});
	$('#feedbacks').slick({
		nextArrow: $('#feed-next'),
		autoplay: true,
		autoplaySpeed: 3000
	});
	$('#feedbacks').on('init beforeChange', function(){
		$('#timer').removeClass('finished');
		setTimeout("$('#timer').addClass('finished');", 10);
	});
	$('#play').click(playVid);
	$('#video').click(pauseVid);
	$('#team').slick({
		arrows: false,
		variableWidth: true,
		slidesToScroll: 1
	});
	$("#recent .more").on('click', function(){
		scrollTo('#portfolio');
		showPop();
	});
	$('.toggle').on('click',function(){
		$(this).toggleClass('active');
		$(this).siblings('.dropdown').toggleClass('active');
		return false;
	})
	$(document).on('keyup', function(e){if (e.keyCode == 27) closePop(e)});
	$(document).on('click','a[href ^= "#"]',function(e){
		e.preventDefault();
		scrollTo($(this).attr('href'));
		$('#hamburger, #menu').removeClass('active');
	});
	$(document).on('click', '.close', closePop);
	$('#hamburger').on('click', toggleMenu);
	$('.custom-scroll').mCustomScrollbar();
});

$(document).on('submit','form',function(){ // перехватываем все при событии отправки
	var form = $(this), // запишем форму, чтобы потом не было проблем с this
		data = form.serialize(); // подготавливаем данные
	$.ajax({ // инициализируем ajax запрос
		type: 'POST',
		url: "send.php",
		dataType: 'json', 
		data: data,
		beforeSend: function(data) { // событие до отправки
		    form.find('button').attr('disabled', 'disabled');
		  },
		success: function(data){ // событие после удачного обращения к серверу и получения ответа
		    alert('Спасибо, мы скоро с Вами свяжемся!');
		    form.find('input, textarea').val('');
		    closePop();
		 },
		complete: function(data) { // событие после любого исхода
		    form.find('button').prop('disabled', false); // в любом случае включим кнопку обратно
		 }
	});
	return false
});
$(window).on('scroll', function(){
	animateVisible(".animate, .header, .btn", 80);
	if ($(document).scrollTop() > 40) $('header').addClass('fixed');
	else $('header').removeClass('fixed');
})