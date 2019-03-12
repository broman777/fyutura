function closePop() {
	$('body').removeClass('no-overflow');
	$('#popup').removeClass('active');
}
function showPop(id) {
	closePop();
	$('.skills_section').slick('reinit');
	$('body').addClass('no-overflow');
	$('#popup').addClass('active');
	scrollTo('#portfolio');
}
function toggleOverflow() {
	if ($('body').hasClass('no-overflow')) $('body').removeClass('no-overflow');
	else $('body').addClass('no-overflow');
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
	toggleOverflow();
	$('#contacts-mobile').removeClass('active');
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
	$('#portfolio-left').slick({
		arrows: false,
		dots: true,
   		asNavFor: '#portfolio-right',
	});
	$('#portfolio-right').slick({
		nextArrow: $('#portfolio-next'),
		dots: true,
   		asNavFor: '#portfolio-left',
	});
	$('#popup-slider').slick({
		nextArrow: $('#popup-next'),
		dots: true,
		autoplay: true,
		autoplaySpeed: 3000
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
		swipeToSlide: true,
		arrows: false,
		variableWidth: true,
		slidesToScroll: 1
	});
	$("#portfolio .more").on('click', function(){
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
		closePop();
		e.preventDefault();
		scrollTo($(this).attr('href'));
		$('#hamburger, #menu').removeClass('active');
	});
	$(document).on('click', '.close', closePop);
	$('#hamburger').on('click', toggleMenu);
	$('.toggle-contacts').on('click', function(){
		toggleOverflow()
		$('#menu, #hamburger').removeClass('active');
		$('#contacts-mobile').toggleClass('active');
	});
	$('.custom-scroll').mCustomScrollbar();
});

$(document).on('submit','form',function(){
	var form = $(this),
		data = form.serialize();
	$.ajax({
		type: 'POST',
		url: "send.php",
		dataType: 'json', 
		data: data,
		beforeSend: function(data) {
		    form.find('button').attr('disabled', 'disabled');
		  },
		success: function(data){
		    alert('Thank you, data.!');
		    form.find('input').val('');
		 },
		complete: function(data) {
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