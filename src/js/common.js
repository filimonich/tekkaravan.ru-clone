import "../../node_modules/swiped-events/dist/swiped-events.min.js";
import "./polyfills.js";
import "./blocks.js";

/* Тут можно писать код общий для всего проекта и требующий единого пространства имен */

import scrollLock from 'scroll-lock';
import { menuToggle } from "./libs/menuToggle";


const $header = document.querySelector('.header');
const $menu = $header.querySelector('.header__navi');
const $toggles = $header.querySelectorAll('.header__toggle, .header__close');

const menu = menuToggle($menu, $toggles, {
	scrollLock: scrollLock,
	class: 'opened'
});

// открытие и закрытие меню, свайпом на мобильных устройствах
document.addEventListener('swiped-left', (e) => menu.menuClose(e));
