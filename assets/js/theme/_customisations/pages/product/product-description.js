export default class {
    constructor() {
        this.init();
    }
    init() {
		const getPageContent = $('.productView-info-description-container .data-load-temp');
		const getShortDescription = getPageContent.find($('td')[1]).html();
		const getLongDescription = getPageContent.find($('td')[3]).html();
		if ($('.productView-info-description-container .productView-info-short-description').text() === '') {
			$('.productView-info-description-container .productView-info-short-description').html(getShortDescription);
			$('.product-view-info-long-description').html(getLongDescription);
			$('.productView-info-description-container .data-load-temp').remove();
		}
    }
}
