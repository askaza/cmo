$(document).ready(function()
{

	/******************** GENERAL ********************/

		formElements();
		topPanel();
		navigation();
		usingSlider();
		reviewsSlider();
		sendForm();
});



//////////////////////////////////////////// FUNCTIONS /////////////////////////////////////////////
	
	/******************** GENERAL ********************/

		// FORM ELEMENTS
		function formElements()
		{
			/* init placeholder */
			$('input[placeholder], textarea[placeholder]').placeholder();

			/* init phone mask */
			if ($(".phone-field").length)
				$(".phone-field").inputmask({"mask": "+7 (999) 999-99-99", "clearIncomplete": false});

			/* styled select */
			if ($('.styled-select').length)
				$('.styled-select').selecter();

			$(".inp-text").on("focus", function(){
				$(this).removeClass("__error");
			});
		}


		// TOP PANEL
		function topPanel()
		{
			$(window).on("scroll", function()
			{
				var start_pos = 30;

				if ($(window).scrollTop() >= start_pos)
					$("header").addClass("with-bg");
				else
					$("header").removeClass("with-bg");
			});
		}


		// NAVIGATION
		function navigation()
		{
			$(".top-menu__link").on("click", function()
			{
				var top_pos = $($(this).attr('href')).offset().top - $(".header").innerHeight() - 30;

				if ($(this).attr('href') == "#using")
					top_pos = $($(this).attr('href')).offset().top;

				$('html, body').animate({scrollTop: top_pos}, 800);
				return false;
			});

			$(".go-to-form").on("click", function(){
				$('html, body').animate({scrollTop: $("#order-form .section-title").offset().top - $(".header").innerHeight() - 30}, 800);
				return false;
			});

			$(".logo__link").on("click", function(){
				$('html, body').animate({scrollTop: 0}, 800);
				return false;
			});
		}

		
		// USING SLIDER
		function usingSlider()
		{
			if ($('.using-slider').length === 0) 
				return false;

			var slide_animate_speed = 800,
				slide_is_animate = false;

			var using_slider = $('.using-slider').bxSlider(
			{
				mode: "fade",
				speed: slide_animate_speed,
				oneToOneTouch: false,
				adaptiveHeight: true,
				controls:false
			});

			/* only for desktop */
			if (device.desktop() === false)
				return false;
			
			$(window).on("load", function()
			{
				var using_block = $("#using"),
					using_block_top_pos = using_block.offset().top;

				var slide_count = using_slider.getSlideCount(),
					count_seen_slide = 1,
					cur_slide = 0,
					is_seen_all_slide = false;

				var is_start_switch_slide = true,
					is_shift_top_position = false;

				$(document).mousewheel(function(event, delta) 
				{
					if (using_block.is(".is-fully-seen") === false)
					{
						if ($(window).scrollTop() >= using_block_top_pos-1 && $(window).scrollTop() < (using_block_top_pos + using_block.innerHeight() / 2))
						{
							if (is_shift_top_position === false){ 
								$('html, body').animate({scrollTop: using_block_top_pos}, 300);
								is_shift_top_position = true;
							}

							if (is_start_switch_slide)
								setTimeout(function(){is_start_switch_slide = false;}, slide_animate_speed);

							if (slide_is_animate === false && is_start_switch_slide === false)
							{
								if (delta > 0)
								{
									if (is_seen_all_slide && cur_slide <= 0)
									{
										$("#using").addClass("is-fully-seen");
									}	
									else
									{
										slide_is_animate = true;
										using_slider.goToPrevSlide();
										setTimeout(function(){finishSwitchSlide("prev");}, slide_animate_speed + 300);
									}
								}
								else if (delta < 0)
								{
									if (is_seen_all_slide && cur_slide + 1 >= slide_count)
									{
										$("#using").addClass("is-fully-seen");
									}	
									else
									{
										slide_is_animate = true;
										using_slider.goToNextSlide();
										setTimeout(function(){finishSwitchSlide("next");}, slide_animate_speed + 300);
									}
								}
							}

	                       	event.stopPropagation();
	                        event.preventDefault();
						}
					}

					function finishSwitchSlide(direction)
                    {
                    	slide_is_animate = false;

                    	count_seen_slide++;
                    	cur_slide = using_slider.getCurrentSlide();
						
						if (count_seen_slide == using_slider.getSlideCount())
							is_seen_all_slide = true;
                    }
		        });
			});
		}

		// REVIEWS SLIDER
		function reviewsSlider()
		{	
			if ($('.reviews-slider') === 0) 
				return false;

			//var is_full_stop = false;

			var reviews_slider = $('.reviews-slider').bxSlider(
			{
				mode: "fade",
				speed: 500,
				//auto: true,
				pause: 5000,
				oneToOneTouch: false,
				adaptiveHeight: true,
				controls: false,
				onSlideBefore: function($slideElement, oldIndex, newIndex){
					reviews_slider.parents(".reviews-gallery").find(".reviews-slider__preview-item.active").removeClass("active");
					reviews_slider.parents(".reviews-gallery").find(".reviews-slider__preview-item").eq(newIndex).addClass("active");
				}
			});

			var cur_slide = reviews_slider.getCurrentSlide();
			reviews_slider.parents(".reviews-gallery").find(".reviews-slider__preview-item").eq(cur_slide).addClass("active");


			$(".reviews-slider__preview-item").on("click", function()
			{
				var new_active_slide_index = $(this).index();
				reviews_slider.goToSlide(new_active_slide_index);
				//reviews_slider.stopAuto();
				//is_full_stop = true;
			});

			/*
			$(".review-item").hover(
				function(){
					reviews_slider.stopAuto();
				}, 
				function(){
					if (is_full_stop === false)
						reviews_slider.startAuto();
				}
			);
			*/
		}


		// SEND FORM
		function sendForm()
		{
		    $('#send-form').on('click', function(){

		        if( !$('[name=email]').val().length ) {

		            $('[name=email]').addClass('__error').removeClass('__success');

		        } if( !$('[name=tel]').val().length ) {

		            $('[name=tel]').addClass('__error').removeClass('__success');

		        } if ( $('[name=email]').val().length ) {

		            var patternEmail = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;

		            if ( patternEmail.test($('[name=email]').val()) ) {

		                $('[name=email]').removeClass('__error').addClass('__success');

		            } else {

		                $('[name=email]').addClass('__error').removeClass('__success');

		                return false;

		            }

		        } if ( $('[name=tel]').val().length ) {

		            var patternTel = /^( +)?((\+?7|8) ?)?((\(\d{3}\))|(\d{3}))?( )?(\d{3}[\- ]?\d{2}[\- ]?\d{2})( +)?$/;

		            if ( patternTel.test($('[name=tel]').val()) ) {

		                $('[name=tel]').removeClass('__error').addClass('__success');

		            } else {

		                $('[name=tel]').addClass('__error').removeClass('__success');

		                return false;

		            }

		        } if ( $('[name=email]').hasClass('__success') && $('[name=tel]').hasClass('__success') ) {

		            $('[name=email], [name=tel]').removeClass('__error __success');

		            $.post( "order.php", $( "#form" ).serialize() );

		            $('#form-alert').addClass("is-show");

		            setTimeout(function(){
		                $('#form-alert').removeClass("is-show");
		            }, 10000);

		            $('#form')[0].reset();

		        }

		        return false;

		    });
		}
