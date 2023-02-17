import ymaps from 'ymaps';

(() => {

	document.querySelectorAll('.section__unit').forEach((unit) => {
		let map;
		const $map = unit.querySelector('.section__map');
		const $toggle = unit.querySelector('.section__toggle');
		
		if ($map) {
			ymaps.load('https://api-maps.yandex.ru/2.1/?lang=ru_RU').then(maps => {
				map = new maps.Map($map, {
					center: [57.555691, 61.731427],
					zoom: 12,
					controls: ['zoomControl'],
				},{
					zoomControlPosition: { right: '5%', top: 100 },
					zoomControlFloat: 'none'
				});
		
				map.behaviors.disable('scrollZoom');
			})
			.catch(error => console.log('Failed to load Yandex Maps', error));
		}

		$($toggle).on('click', (e) => {
			let $self = $(e.target);
	
			$self.next('.section__collapse').slideToggle('fast', function() {
				$self.toggleClass('section__toggle_closed');
				map?.container.fitToViewport();
			});
		});
	});

})();