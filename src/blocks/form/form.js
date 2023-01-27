import { selectTweaker } from "../../js/libs/selectTweaker";
import Inputmask from "inputmask";

(() => {
	selectTweaker(document.querySelectorAll('.form__field_sel'));

	Inputmask({
		"mask": "+7 (999) 999-99-99", 
		showMaskOnHover: false
	}).mask(document.querySelectorAll('.form__field input[type="tel"]'));
	
	document.querySelectorAll('.form__field_pass button').forEach(button => {
		button.addEventListener('click', () => {
			const inp = button.previousElementSibling;

			inp.getAttribute('type') == 'password' ? inp.setAttribute('type', 'text') : inp.setAttribute('type', 'password');
			button.classList.toggle('active');
		});
	});
	
	document.querySelectorAll('.form__field_file input[type="file"]').forEach(input => {
		input.addEventListener('change', (e) => {
			const text = e.target.closest('.form__field_file').dataset.title;
			const span = e.target.nextElementSibling;

			if(!! e.target.value) {
				span.innerText = e.target.files[0].name;
				span.classList.add('selected');
			} else {
				span.innerText = text;
				span.removeAttribute('class');
			}
		});
	});



})();
