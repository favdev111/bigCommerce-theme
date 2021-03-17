import 'slick-carousel';

export default class {
    constructor(context) {
        this.context = context;
        // this.bind();
        this.renderMobileSlider();
        this.renderGeneralFader();
    }

    renderMobileSlider() {
        $('[data-mobile-slider]').each((i, a) => {
            const slider = $(a);
            const options = slider.data('mobile-slider');
            slider.slick({
                responsive: [
                    {
                        breakpoint: 9999,
                        settings: 'unslick',
                    },
                    {
                        breakpoint: 800,
                        settings: {
                            dots: options.dots || true,
                            arrows: options.arrows || false,
                            infinite: options.infinite || true,
                            slidesToShow: options.slidesToShow || 1,
                            slidesToScroll: options.slidesToScroll || 1,
                            speed: options.speed || 400,
                            autoplay: options.autoplay || false,
                            autoplaySpeed: options.autoplaySpeed || 3000,
                        },
                    },
                ],
            });
        });
    }

    renderGeneralFader() {
        $('[data-fade-content]').slick({
            dots: true,
            arrows: true,
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            speed: 800,
            fade: true,
            autoplay: true,
            cssEase: 'linear',
        });
    }
}
