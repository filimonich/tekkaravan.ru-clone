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
    const drivers_dom = document.querySelector('.section__map_driversall');

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

    if (drivers_dom) {
      // Подключаем поисковые подсказки к полю ввода.
      var suggestView = new map.SuggestView('suggest');

      let lat = outer_data.lat;
      let lon = outer_data.lon;
      let drivers = outer_data.drivers;

      let distanse = outer_data.distanse;

      let driversI = new map.Map(
          drivers_dom,
          {
            center: [lat, lon],
            zoom: 13,
            controls: [],
          }
          // {
          //   searchControlProvider: 'yandex#search',
          // }
        ),
        driversObjects = new map.geoQuery(drivers).addToMap(driversI);

      var searchControl = new map.control.SearchControl({
        options: {
          provider: 'yandex#search',
          position: {
            top: -40, // уберём поисковую панель за край карты
            left: -390, // уберём поисковую панель за край карты
          },
        },
      });
      driversI.controls.add(searchControl);

      suggestView.events.add('select', function () {
        // поиск по выбору саджеста
        Search();
      });

      $('#suggest').keyup(function (event) {
        // поиск по Enter
        if (event.keyCode == 13) {
          Search();
        }
      });

      $('#button').bind('click', function () {
        // поиск по кнопке
        Search();
      });

      let placemark = new map.Placemark(
        [lat, lon],
        {
          iconContent: '',
        },
        {
          preset: 'islands#redStretchyIcon',
        }
      );

      let circle = new map.Circle(
        [placemark.geometry.getCoordinates(), distanse * 1000],
        {
          geodesic: true,
        },
        {
          fillColor: '#DB353266',
          strokeColor: '#990066',
          fillOpacity: 0.2,
          strokeOpacity: 0.5,
          strokeWidth: 2,
        }
      );

      placemark.events.add('drag', function (e) {
        return circle.geometry.setCoordinates(
          placemark.geometry.getCoordinates()
        );
      });

      driversI.geoObjects.add(placemark);
      driversI.geoObjects.add(circle);

      // Объекты, попадающие в круг, будут остоваться.
      let objectsInsideCircle = driversObjects.searchInside(circle);
      // Оставшиеся объекты за радиусом - удаляются.
      driversObjects.remove(objectsInsideCircle).removeFromMap(driversI);

      document
        .querySelector('#form_driversall')
        .addEventListener('click', function (e) {
          if (e.target.classList.contains('form__button')) {
            // console.log(this);

            let input1 = this.querySelector('[name = "inpusergeo"]').value;
            distanse = this.querySelector('[name = "distance"]').value;
            // console.log(input1, distanse);

            driversI.container.fitToViewport();
            console.log(distanse);
            console.log(driversI);
          }
        });

      maps.push(driversI);
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
