import scrollLock from 'scroll-lock';

(() => {
	const $header = $('.header');
	const $shell = $header.find('.header__navi');
	const $toggle = $header.find('.header__toggle');
	const $close = $header.find('.navi__close')
	const vh = window.innerHeight * 0.01; // решение проблемы 100vh для меню на мобильных устройствах
	
	// открыть меню
	const open = (e) => {
		e.preventDefault();
		e.stopPropagation();

		if(!$shell.hasClass('opened')) {
			$shell.add($toggle).addClass('opened');
			$shell.css({'max-width': parseInt($shell.css('max-width')) + scrollLock.getPageScrollBarWidth()});
			scrollLock.disablePageScroll();
		}
	}
	
	// закрыть меню
	const close = (e) => {
		e.preventDefault();
		e.stopPropagation();
		
		if($shell.hasClass('opened')) {
			$shell.add($toggle).removeClass('opened').end().removeAttr('style');
			scrollLock.clearQueueScrollLocks();
			scrollLock.enablePageScroll();
		}
	}
	
	$toggle.on('click', (e) => $shell.hasClass('opened') ? close(e) : open(e));
	$close.on('click', (e) => close(e));
	
	document.addEventListener('click', (e) => {
		const isopened = $shell.hasClass('opened');
		const isnavi = e.target.closest('.header__navi');
		const ismodal = e.target.closest('.modal');

		if(isopened && !isnavi && !ismodal)
			close(e);
	});

	// открытие и закрытие меню, свайпом на мобильных устройствах
	document.addEventListener('swiped-right', (e) => open(e));
	document.addEventListener('swiped-left', (e) => close(e));


	// решение проблемы 100vh для меню на мобильных устройствах
	document.documentElement.style.setProperty('--vh', `${vh}px`);
	
	window.addEventListener('resize', () => {
		let vh = window.innerHeight * 0.01;
		document.documentElement.style.setProperty('--vh', `${vh}px`);
	});

})();