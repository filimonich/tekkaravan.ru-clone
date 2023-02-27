import { scrollClassToggle } from "../../js/libs/scroll";
import { getStepIndex } from "../../js/libs/helpers";

(() => {
	
	const panel = document.querySelector('.tab-head');
	
	if(panel) {
		const buttons = panel.querySelectorAll('.tab-head__button');
		const content = document.querySelector('.tab-content');

		$('.tab-head').on('click', '.tab-head__button:not(.active)', function(e) {
			e.preventDefault();
			let $self = $(this);
		
			$self.addClass('active').siblings().removeClass('active');
			$('.tab-content .tab-content__block').removeClass('active').eq($self.index()).addClass('active');
			$('.tab-head .tab-head__block').removeClass('active').eq($self.index()).addClass('active');
			scrollClassToggle('animation', 'showed');
		});

		content.addEventListener('swiped-left', (e) => {
			buttons[getStepIndex(buttons, 1)].click();
		});

		content.addEventListener('swiped-right', (e) => {
			buttons[getStepIndex(buttons, -1)].click();
		});
	}
	
})();