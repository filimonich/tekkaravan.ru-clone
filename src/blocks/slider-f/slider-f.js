import enquire from 'enquire.js';
import Swiper, { Pagination } from 'swiper';

(() => {
	
	$(".slider-f__inner").each(function(i) {
		let swiper;
		const $item = $(this);
		const $wrapper = $item.find('.swiper-wrapper');
		const $slides = $item.find('.swiper-slide');
		
		const enableSwiper = (el) => {
			swiper = new Swiper(el, {
				slidesPerView: 1,
				spaceBetween: 24,
				threshold: 10,
				loop: false,
				modules: [Pagination],
				pagination: {
					el: `.slider-f__pagination_${i}`,
					type: "progressbar",
				},
				on: {
					beforeInit: function () {
						$item
							.prev('.slider-f__top')
							.find('.slider-f__pagination')
							.addClass(`slider-f__pagination_${i}`);
					},
				}
			});
		}

		enquire.register("screen and (max-width: 480px)", {
			match : function() {
				enableSwiper($item[0]);
			},
			unmatch : function() {
				if (swiper !== undefined ) {
					swiper.destroy(true, false);
					$slides.add($wrapper).removeAttr('style');
				} 
			}
		});
	});

})();
