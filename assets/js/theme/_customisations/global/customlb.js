export default class {
    constructor(context) {
        this.context = context;
        
        this.btnCTA();
    }

    btnCTA() {
    	btn_toggle_class();
		data_class_gen();
		btn_quickSearch_toggle();
		btn_linkable();
		btnEmailShare();
		btn_print_object();
		btn_goback();
    }
}
function btn_quickSearch_toggle() {
	$(".btn-parent-toggle").on("click", function(event){
		var get_class = $(this).data("parent-toggle-class");
		var elem_target = $(this).data("parent-toggle-target");
		var elem_target_2 = $(this).data("parent-toggle-target-2");
		$(this).parent().toggleClass(get_class);
		$(this).toggleClass(get_class);
		$("."+elem_target).toggleClass(get_class);
		$("."+elem_target_2).toggleClass(get_class);

		$('html').click(function(e) {
		  if (e.target.id != 'quickSearch' && $(e.target).parents('#quickSearch').length == 0) {
			$("."+elem_target_2).removeClass(get_class);
			$(this).parent().removeClass(get_class);
			$(this).removeClass(get_class);
			$("."+elem_target).removeClass(get_class);
			$("."+elem_target_2).removeClass(get_class);
		  }
		});
		event.stopPropagation();
	});
}

function btn_toggle() {
  $(".btn-toggle").unbind("click").click(function() {
    var delay = 100;
    var get_elem_hide = $(this).data("hide");
    var this_elem = $(this);
    this_elem.addClass("disabled");
    if ($(this).hasClass("active")) {
      $(this).removeClass("active");
    } else {
      $(this).addClass("active");
    }
    if (typeof $(this).data("transition-delay") !== "undefined" && $(this).data("transition-delay") !== "") {
      delay = $(this).data("transition-delay");
    }
    if (typeof $(this).data("show") !== "undefined" && $(this).data("show") !== "") {
      var get_elem_show = $(this).data("show");
      $("." + get_elem_show).removeClass("hide");
      if ($("." + get_elem_show).hasClass("show") == false) {
        $("." + get_elem_show).addClass("transitionIn");
      } else {
        $("." + get_elem_show).addClass("transitionOut");
        $("." + get_elem_show).removeClass("show");
      }
    }

    if (
      typeof $(this).data("hide") !== "undefined" &&
      $(this).data("hide") !== ""
    ) {
      $("." + get_elem_hide).addClass("transitionOut");
      if ($("." + get_elem_hide).hasClass("show") == true) {
        $("." + get_elem_hide).removeClass("show");
      }
    }

    setTimeout(function() {
      if (typeof get_elem_show !== "undefined" && get_elem_show !== "") {
        if ($("." + get_elem_show).hasClass("show") == false) {
          $("." + get_elem_show).removeClass("transitionIn");
          $("." + get_elem_show).addClass("show");
        }
        if ($("." + get_elem_show).hasClass("transitionOut") == true) {
          $("." + get_elem_show).removeClass("transitionOut");
          $("." + get_elem_show).removeClass("show");
        }
      }
      if (typeof get_elem_hide !== "undefined" && get_elem_hide !== "") {
        $("." + get_elem_hide).addClass("hide");
        $("." + get_elem_hide).removeClass("transitionOut");
      }
      this_elem.removeClass("disabled");
    }, delay);
  });
}
function btn_add_class() { 
  $(".btn-add-class").unbind("click").click(function() { 
    $("." + $(this).data("add-class-target")).addClass($(this).data("add-class"));
  });
}
function btn_toggle_class() {
  $(".btn-toggle-class").unbind("click").click(function(event) {alert("kkk")
    	$("." + $(this).data("toggle-class-target")).toggleClass($(this).data("toggle-class"));
    	$(this).toggleClass("click-active");
  });
}
function data_class_gen() {
	$(".data-class-gen").each(function() {
		var gen_class =  $(this).data("class-gen");
		gen_class = gen_class.toLowerCase();
		gen_class = gen_class.replace(/ /g,'-');
		gen_class = gen_class.replace(/--/g,'-');
		var tar_gen_class = $(this).data("class-gen-prefix")+"-"+gen_class;
		$(this).addClass(tar_gen_class);
		var tar_sub_gen_class = "sub-category-"+gen_class;
		if ($(this).hasClass("btn-toggle-class")==true) {
			$(this).attr("data-toggle-class-target",tar_sub_gen_class);
		}
	});

}
function btn_linkable() {
	$(".btn-linkable").each( function () {
		var data_href = $(this).attr("href");
		data_href = data_href.replace(/ /g, '');
		$(this).attr("href", data_href);
	}); 
}

$(window).on("scroll", function() {
  var get_windows_scroll = $(window).scrollTop();

$(".data-scroll-detect").each(function() {
	var this_elem = $(this);
    var elem_padding_detect_start = parseInt(this_elem.offset().top); 
    if (typeof this_elem.data("padding-start") !== "undefined" && this_elem.data("padding-start") !== "" ) {
      elem_padding_detect_start = elem_padding_detect_start - parseInt(this_elem.data("padding-start"));
    }
	var elem_padding_detect_end = elem_padding_detect_start + parseInt(this_elem.height());
	if (typeof this_elem.data("padding-end") !== "undefined" && this_elem.data("padding-end") !== "" ) {
      elem_padding_detect_end = elem_padding_detect_end - parseInt(this_elem.data("padding-end"));
    }
    
	if ((get_windows_scroll>elem_padding_detect_start) && (get_windows_scroll<elem_padding_detect_end)) {
		this_elem.addClass("scroll-detected");
	} else {
		this_elem.removeClass("scroll-detected");
	}  
	if (get_windows_scroll>elem_padding_detect_start) {
		this_elem.addClass("scroll-detected-toggle");
	}
	if (get_windows_scroll>elem_padding_detect_end) {
		this_elem.addClass("scroll-detected-passed");
	} 
	if (get_windows_scroll<elem_padding_detect_start) {
		this_elem.removeClass("scroll-detected");
		this_elem.removeClass("scroll-detected-passed");
	} 
});
  Header_sticky();
  local_nav_sticky();

});
function Header_sticky() {
  var get_windows_scroll = $(window).scrollTop();
  var get_header_height = $(".header-section").outerHeight();
  var get_banner_height = 1;
  if (typeof $(".banners").outerHeight() !== "undefined" && $(".banners").outerHeight() !== "" ) {
  	get_banner_height = $(".banners").outerHeight();
  }
  if (get_windows_scroll>=get_banner_height) { 
  	$(".header").addClass("sticky");
  	$(".bg-header-holder").removeClass("hide");
  	$(".bg-header-holder").css("height",get_header_height+"px");
  } else {
  	$(".header").removeClass("sticky");
  	$(".bg-header-holder").css("height","0px");
  	$(".bg-header-holder").addClass("hide");
  }
}
function local_nav_sticky() {
if ($(".data-local-nav-container").length) {
  var get_windows_scroll = $(window).scrollTop();
  var get_header_height = $(".header").outerHeight();
  var get_local_nav_height = $(".data-local-nav-container .data-body").outerHeight();
  var elem_pos = $(".data-local-nav-container").position();
  var get_elem_top_pos = elem_pos.top;

	if (get_windows_scroll>=get_elem_top_pos) { 
		$(".data-local-nav-container").addClass("sticky");
		$(".data-local-nav-container .data-body").css("margin-top",get_header_height+"px");
		$(".data-local-nav-blank").css("height",get_local_nav_height+"px");
		$(".data-local-nav-blank").removeClass("hide");
	} else {
		$(".data-local-nav-container").removeClass("sticky");
		$(".data-local-nav-container .data-body").css("margin-top","0px");
		$(".data-local-nav-blank").css("height","0px");
		$(".data-local-nav-blank").addClass("hide");
	}
}

}
function btnEmailShare() {
	$('.btn-email-share').each(function(){
		let title = $(this).data('email-share-title');
		let subject = $(this).data('email-share-subject');
		let body = $(this).data('email-share-body');
		let url = $(this).data('email-share-url');
		let baseurl = window.location.href;
		
		$(this).attr('href','mailto:?subject='+subject+'.&body='+body+'`'+baseurl+'`');
	});
}
function btn_print_object() {
  $(".btn-print").on("click", function() {
  var this_elem = $(this);
  var imgLogoSRC = $('.header-logo-image').attr('src'); 
  console.log('imgLogoSRC ' , imgLogoSRC);
    $(".body-inner").children().addClass("not-for-print");
    $("." + $(this).data("not-print-class-target")).addClass("not-for-print");
    $(".body-inner").append(
      '<div class="temp-print-area temp-container"><div class="img-logo-container"><img class="img-logo" src="'+imgLogoSRC+'" /></div>' +
        $("#" + $(this).data("print-id-target")).html() +
        "</div>"
    );
    $(".temp-print-area").addClass($(this).data("print-add-class"));
    window.print();
    setTimeout(function() {
			if (typeof this_elem.data("print-remove-class-target") !== "undefined" && this_elem.data("print-remove-class-target") !== "") {
				$("."+this_elem.data("print-remove-class-target")).removeClass(this_elem.data("print-target-removeclass"));
			}
			if (typeof this_elem.data("print-add-class-target") !== "undefined" && this_elem.data("print-add-class-target") !== "") {
				$("."+this_elem.data("print-add-class-target")).addClass(this_elem.data("print-target-addclass"));
			}
      $(".not-for-print").removeClass("not-for-print");
      $(".temp-print-area").remove();
      window.location.reload();
    }, 1000);
  });
}
function btn_goback() {
	$('.btn-goback').on('click', function() {
		history.back();
	});
}