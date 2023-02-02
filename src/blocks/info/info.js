(() => {

	$('.info__lines[data-hidden]').each(function(){
		const count = +this.dataset.hidden;
		const lines = $(this).find('.info__line');
		const more = document.createElement('span');

		more.innerText = 'Показать все';
		more.className = 'info__more';

		lines.each(function(i) {
			if (i >= count) {
				this.style.display = 'none';
			}
		});

		if (lines.length > count) {
			this.append(more);
		
			more.addEventListener('click', (e) => {
				lines.each(function() {
					this.removeAttribute('style');
				});
				more.remove();
			});
		}
	});

})();