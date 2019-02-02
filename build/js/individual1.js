//	Check if element is visible after scrolling
function isScrolledIntoView(elem) {
	var docViewTop = $(window).scrollTop();
	var docViewBottom = docViewTop + $(window).height();

	var elemTop = $(elem).offset().top;
	var elemBottom = elemTop + $(elem).height();
	var result = ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
	return result;
}
$(window).on('scroll', function() {
	if (isScrolledIntoView("#top")) {
		$("#go-up").removeClass("show");
	} else {
		$("#go-up").addClass("show");
	}
});
$(document).ready(function() {
	$('.flex').flexslider({
		animation: "slide",
		controlNav: true
	});
	//	init sliders
	$("#loan-slider").slider({
		range: "min",
		min: 1000,
		max: 5000,
		step: 100,
		slide: function(event, ui) {
			$("#loan-amount").val(ui.value);
			$(".loan-counter").text(ui.value + " грн");
			// var summ = parseInt($("#product-sum").val());
			// var type = $("#creditProduct").val();
			// var term = parseInt($("#credit-month").val());
			// calc(type, summ, term);
		}
	});
	$("#term-slider").slider({
		range: "min",
		min: 1,
		value: 1,
		max: 50,
		step: 1,
		slide: function(event, ui) {
			$("#loan-term").val(ui.value);
			$(".term-counter").text(ui.value);
			// var summ = parseInt($("#product-sum").val());
			// var type = $("#creditProduct").val();
			// var term = parseInt($("#credit-month").val());
			// calc(type, summ, term);
		}
	});

	//	keyups
	$("#loan-amount").on("keyup", function() {
		var summ = parseInt($(this).val());
		$("#loan-slider").slider('option', 'value', summ, 'refresh');
		$(".loan-counter").text(summ + " грн");
	});
	$("#loan-term").on("keyup", function() {
		var term = parseInt($(this).val());
		$("#term-slider").slider('option', 'value', term, 'refresh');
		$(".term-counter").text(term);
	});

	//	input change behavior
	$("#loan-amount").change(function() {
		if ($("#loan-amount").val() < 1000) {
			$("#loan-amount").val(1000);
			$(".loan-counter").text(1000 + " грн");
		} else if ($("#loan-amount").val() > 5000) {
			$("#loan-amount").val(5000);
			$(".loan-counter").text(5000 + " грн");
		}
	});
	$("#loan-term").change(function() {
		if ($("#loan-term").val() < 1) {
			$("#loan-term").val(1);
			$(".term-counter").text(1);
		} else if ($("#loan-term").val() > 50) {
			$("#loan-term").val(50);
			$(".term-counter").text(50);
		}
	});
	//	on forms button click
	$("#send-application").on("click", function() {
		$("#get-loan-form").addClass("active");
	});
	$("#get-loan-form .change").on("click", function() {
		$("#get-loan-form").removeClass("active");
	});

	//	validation
	$.validator.setDefaults({
			highlight: function(element) {
				$(element).closest(".form-group").addClass("has-error");
			},
			unhighlight: function(element) {
				$(element).closest(".form-group").removeClass("has-error");
			}
		})
		//	add custom validator method
	$.validator.addMethod("accept", function(value, element, param) {
		return value.match(new RegExp("." + param + "$"));
	});
	$("#personal-data").validate({
		rules: {
			name: {
				required: true,
				accept: "[\u0400-\u0457 ]+"
					// "[\p{IsCyrillic}]+"
			},
			middlename: {
				required: true,
				accept: "[\u0400-\u0457 ]+"
					// "[\p{IsCyrillic}]+"
			},
			surname: {
				required: true,
				accept: "[\u0400-\u0457 ]+"
					// "[\p{IsCyrillic}]+"
			},
			inn: {
				required: true,
				minlength: 10,
				maxlength: 10
			},
			tel: {
				required: true,
				minlength: 13,
				maxlength: 13
			},
			passport: {
				required: true,
				minlength: 8,
				maxlength: 8
			},
			email: {
				required: true,
				email: true
			},
			conditions: {
				required: true
			}
		},
		messages: {
			name: {
				required: "Введите Ваше имя",
				accept: "Допустимы только кириллические символы"
			},
			middlename: {
				required: "Введите Ваше отчество",
				accept: "Допустимы только кириллические символы"
			},
			surname: {
				required: "Введите Вашу фамилию",
				accept: "Допустимы только кириллические символы"
			},
			inn: {
				required: "Поле ИНН должно содержать 10 цифр",
				minlength: "Необходимо ввести не меньше 10 цифр"
			},
			passport: {
				required: "Введите серию и номер Вашего паспорта",
				minlength: "Необходимо ввести не меньше 8 символов"
			},
			tel: {
				required: "Введите Ваш мобильный",
				minlength: "Пожалуйста, введите номер в формате +380"
			},
			email: {
				required: "Введите Ваш email"
			}
		}
		//,
		// submitHandler: function() {
		// 	var a = {};
		// 	a.region = $("#city").val(),
		// 		a.town = $("#city option:selected").text(),
		// 		a.fio = $("#fio").val(),
		// 		a.phone = $("#tel").val(),
		// 		a.partner = $(".partner").val(),
		// 		a.resource = $(".resource").val();
		// 	a.product = $(".product").val();
		// 	$.post("https://alfabank.ua/deposit/msb-new/tpl/validator.php", a, function(result) {
		// 		$(".center-block").toggleClass('success');
		// 	}, "json")
		// }
	});
	//	#lang toggle menu
	$("#lang").on("click", function(e) {
		$("#lang").toggleClass("active");
		e.stopPropagation()
	});
	$(document).on("click", function(e) {
		if ($(e.target).is("#lang") === false) {
			$("#lang").removeClass("active");
		}
	});
	//	#send-application button hover
	$("#send-application").hover(function() {
		$("#stuff").toggleClass("active");
	});
	$(".menu .has-dropdown").hover(function() {
		$("#open-menu-wrap").toggleClass("active");
	});
	//	smooth scroll to anchor
	$('a[href*="#"]:not([href="#"])').click(function() {
		if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			if (target.length) {
				$('html, body').animate({
					scrollTop: target.offset().top
				}, 300);
				return false;
			}
		}
	});
	//		show faq answer
	$('.faq-list').on('click', '.header', function() {
		$(this).toggleClass('open');
		$(this).parent().children('.answer-wrap').stop().slideToggle(200);
		$(this).children('i').toggleClass('open');
	});

	//	allow enter only numbers
	$('input[data-only-numbers]').on('input', function(event) {
		this.value = this.value.replace(/[^+0-9]/g, '');
	});
});