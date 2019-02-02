function closePop() {
	$('.toggle, .dropdown, .popup, .toggle-nav, .main-nav').removeClass('active');
	$('body').removeClass('activePop');
}
function showPop(id) {
	closePop();
	var pop = $('#'+id);
	if (!pop.hasClass('small')) $('body').addClass('activePop');
	pop.addClass('active');
}
scrollToBlock = function (blockId) {
    $('html, body').animate({
        scrollTop: $("#" + blockId).offset().top
    }, 1000);
};
$(document).ready(function(){
	$('.toggle').on('click',function(){
		$(this).toggleClass('active');
		$(this).siblings('.dropdown').toggleClass('active');
		return false;
	})
	$(document).on('keyup', function(e){if (e.keyCode == 27) closePop(e)});
	$(document).on('click','a[href ^= "#"]',function(e){
		e.preventDefault();
		var target =$(this).attr('href');
		$('html, body').animate({scrollTop: $(target).offset().top}, 500);
	});
	$('.popup .close').on('click',closePop);
    $('.name').on('click', function () {
        $(this).parents('.box').toggleClass('active');
        // let isActive = $(this).parents('.box').hasClass('active');
        // $('.box.gray').removeClass('active');
        // if (!isActive) $(this).parents('.box').addClass('active');
    });
});