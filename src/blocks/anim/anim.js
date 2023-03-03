import { scrollClassToggle } from "../../js/libs/scroll";

(() => {
	scrollClassToggle({
		nodes: document.querySelectorAll('.blind__inner'),
		class: 'showed'
	});
})();
