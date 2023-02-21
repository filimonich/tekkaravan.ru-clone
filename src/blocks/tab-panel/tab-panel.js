import { scrollClassToggle } from "../../js/libs/scroll";

(() => {

	$('.tab-panel').on('click', '.tab-panel__button:not(.active)', function(e) {
		e.preventDefault();
		let $self = $(this);
	
		$self.addClass('active').siblings().removeClass('active');
		$('.tab-content .tab-content__block').removeClass('active').eq($self.index()).addClass('active');
		scrollClassToggle('animation');
	});
	
})();