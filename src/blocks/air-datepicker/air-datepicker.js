import AirDatepicker from "air-datepicker"

(() => {

	document.querySelectorAll('.form__field_date input[type="text"]').forEach((item) => {
		new AirDatepicker(item, {
			isMobile: true,
			autoClose: true
		});
	})

})();
