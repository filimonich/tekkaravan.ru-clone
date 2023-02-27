import { slideUp } from "../../js/libs/helpers";
import { slideDown } from "../../js/libs/helpers";

(() => {

	document.querySelector('.header__tongue').addEventListener('click', (e) => {
		let filters = document.querySelectorAll('.filter');

		filters.forEach(filter => {

			if ((filters.length > 1 && filter.closest('.active')) || filters.length == 1) {
				if (! filter.classList.contains('opened')) {
					// filter.classList.add('opened');
					slideDown(filter, 300, function() {
						this.classList.add('opened');
					});
					window.scrollTo({ top: 0, behavior: 'smooth' });
				} else {
					// filter.classList.remove('opened');
					slideUp(filter, 300, function() {
						this.classList.remove('opened');
					});
				}
			}
		});
	});

})();
