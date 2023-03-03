import { scrollClassToggle } from "../../js/libs/scroll";
import { getStepIndex } from "../../js/libs/helpers";

(() => {
	
	const panel = document.querySelector('.blind-tab');
	
	if(panel) {
		const buttons = panel.querySelectorAll('.blind-tab__button');
		const content = document.querySelector('.blind');

		$('.blind-tab').on('click', '.blind-tab__button:not(.active)', function(e) {
			e.preventDefault();
			let $self = $(this);
		
			$self.addClass('active').siblings().removeClass('active');
			$('.blind .blind__tab-block').removeClass('active').eq($self.index()).addClass('active');
			$('.filters .filters__tab-block').removeClass('active').eq($self.index()).addClass('active');
			scrollClassToggle({ nodes: document.querySelectorAll('.blind__inner'), class: 'showed' });
		});

		content.addEventListener('swiped-left', (e) => {
			buttons[getStepIndex(buttons, 1)].click();
		});

		content.addEventListener('swiped-right', (e) => {
			buttons[getStepIndex(buttons, -1)].click();
		});
	}
	
})();