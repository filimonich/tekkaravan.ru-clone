(() => {
	
	$('.navi__link_dropdown').on('click', function(e) {
		$(this).toggleClass('opened').next('.navi__submenu').slideToggle();
	});

})();
