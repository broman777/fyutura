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
	if ($(target).offset()) $('html, body').animate({scrollTop: $(target).offset().top}, 500);
	else console.warn('No block found!')
}
function toggleMenu() {
	$('#hamburger, #menu').toggleClass('active');
}

$(document).ready(function(){
	setTimeout("$('header').addClass('active');", 400);
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
	});
	$(document).on('click', '.close', closePop);
	$('#hamburger').on('click', toggleMenu);
	$('.custom-scroll').mCustomScrollbar();
});
$(window).on('scroll', function(){
	if ($(document).scrollTop() > 40) $('header').addClass('fixed');
	else $('header').removeClass('fixed');
})