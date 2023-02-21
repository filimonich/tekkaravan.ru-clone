/* 
* Простая реализация табов, основанная на переключении классов.
* При нажатии на кнопку заголовка, переключается класс у соответствующего
* ей контентного блока.
* 
* @требуемая разметка
* 
<div class="tab">
	<div class="tab__buttons">
		<button class="tab__button active"></button>
		<button class="tab__button"></button>
		<button class="tab__button"></button>
	</div>
	<div class="tab__blocks">
		<div class="tab__block active"></div>
		<div class="tab__block"></div>
		<div class="tab__block"></div>
	</div>
</div>
* 
* @вызов
* 
import { driveTabs } from "../../js/libs/driveTabs";
driveTabs({
	container: '.tab',
	button: '.tab__button',
	block: '.tab__block',
	cls: 'active'
}, function() {
	console.log(this);
});
* 
*/

export const driveTabs = (items, props = {}) => {
	class Tabs {
		constructor(item, props) {
			if(!item || !item instanceof Element) return;

			this.props = {
				active: 'active',
				...props
			};

			this.container = item;
			this.blocks = item.querySelectorAll(`${this.props.blocks} > *`);
 			this.buttons = item.querySelectorAll(`${this.props.buttons} > *`);

			this._init();
		}

		move(direction = 1) {
			let indexActive = [...this.buttons].findIndex(el => el.classList.contains('active'));
			indexActive += +direction;
			
			if (indexActive >= this.buttons.length) {
				indexActive = 0;
			} else if(indexActive < 0) {
				indexActive = this.buttons.length - 1;
			}
			
			this._sync(this.buttons[indexActive], indexActive);
		}

		_sync(button, i) {
			if (! button.classList.contains(`${this.props.active}`)) {
				this.buttons.forEach((button, j) => {
					button.classList.remove(`${this.props.active}`);
					this.blocks[j].classList.remove(`${this.props.active}`);
				});
	
				button.classList.add(`${this.props.active}`);
				this.blocks[i].classList.add(`${this.props.active}`);

				if (typeof props.cb === 'function') 
					return props.cb.call(this.blocks[i]);
			}
		}

		_init() {
			this.buttons.forEach((button, i) => button.addEventListener('click', (e) => this._sync(e.target, i)));
			this.container.addEventListener('swiped-left', (e) => this.move(-1));
			this.container.addEventListener('swiped-right', (e) => this.move(1));
		}
	}

	if(items instanceof NodeList) {
		items.forEach((item) => new Tabs(item, props));
	} else {
		return new Tabs(items, props);
	}
}