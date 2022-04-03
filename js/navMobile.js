var navMobile = (function () {
	var MOBILE_WIDTH = 992;
	var NAV = $('.nav');
	var NAV_LIST = $('.nav__list');
	var LIST_OPEN_TRIGGER = $('.js-nav-open');
	var $body = $('body');

	function init() {
		_setUpListeners();
		_checkMobile();
	}

	function _setUpListeners() {
		$(window).on('resize', function() {
			_checkMobile();
		});

		$body.on('click touch', '.js-nav-open', _toggleNav);

		$('.nav__link').on('click touch', function () {
			NAV_LIST.hide();
			LIST_OPEN_TRIGGER.removeClass('is-active');
		});
	}

	function _checkMobile() {
		if ($(window).width() <= MOBILE_WIDTH) {
			NAV_LIST.hide();
		} else {
			NAV_LIST.show();
		}
	}

	function _toggleNav() {
		NAV_LIST.toggle();
		NAV.find('.js-nav-open').toggleClass('is-active');
	}

	return {
		init: init
	}
})();

navMobile.init();