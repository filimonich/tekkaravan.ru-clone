import scrollLock from 'scroll-lock';
import { menuToggle } from "../../js/libs/menuToggle";

(() => {
	const vh = window.innerHeight * 0.01;
	const header = document.querySelector('.header');
	const navi = header.querySelector('.header__navi');
	const toggles = header.querySelectorAll('.header__toggle, .navi__close');
	
	const menu = menuToggle(navi, toggles, {
		scrollLock: scrollLock,
		omitToClose: '.modal, .form__small',
		class: 'opened'
	});
	
	// открытие и закрытие меню, свайпом на мобильных устройствах
	navi.addEventListener('swiped-left', (e) => menu.menuClose(e));
	
	// решение проблемы 100vh для меню на мобильных устройствах
	document.documentElement.style.setProperty('--vh', `${vh}px`);
	
	window.addEventListener('resize', () => {
		let vh = window.innerHeight * 0.01;
		document.documentElement.style.setProperty('--vh', `${vh}px`);
	});

	document.querySelectorAll('.header__tongue, .feed__up').forEach(button => {
		button.addEventListener('click', (e) => {
			document.querySelector('.feed').classList.toggle('dropped');
		});
	});


	/* const $header = $('.header');
	const $shell = $header.find('.header__navi');
	const $toggle = $header.find('.header__toggle');
	const $close = $header.find('.navi__close')
	
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
	}); */

})();