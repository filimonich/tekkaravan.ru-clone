import scrollLock from 'scroll-lock';
import { addUnderlay, makeModalFrame } from "../../js/libs/modal";
import { throttle } from "../../js/libs/helpers";

(() => {
	addUnderlay('modal');
	makeModalFrame({ 
		el: '.header__login, .header__logout, .navi__link_login, .form__small a', 
		scrollLock,
		open: function(el) {
			let pendingUpdate = false;
			
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
					const span = e.target.nextElementSibling;
					
					if(!! e.target.value) {
						span.innerText = e.target.files[0].name;
						span.classList.add('selected');
					} else {
						span.innerText = "Выберите фото";
						span.removeAttribute('class');
					}
				});
			});
			
			window.visualViewport.addEventListener("resize", throttle(() => {
				if (pendingUpdate) return;
				pendingUpdate = true;
				
				requestAnimationFrame(() => {
					pendingUpdate = false;
					document.documentElement.style.setProperty('--vvph', `${window.visualViewport.height * 0.01}px`);
				});
			}, 250));
		}
	});

})();