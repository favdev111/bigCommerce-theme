import utils from '@bigcommerce/stencil-utils';
import { defaultModal } from './global/modal';

import CustomHelpers from './_customisations/global/helpers';
// import Middleware from './_customisations/global/middleware';

import General from './_customisations/global/general';
// import BlogSplitter from './_customisations/blog/loader'; // Uncomment to enable

import CustomLB from './_customisations/global/customlb';

import HomePage from './_customisations/pages/home/homepage';
import ProductDescription from './_customisations/pages/product/product-description';
import CategoryView from './_customisations/pages/category/category';

export default function (context) {
    const localContext = context;

    // Add BC Utils to context
    localContext.utils = utils;
    localContext.modal = defaultModal();

    // Custom helper functions
    localContext.helpers = new CustomHelpers(localContext);

    // Add Middleware connection to context
    // localContext.middleware = new Middleware(localContext);

    // General sitewide functions
    (() => new General(localContext))();

    // Blog Splitter
    // (() => new BlogSplitter(localContext))(); // Uncomment to enable

    // Custom Library functions
    localContext.customlb = new CustomLB(localContext);
    
    //Home Custom Page from BC
    localContext.homepage = new HomePage(localContext);
	
	//Product Description from BC
    localContext.product_description = new ProductDescription(localContext);
    
    //Product Category
    localContext.category_view = new CategoryView(localContext);
}
