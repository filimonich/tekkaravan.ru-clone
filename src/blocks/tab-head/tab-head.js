import { scrollClassToggle } from "../../js/libs/scroll";
import { getStepIndex } from "../../js/libs/helpers";

(() => {
	
	const panel = document.querySelector('.tab-head');
	const buttons = panel.querySelectorAll('.tab-head__button');
	const toggle = panel.querySelector('.tab-head__toggle');
	const wrapper = panel.querySelector('.tab-head__blocks');
	const content = document.querySelector('.tab-content');

	$('.tab-head').on('click', '.tab-head__button:not(.active)', function(e) {
		e.preventDefault();
		let $self = $(this);
	
		$self.addClass('active').siblings().removeClass('active');
		$('.tab-content .tab-content__block').removeClass('active').eq($self.index()).addClass('active');
		$('.tab-head .tab-head__block').removeClass('active').eq($self.index()).addClass('active');
		wrapper.classList.remove('showed');
		scrollClassToggle('animation', 'showed');
	});

	toggle.addEventListener('click', (e) => {
		wrapper.classList.add('showed');
	});
	
	wrapper.addEventListener('swiped-left', (e) => {
		if (! e.target.closest('.select__list')) {
			wrapper.classList.remove('showed');
		}
	});

	content.addEventListener('swiped-left', (e) => {
		buttons[getStepIndex(buttons, 1)].click();
	});

	content.addEventListener('swiped-right', (e) => {
		buttons[getStepIndex(buttons, -1)].click();
	});

	// const $pin = $('.pin-h');
	// const $toggle = $pin.find('.pin-h__toggle');
	
	// открыть фильтр
	/* const open = (e) => {
		e.preventDefault();
		e.stopPropagation();

		if(!$pin.hasClass('opened'))
			$pin.addClass('opened');
	} */
	
	// закрыть фильтр
	/* const close = (e) => {
		e.preventDefault();
		e.stopPropagation();
		
		if($pin.hasClass('opened')) 
			$pin.removeClass('opened');
	} */
	
	/* $toggle.on('click', (e) => $pin.hasClass('opened') ? close(e) : open(e)); */

	
})();