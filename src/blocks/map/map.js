import ymaps from 'ymaps';

(() => {

	document.querySelectorAll('.map').forEach((item) => {
		ymaps.load('https://api-maps.yandex.ru/2.1/?lang=ru_RU').then(maps => {
			const map = new maps.Map(item, {
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
	});

})();
