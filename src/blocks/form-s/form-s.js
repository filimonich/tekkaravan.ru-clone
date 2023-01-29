(() => {

	const button = document.querySelector('button#form-s__change');
	const from = document.querySelector('#form-s__from input');
	const to = document.querySelector('#form-s__to input');
	const radius_from = document.querySelector('#form-s__from-radius input');
	const radius_to = document.querySelector('#form-s__to-radius input');
	
	if (button) {
		button.addEventListener('click', () => {
			const values = [from.value, to.value, radius_from.value, radius_to.value];
	
			from.value = values[1];
			to.value = values[0];
			radius_from.value = values[3];
			radius_to.value = values[2];
		});
	}

})();
