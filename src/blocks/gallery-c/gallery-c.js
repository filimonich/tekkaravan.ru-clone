(() => {

	$('.gallery-c').each(function(i) {
		const $wrapper = $(this).find('.gallery-c__images');
		const $items = $(this).find('.gallery-c__image');
		const $prev = $(this).find('.gallery-c__prev');
		const $next = $(this).find('.gallery-c__next');

		const move = (direction = 0) => {
			let lastIndex = $items.length - 1;
			let $current = $items.filter('.active');
			$current = $current.length ? $current : $items.first();

			let index = $current.index() + direction;
			index = (index < 0) ? 0 : ((index > lastIndex) ? lastIndex : index);

			$items
				.eq(index)
				.addClass('active')
				.siblings()
				.removeClass('active');

			$prev.toggleClass('disabled', !index);
			$next.toggleClass('disabled', (index >= lastIndex));
		};

		move();
		$prev.on('click', (e) => move(-1));
		$next.add($wrapper).on('click', (e) => move(1));
	});

})();