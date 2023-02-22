import { scrollClassToggle } from "../../js/libs/scroll";
import { getStepIndex } from "../../js/libs/helpers";

(() => {
	
	const buttons = document.querySelectorAll('.tab-panel__button');
	const content = document.querySelector('.tab-content');

	$('.tab-panel').on('click', '.tab-panel__button:not(.active)', function(e) {
		e.preventDefault();
		let $self = $(this);
	
		$self.addClass('active').siblings().removeClass('active');
		$('.tab-content .tab-content__block').removeClass('active').eq($self.index()).addClass('active');
		scrollClassToggle('animation');
	});

	content.addEventListener('swiped-right', (e) => {
		buttons[getStepIndex(buttons, 1)].click();
	});

	content.addEventListener('swiped-left', (e) => {
		buttons[getStepIndex(buttons, -1)].click();
	});
	
})();