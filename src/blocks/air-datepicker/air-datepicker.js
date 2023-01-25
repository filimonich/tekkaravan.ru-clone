import AirDatepicker from "air-datepicker"

(() => {

	new AirDatepicker('.form__field_date input[type="text"]', {
		isMobile: true,
		autoClose: true
	});

})();
