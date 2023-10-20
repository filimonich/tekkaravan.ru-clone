import { driveTabs } from "../../js/libs/driveTabs";

(() => {

	driveTabs(document.querySelectorAll('.tab'), {
		buttons: '.tab__buttons',
		blocks: '.tab__blocks'
	});

})();
