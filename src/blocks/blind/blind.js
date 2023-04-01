import { scrollClassToggle } from '../../js/libs/scroll';
import { getStepIndex } from '../../js/libs/helpers';

(() => {
  const panel = document.querySelector('.blind__tab');

  if (panel) {
    const buttons = panel.querySelectorAll('.blind__tab-button');
    const content = document.querySelector('.blind__feed');

    $('.blind__tab').on(
      'click',
      '.blind__tab-button:not(.active)',
      function (e) {
        e.preventDefault();
        let $self = $(this);

        $self.addClass('active').siblings().removeClass('active');
        $('.blind .blind__tab-block')
          .removeClass('active')
          .eq($self.index())
          .addClass('active');
        $('.filters .filters__tab-block')
          .removeClass('active')
          .eq($self.index())
          .addClass('active');
        scrollClassToggle({
          nodes: document.querySelectorAll('.blind__inner'),
          class: 'showed',
        });
      }
    );

    content.addEventListener('swiped-left', e => {
      buttons[getStepIndex(buttons, 1)].click();
    });

    content.addEventListener('swiped-right', e => {
      buttons[getStepIndex(buttons, -1)].click();
    });
  }

  document.querySelectorAll('.blind__toggle, .blind__up').forEach(button => {
    button.addEventListener('click', e => {
      document.querySelector('.blind').classList.toggle('dropped');
    });
  });
})();
