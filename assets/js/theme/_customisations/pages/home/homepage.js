import utils from '@bigcommerce/stencil-utils';

export default class{
    constructor(context) {
        this.init();
        this.cardImage();
    }
    
    init() {
				var getPage_content = $(".pages-home .section-feed .bx-feed-container-temp");
			
				var getTitle_img_1 = getPage_content.find($("td")[1]).html();
				var getTitle_img_2 = getPage_content.find($("td")[3]).html();
				var getTitle_img_3 = getPage_content.find($("td")[5]).html();
				var getTitle_img_4 = getPage_content.find($("td")[7]).html();
				var getTitle_img_5 = getPage_content.find($("td")[1]).html();

				if ($(".pages-home .section-feed .bx-feed-container").text()==="") {
					$(".pages-home .section-feed .bx-feed-container").append('<div class="bx-img">'+getTitle_img_1+'</div>')
					.append('<div class="bx-img">'+getTitle_img_2+'</div>')
					.append('<div class="bx-img">'+getTitle_img_3+'</div>')
					.append('<div class="bx-img">'+getTitle_img_4+'</div>')
					.append('<div class="bx-img">'+getTitle_img_5+'</div>')
					;
					$(".pages-home .section-feed .bx-feed-container-temp").remove();
				}						
				setTimeout(function(){
					$('.pages-home .section-feed .bx-feed-container').slick({
						dots: false,
						infinite: true,
						mobileFirst: false,
						slidesToShow: 4,
						slidesToScroll: 1,
						prevArrow: '<figure class="slick-arrow slick-prev arrow-prev"></figure>',
						nextArrow: '<figure class="slick-arrow slick-next arrow-next"></figure>',
						responsive: [
							{
								breakpoint: 1200,
								settings: {
									slidesToShow: 3,
									slidesToScroll: 1
								}
							},
							{
								breakpoint: 850,
								settings: {
									slidesToShow: 2,
									slidesToScroll: 1
								}
							},
							{
								breakpoint: 700,
								settings: {
									slidesToShow: 2,
									slidesToScroll: 1
								}
							}
						]
					});
				}, 1000);
    }
    cardImage() {
		setTimeout(function(){ 
			card_img_container();
		}, 1000);
    }
}
$( window ).resize(function() {
  setTimeout(function(){
  card_img_container();
  }, 1000);
});
function card_img_container() {
	$(".pages-home .slick-slide .card-img-container img").each(function() {
		$(this).parent().css({
		'height': $(this).width(),
		'width': $(this).width()
		});
	});
}