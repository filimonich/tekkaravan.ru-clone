import { selectTweaker } from "../../js/libs/selectTweaker";

(() => {
	selectTweaker(document.querySelectorAll('.form__field_sel'));

	document.querySelectorAll('.form__field_pass button').forEach(button => {
		button.addEventListener('click', () => {
			const inp = button.previousElementSibling;

			inp.getAttribute('type') == 'password' ? inp.setAttribute('type', 'text') : inp.setAttribute('type', 'password');
			button.classList.toggle('active');
		});
	});
})();
