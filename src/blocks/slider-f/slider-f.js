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
					// type: "progressbar",
					bulletClass: 'slider-f__dot',
					bulletActiveClass: 'active',
					clickable: true,
					renderBullet: function (index, cls) {
						// const $current = this.$el.find(`[data-swiper-slide-index="${index}"]`);
						// const title = $slides.eq(index).find('h2.title').text();
						const icon = $slides.eq(index).data('icon');
						return `<span class='${cls} ${cls}_${icon}'></span>`;
					}
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
