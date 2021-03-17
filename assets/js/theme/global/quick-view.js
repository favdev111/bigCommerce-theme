import 'foundation-sites/js/foundation/foundation';
import 'foundation-sites/js/foundation/foundation.dropdown';
import utils from '@bigcommerce/stencil-utils';
import ProductDetails from '../common/product-details';
import { defaultModal, modalTypes } from './modal';
import 'slick-carousel';

export default function (context) {
    const modal = defaultModal();

    $('body').on('click', '.quickview', event => {
        event.preventDefault();

        const productId = $(event.currentTarget).data('productId');

        modal.open({ size: 'large' });

        utils.api.product.getById(productId, { template: 'products/quick-view' }, (err, response) => {
            modal.updateContent(response);

            modal.$content.find('.productView').addClass('productView--quickView');
            modal.$content.find('.bx-upc-label').addClass('hide');

            modal.$content.find('[data-slick]').slick();

            modal.setupFocusableElements(modalTypes.QUICK_VIEW);

			const getPageContent = $('.productView-info-description-container .data-load-temp');
			const getShortDescription = getPageContent.find($('td')[1]).html();
			const getLongDescription = getPageContent.find($('td')[3]).html();
			if ($('.productView--quickView .productView-info-description-container .productView-info-short-description').text() === '') {
				$('.productView--quickView .productView-info-description-container .productView-info-short-description').html(getShortDescription);
				$('.productView--quickView .product-view-info-long-description').html(getLongDescription);
			}

            return new ProductDetails(modal.$content.find('.quickView'), context);
        });
    });
}
