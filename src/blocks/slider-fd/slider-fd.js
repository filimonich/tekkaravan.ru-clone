import Swiper, { Pagination } from 'swiper';

(() => {

	$(".slider-fd__inner").each(function(i) {
		const $item = $(this);
		const $slides = $item.find('.swiper-slide');
		
		new Swiper($item[0], {
			slidesPerView: 1,
			spaceBetween: 28,
			threshold: 10,
			loop: false,
			modules: [Pagination],
			pagination: {
				el: `.slider-fd__pagination_${i}`,
				bulletClass: 'slider-fd__dot',
				bulletActiveClass: 'active',
				clickable: true,
				renderBullet: function (index, cls) {
					const icon = $slides.eq(index).data('icon');
					const title = $slides.eq(index).find('h2.title').text();
					return `<div class='${cls} ${cls}_${icon}'><span>${title}</span></div>`;
				}
			},
			on: {
				beforeInit: function () {
					$item
						.prev('.slider-fd__top')
						.find('.slider-fd__pagination')
						.addClass(`slider-fd__pagination_${i}`);
				},
			}
		});
	});

})();
