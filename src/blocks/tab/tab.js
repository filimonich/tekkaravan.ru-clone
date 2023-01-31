import { driveTabs } from "../../js/libs/driveTabs";

(() => {

	driveTabs({
		container: '.tab',
		button: '.tab__button',
		block: '.tab__block',
		cls: 'active'
	}, function() {
		// console.log(this);
	});

})();
