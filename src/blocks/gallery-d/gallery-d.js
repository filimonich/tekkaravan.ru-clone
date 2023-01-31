import { makeGallery } from "../../js/libs/makeGallery";

(() => {

	makeGallery(document.querySelectorAll('.section__gallery'), { 
		cls: 'gallery-d',
		navigation: true 
	});

})();
