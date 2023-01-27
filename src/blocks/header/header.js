import scrollLock from 'scroll-lock';

(() => {
	const $header = $('.header');
	const $shell = $header.find('.header__navi');
	const vh = window.innerHeight * 0.01; // решение проблемы 100vh для меню на мобильных устройствах
	const $toggle = $header.find('.header__toggle').add('.navi__close');
	
	$toggle.on('click', function(e) {
		e.preventDefault();
		e.stopPropagation();
		$(this).toggleClass('opened');
		$shell.toggleClass('opened');
		
		if($shell.hasClass('opened')) {
			$shell.css({'max-width': parseInt($shell.css('max-width')) + scrollLock.getPageScrollBarWidth()});
			scrollLock.disablePageScroll();
			return;
		}
		
		$shell.removeAttr('style');
		scrollLock.clearQueueScrollLocks();
		scrollLock.enablePageScroll();
	});
	
	$(window).on('click', function(e) {
		if($shell.hasClass('opened') && !e.target.closest('.header__navi') && !e.target.closest('.modal')) {
			e.preventDefault();
			$toggle.toggleClass('opened');
			$shell.toggleClass('opened').removeAttr('style');
			scrollLock.clearQueueScrollLocks();
			scrollLock.enablePageScroll();
		}
	});

	document.documentElement.style.setProperty('--vh', `${vh}px`);
	
	window.addEventListener('resize', () => {
		let vh = window.innerHeight * 0.01;
		document.documentElement.style.setProperty('--vh', `${vh}px`);
	});

})();