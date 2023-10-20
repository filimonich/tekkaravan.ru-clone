import { makeGallery } from "../../js/libs/makeGallery";

(() => {

	makeGallery(document.querySelectorAll('.section__gallery'), { 
		class: 'gallery-d',
		navigation: true 
	});

})();
