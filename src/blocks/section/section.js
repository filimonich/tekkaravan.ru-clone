(() => {

	$('.section__toggle').on('click', (e) => {
		let $self = $(e.target);

		$self.next('.section__collapse').slideToggle('fast', function() {
			$self.toggleClass('closed');
		});
	});

})();