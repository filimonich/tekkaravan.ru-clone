import { scrollClassToggle } from "../../js/libs/scroll";
import { getStepIndex } from "../../js/libs/helpers";

(() => {
	
	const panel = document.querySelector('.feed-tab');
	
	if(panel) {
		const buttons = panel.querySelectorAll('.feed-tab__button');
		const content = document.querySelector('.feed');

		$('.feed-tab').on('click', '.feed-tab__button:not(.active)', function(e) {
			e.preventDefault();
			let $self = $(this);
		
			$self.addClass('active').siblings().removeClass('active');
			$('.feed .feed__tab-block').removeClass('active').eq($self.index()).addClass('active');
			$('.filters .filters__tab-block').removeClass('active').eq($self.index()).addClass('active');
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