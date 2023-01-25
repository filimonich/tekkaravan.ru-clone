import scrollLock from 'scroll-lock';
import { addUnderlay, makeModalFrame } from "../../js/libs/modal";

(() => {
	addUnderlay('modal');
	makeModalFrame({ 
		el: '.header__login, .header__logout, .navi__link_login', 
		scrollLock
	});

})();