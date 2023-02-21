/* 
* Простая галерея (например для детального вида продукта) 
* под главной картинкой подставляется навигация в виде превьюшек с 
* фоном от соответствующих картинок. Опционально, добавляеются 
* кнопки стрелочной навигации
* 
* @исходная разметка:
* 
<div class="someblock">
	<img src="https://source.unsplash.com/random/600x600?cats" alt="">
	<img src="https://source.unsplash.com/random/601x600?cats" alt="">
	<img src="https://source.unsplash.com/random/600x601?cats" alt="">
	<img src="https://source.unsplash.com/random/601x601?cats" alt="">
</div>
* 
* @результирующая разметка:
* 
* <div class="someblock gallery">
* 	<div class="gallery__frame">
* 		<div class="gallery__image active">
* 			<img src="https://source.unsplash.com/random/600x600?cats" alt="">
* 		</div>
* 		<div class="gallery__image">
* 			<img src="https://source.unsplash.com/random/601x600?cats" alt="">
* 		</div>
* 		<div class="gallery__image">
* 			<img src="https://source.unsplash.com/random/600x601?cats" alt="">
* 		</div>
* 		<div class="gallery__image">
* 			<img src="https://source.unsplash.com/random/601x601?cats" alt="">
* 		</div>
* 	</div>
* 	<div class="gallery__thumbs">
* 		<span class="gallery__thumb active" style="background-image: url(https://source.unsplash.com/random/600x600?cats)"></span>
* 		<span class="gallery__thumb" style="background-image: url(https://source.unsplash.com/random/601x600?cats);"></span>
* 		<span class="gallery__thumb" style="background-image: url(https://source.unsplash.com/random/600x601?cats);"></span>
* 		<span class="gallery__thumb" style="background-image: url(https://source.unsplash.com/random/601x601?cats);"></span>
* 	</div>
* 	<button class="gallery__prev"></button>
* 	<button class="gallery__next"></button>
* </div>
* 
* @вызов:
* 
import { makeGallery } from "../../js/lib";
makeGallery(document.querySelectorAll('.someblock'), { 
	class: gallery,
	navigation: true 
});
* 
* @параметры вызова:
* 
* class - имя класса галереи в динамически создаваемой разметке
* thumbnails - блок кликабельных превьюшек, под галереей
* navigation - включение дополнительной стрелочной навигации
*/

export const makeGallery = (items, props = {}) => {
	class Gallery {
		constructor(item, props) {
			if(!item || !item instanceof Element) return;

			this.props = {
				class: 'gallery',
				navigation: false,
				thumbnails: true,
				...props
			};

			this.$frame = item;
			this.$images = this.$frame.querySelectorAll('img');
			this.$wrapper = document.createElement('div');
			this.$thumbs = document.createElement('div');
			this.$prev = document.createElement('button');
			this.$next = document.createElement('button');

			this._render();
			this._init();
		}
		
		_render() {
			this.$wrapper.className = `${this.$frame.className} ${this.props.class}`;
			this.$thumbs.className = `${this.props.class}__thumbs`;
			this.$frame.className = `${this.props.class}__frame`;

			this.$images.forEach((item, i) => {
				let active = i ? '':'active';
				let $image = document.createElement('div');
				$image.className = `${this.props.class}__image ${active}`;
				this.$frame.append($image);
				$image.append(item);
		
				if(this.props.thumbnails) {
					let $thumb = document.createElement('span');
					$thumb.className = `${this.props.class}__thumb ${active}`;
					$thumb.style.backgroundImage = `url(${item.src})`;
					this.$thumbs.append($thumb);
				}
			});

			this.$frame.parentNode.append(this.$wrapper);
			this.$wrapper.append(this.$frame);
			
			if(this.props.thumbnails) {
				this.$wrapper.append(this.$thumbs);
			}

			if (this.props.navigation) {
				const $prev = document.createElement('button');
				const $next = document.createElement('button');
				$prev.className = `${this.props.class}__prev`;
				$next.className = `${this.props.class}__next`;
				this.$frame.append($prev, $next);
			}
		}

		_clearActive() {
			[...this.$images].map((el) => { el.parentNode.classList.remove('active') });
			[...this.$thumbs.children].map((el) => { el.classList.remove('active') });
		}

		moveActive(direction = 1) {
			let currentActive = [...this.$images].findIndex(el => el.parentNode.classList.contains('active'));
			this._clearActive();
			currentActive += direction;

			if (currentActive >= this.$images.length) {
				currentActive = 0;
			} else if(currentActive < 0) {
				currentActive = this.$images.length - 1;
			}

			this.$images[currentActive].parentNode.classList.add('active')
			this.$thumbs.children[currentActive]?.classList.add('active');
		}

		_clickHandler(e) {
			// если клик по превьюшке
			if(e.target.classList.contains(`${this.props.class}__thumb`)) {
				this._clearActive();
				this.$images[[...this.$thumbs.children].findIndex(el => el == e.target)].parentNode.classList.add('active');
				e.target.classList.add('active');
			}

			// если клик по кнопке "prev"
			if (e.target.classList.contains(`${this.props.class}__prev`))
				this.moveActive(-1);

			// если клик по кнопке "next"
			if (e.target.classList.contains(`${this.props.class}__next`))
				this.moveActive(1);
		}

		_init() {
			this.$wrapper.addEventListener('click', (e) => this._clickHandler(e));
			this.$frame.addEventListener('swiped-left', (e) => this.moveActive(-1));
			this.$frame.addEventListener('swiped-right', (e) => this.moveActive(1));
		}
	}

	if(items instanceof NodeList) {
		items.forEach((item) => new Gallery(item, props));
	} else {
		return new Gallery(items, props);
	}
}