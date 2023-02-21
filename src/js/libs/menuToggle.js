/* 
* Переключатель класса для мобильного меню. Отслеживает клик по заданным
* кнопкам и переключает класс для заданного блока. Так же отслеживает клик
* по страничке за пределами заданного блока.
* 
* @разметка
* 
<div class="menu">
	<button class="menu__close"></button>
	<a class="menu__item" href="./">One</a>
	<a class="menu__item" href="./">Two</a>
	<a class="menu__item" href="./">Three</a>
</div>
<button class="menu__toggle"></button>
* 
* @вызов
* 
import scrollLock from 'scroll-lock';
import { menuToggle } from "../../js/libs/menuToggle";
const menu = document.querySelector('.menu');
const toggles = document.querySelectorAll('.menu__toggle, .menu__close');
menuToggle(menu, toggles,  {
	scrollLock: scrollLock,
	globalClose: true,
	omitToClose: '.modal, .form',
	class: 'opened'
});
* 
*/

export const menuToggle = (menu, toggles, props = {}) => {
	class Menu {
		constructor(menu, toggles, props) {
			if(!menu || !menu instanceof Element || !toggles) return;

			this.props = {
				class: 'opened',
				globalClose: true,
				...props
			};

			this._init();
		}
			

		menuOpen(e) {
			if(e) {
				e.preventDefault();
				e.stopPropagation();
			}

			menu.classList.add('opened');
	
			if(typeof this.props.scrollLock !== 'undefined') {
				const maxw = parseInt(getComputedStyle(menu).maxWidth);
				const scrollw = this.props.scrollLock.getPageScrollBarWidth();
				
				Object.assign(menu.style, { maxWidth: maxw + scrollw + 'px' });
				this.props.scrollLock.disablePageScroll();
			}

			if (typeof this.props.open === 'function') 
				return this.props.open.call(menu);
		}
		

		menuClose(e) {
			if(e) e.stopPropagation();

			menu.classList.remove(`${this.props.class}`);
			menu.removeAttribute('style');
			
			if(typeof this.props.scrollLock !== 'undefined') {
				this.props.scrollLock.clearQueueScrollLocks();
				this.props.scrollLock.enablePageScroll();
			}
	
			if (typeof this.props.close === 'function') 
				return this.props.close.call(menu);
		}


		_omitToClose(e) {
			const omits = this.props.omitToClose.split(",").map((item) => item.trim());
			return omits.some(omit => !!e.target.closest(`${omit}`));
		}


		_init() {
			toggles.forEach(toggle => {
				toggle.addEventListener('click', (e) => {
					menu.classList.contains(`${this.props.class}`) ? this.menuClose(e) : this.menuOpen(e);
				});
			});

			if(this.props.globalClose) {
				['click','touchstart'].forEach(event => {
					document.addEventListener(event, (e) => {
						const isopen = menu.classList.contains(`${this.props.class}`);
						const isself = e.target.closest(`.${menu.className.split(' ')[0]}`);

						if(isopen && !isself && !this._omitToClose(e)) {
							e.preventDefault();
							this.menuClose(e);
						}
					});
				});
			}
		}
	}

	return new Menu(menu, toggles, props);
}