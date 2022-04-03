"use strict";
/*global $:false */

$(document).ready(function () {

	$('.problem__btn').on('click', function () {
		var title = $(this).closest('.problem').find('.problem__title').text();
		$('#modalDiagnostic').find('[name="formName"]').val('Заказать диагностику (' + title + ')');
	});

	$('input[name="phone"]').inputmask('+38 (999) 999-99-99');

	$('input, textarea').placeholder();

//anchors menu
	$('.anchor').on('click', function (e) {
		e.preventDefault();
		var anchor = "#" + $(this).attr("href");
		$('html,body').stop().animate({scrollTop: $(anchor).offset().top}, 800);
	});

// modals 
	function position(obj) {
		var x = ($(window).outerWidth() - obj.outerWidth()) / 2;
		var y;
		if (obj.outerHeight() > $(window).outerHeight()) {
			y = 60;
		}
		else {
			y = (($(window).outerHeight() - obj.outerHeight()) / 2);
		}
		if (obj.css('position') === 'absolute') {
			y += $(window).scrollTop();
		}
		if (y < 0) {
			y = 0;
		}
		if (x < 0) {
			x = 0;
		}
		obj.css({'left': x, 'top': y});
	}

// map

	$('.address').on('click', function () {
		$('.address').removeClass('address_active');
		$(this).addClass('address_active');
		var map = $(this).data('map');
		$('.yandex-map').removeClass('db');
		$('#' + map).addClass('db');
		$('.map__wrap').removeClass('db');
		$('.' + map).addClass('db');
	});

	$(window).resize(function () {
		$('.modal').each(function () {
			position($(this));
		});
	});

	$('.modal').each(function () {
		position($(this));
	});

	function opening(obj) {
		$('.modal-bg').fadeIn('fast');
		obj.fadeIn('slow');
		position(obj);
	}

	function closing() {
		$('.modal-bg').fadeOut('fast');
		$('.modal').fadeOut('fast');
	}

	$('.modalClose, .modal-bg').click(function () {
		closing();
	});

	$('.showModal').click(function () {
		var href = $(this).attr('href');
		opening($('#' + href));
		return false;
	});

	function clearForm(form) {
		form.find("input[type='text']").val("");
		form.find("textarea").val("");
	}

	

	// validation
        
        $('.rf').each(function(){
            var item = $(this),
            
            btn = item.find('.btn');
            
            
            function checkInput(){
                item.find('select.required').each(function(){
                    if($(this).val() == '0'){
                        
                        
                        $(this).parents('.form-group').addClass('error');
                        $(this).parents('.form-group').find('.error-message').show();

                    } else {
                        // Если поле не пустое удаляем класс-указание
                        $(this).parents('.form-group').removeClass('error');
                    }
                });
                
                
                item.find('input[type=text].required').each(function(){
                    if($(this).val() != ''){
                        // Если поле не пустое удаляем класс-указание
                        $(this).removeClass('error');
                    } else {
                        
                        $(this).addClass('error');
                        $(this).parent('.form-group').find('.error-message').show();
                        
                    }
                });
                
                
                item.find('textarea.required').each(function(){
                    if($(this).val() != ''){
                        // Если поле не пустое удаляем класс-указание
                        $(this).removeClass('error');
                    } else {
                        
                        $(this).addClass('error');
                        $(this).parent('.form-group').find('.error-message').show();
                        
                    }
                });
                
                item.find('input[type=email]').each(function(){
                    var regexp = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/i;
                    var $this = $(this);
                    if($this.hasClass('required')){
                        
                        if (regexp.test($this.val())) {
                            $this.removeClass('error');
                        }else {
                            
                            $this.addClass('error');
                            $(this).parent('.form-group').find('.error-message').show();
                        }
                    }else{
                        
                        if($this.val() != ''){
                            if (regexp.test($this.val())) {
                                $this.removeClass('error');
                            }else {
                            
                            $this.addClass('error');
                            $(this).parent('.form-group').find('.error-message').show();
                            }
                        }else{
                            $this.removeClass('error');
                        }
                    }
                    
                    
                });
                
                
                item.find('input[type=checkbox].required').each(function(){
                    if($(this).is(':checked')){
                        // Если поле не пустое удаляем класс-указание
                        $(this).removeClass('error');
                    } else {
                        
                        $(this).addClass('error');
                        $(this).parent('.form-group').find('.error-message').show();
                    }
                });
                
            
            }

            btn.click(function(){
                checkInput();
                var sizeEmpty = item.find('.error:visible').size();
                if(sizeEmpty > 0){
                    return false;
                } else {
                    // Все хорошо, все заполнено, отправляем форму
                    
                    item.submit();
                    $.fancybox.close();
                }
            });

        });
        
        
        $('select').change(function(){
            if($(this).val() == ''){     
                // Если значение empty
                $(this).parents('.form-group').removeClass('selected');

            } else {
                // Если значение не empty
                $(this).parents('.form-group').addClass('selected');
                $(this).parents('.form-group').removeClass('error');
            }
        });
        
        // end validation
        
        

});

