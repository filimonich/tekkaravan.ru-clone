import '../../node_modules/swiped-events/dist/swiped-events.min.js';
import './polyfills.js';
import './blocks.js';
import ymaps from 'ymaps';

/* Тут можно писать код общий для всего проекта и требующий единого пространства имен */

const yurl =
  'https://api-maps.yandex.ru/2.1/?lang=ru_RU&apikey=f204c2ff-657c-46d4-8a58-1837db80421d';
let maps = [];

ymaps
  .load(yurl)
  .then(map => {
    const range_dom = document.querySelector('.section__map_range');
    const ugeo_dom = document.querySelector('.section__map_usergeo');

    if (range_dom) {
      let range = new map.Map(range_dom, {
          center: [60.906882, 30.067233],
          zoom: 9,
          controls: [],
        }),
        zoomControl = new map.control.ZoomControl({
          options: {
            size: 'small',
            float: 'none',
            position: {
              bottom: 165,
              right: 10,
            },
          },
        }),
        routePanelControl = new map.control.RoutePanel({
          options: {
            showHeader: true,
            title: 'Расчёт маршрута',
          },
        });

      routePanelControl.routePanel.options.set({ types: { auto: true } });

      routePanelControl.routePanel.state.set({
        fromEnabled: false,
        from: outer_data.loading,
        toEnabled: false,
        to: outer_data.unloading,
      });

      range.controls.add(routePanelControl).add(zoomControl);
      range.behaviors.disable('scrollZoom');

      routePanelControl.routePanel.getRouteAsync().then(route => {
        route.model.setParams({ results: 1 }, true);
        route.model.events.add('requestsuccess', () => {
          let activeRoute = route.getActiveRoute();
          if (activeRoute) {
            let length = route.getActiveRoute().properties.get('distance'),
              balloonContentLayout = map.templateLayoutFactory.createClass(
                `<span>Расстояние: ${length.text}.</span><br/><span style="font-weight: bold; font-style: italic"></span>`
              );
            route.options.set(
              'routeBalloonContentLayout',
              balloonContentLayout
            );
            activeRoute.balloon.open();
          }
        });
      });

      maps.push(range);
    }
    if (ugeo_dom) {
      let ugeo = new map.Map(ugeo_dom, {
        center: [outer_data.lat, outer_data.lon],
        zoom: 9,
        controls: [],
      });
      let placemark = new map.Placemark(
        [outer_data.lat, outer_data.lon],
        {
          iconContent: '',
        },
        {
          preset: 'islands#redStretchyIcon',
          draggable: true,
        }
      );

      let circle = new map.Circle(
        [placemark.geometry.getCoordinates(), 100],
        {},
        {
          geodesic: true,
        }
      );

      placemark.events.add('drag', function (e) {
        return circle.geometry.setCoordinates(
          placemark.geometry.getCoordinates()
        );
      });

      ugeo.geoObjects.add(placemark);
      ugeo.geoObjects.add(circle);

      maps.push(ugeo);
    }
  })
  .catch(error => console.log('Failed to load Yandex Maps', error));

// Закрывать блоки кликом по заголовку
document.querySelectorAll('.section__unit').forEach(unit => {
  const $toggle = unit.querySelector('.section__toggle');

  $($toggle).on('click', e => {
    let $self = $(e.target);

    $self.next('.section__collapse').slideToggle('fast', function () {
      $self.toggleClass('section__toggle_closed');
      maps.forEach(map => map.container.fitToViewport());
    });
  });
});
