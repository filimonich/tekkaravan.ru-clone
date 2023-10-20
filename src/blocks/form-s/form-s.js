(() => {

	const button = document.querySelector('button#form-s__change');
	const from = document.querySelectorAll('#form-s__from input');
	const to = document.querySelectorAll('#form-s__to input');
	
	if (button) {
		button.addEventListener('click', () => {
			const values = [from[0].value, to[0].value, from[1].value, to[1].value];
	
			from[0].value = values[1];
			to[0].value = values[0];
			from[1].value = values[3];
			to[1].value = values[2];
		});
	}

})();
