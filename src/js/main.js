function closePop() {
	$('.toggle, .dropdown, .popup, .toggle-nav, .main-nav').removeClass('active');
	$('body').removeClass('activePop');
}
function showPop(id) {
	closePop();
	var pop = $('#'+id);
	pop.addClass('active');
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


$(document).ready(function(){

	$('#recent').slick({
		arrows: false,
		dots: true
	});
	$('#feedbacks').slick({
		nextArrow: $('#feed-next'),
		autoplay: true,
		autoplaySpeed: 3000
	});
	$('#feedbacks').on('beforeChange', function(){
	  $('#timer').removeClass('finished')
	  setTimeout("$('#timer').addClass('finished');", 10);
	});
	$('#play').click(playVid);
	$('#video').click(pauseVid);
	$('#team').slick({
		arrows: false,
		variableWidth: true,
		slidesToScroll: 1
	});
	$('.toggle').on('click',function(){
		$(this).toggleClass('active');
		$(this).siblings('.dropdown').toggleClass('active');
		return false;
	})
	$(document).on('keyup', function(e){if (e.keyCode == 27) closePop(e)});
	$(document).on('click','a[href ^= "#"]',function(e){
		e.preventDefault();
		var target = $(this).attr('href');
		if ($(target).offset()) $('html, body').animate({scrollTop: $(target).offset().top}, 500);
		else console.warn('No block found!')
	});
	$('.popup .close').on('click',closePop);

});