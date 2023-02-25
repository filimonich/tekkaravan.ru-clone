import "../../node_modules/swiped-events/dist/swiped-events.min.js";
import "./polyfills.js";
import "./blocks.js";
import ymaps from 'ymaps';

/* Тут можно писать код общий для всего проекта и требующий единого пространства имен */

let range;
const range_dom = document.querySelector('.section__map_range');
const yurl = 'https://api-maps.yandex.ru/2.1/?lang=ru_RU&amp;apikey=f204c2ff-657c-46d4-8a58-1837db80421d';

ymaps.load(yurl).then(maps => {
	if (range_dom) {
	
		let range = new maps.Map(range_dom, {
			center: [60.906882, 30.067233],
			zoom: 9,
			controls: [],
		}),
		// Кнопки зума
		zoomControl = new maps.control.ZoomControl({
			options: {
				size: 'small',
				float: 'none',
				position: {
					bottom: 165,
					right: 10
				}
			}
		}),
		// Панель маршрутизации.
		routePanelControl = new maps.control.RoutePanel({
			options: {
				showHeader: true,
				title: 'Расчёт маршрута'
			}
		});

		// Пользователь сможет построить только автомобильный маршрут.
		routePanelControl.routePanel.options.set({ types: { auto: true }});

		// Если вы хотите задать неизменяемую точку "откуда", раскомментируйте код ниже.
		routePanelControl.routePanel.state.set({
			fromEnabled: false,
			from: outer_data.loading,
			toEnabled: false,
			to: outer_data.unloading
		});

		range.controls.add(routePanelControl).add(zoomControl);
		range.behaviors.disable('scrollZoom');

		routePanelControl.routePanel.getRouteAsync().then((route) => {

			route.model.setParams({ results: 1 }, true);

			route.model.events.add('requestsuccess', () => {

				let activeRoute = route.getActiveRoute();
				if (activeRoute) {
					let length = route.getActiveRoute().properties.get("distance"),
					balloonContentLayout = ymaps.templateLayoutFactory.createClass(`<span>Расстояние: ${length.text}.</span><br/><span style="font-weight: bold; font-style: italic"></span>`);
					route.options.set('routeBalloonContentLayout', balloonContentLayout);
					activeRoute.balloon.open();
				}
			});

		});
	}
}).catch(error => console.log('Failed to load Yandex Maps', error));