
// ** add in code for pulling from jquery.min.js in root folder if no jQuery CDN


// On page load, .header-nav fadeInDown

$(document).ready(function(initialFade){
	$(".header-nav").addClass("animated fadeInDown");
});


// When we scroll down, .header-nav fadeOutUp
// When we scroll up, .header-nav fadeInDown
// (ignores top 50px of page to prevent bounce activation and avoid overlap)

var lastScrollTop = 0;
$(window).scroll(function(){
	var newScrollTop = $(this).scrollTop();
	if ((newScrollTop > lastScrollTop) && (newScrollTop > 50)){
		console.log("fadeOutUp");
		$(".header-nav").addClass("animated fadeOutUp");
	} else {
		console.log("fadeInDown");
		// $(".header-nav").switchClass("fadeOutUp", "fadeInDown");
		$(".header-nav").removeClass("fadeOutUp");
		$(".header-nav").addClass("fadeInDown");
	}
	lastScrollTop = newScrollTop;
});


// When we mouse over the top 10% (or 50px?) of the page - wherever we are in the scroll position - the menu will fade in down; on mouse-leave, the menu will fade out up, unless we are scrolled to to the very top of the page, in which case it will remain down


var windowHeightPix = $(window).height();
function mouseNav(){
	$(document).mousemove(function(event){
		$("#status").html(event.clientX +', '+ event.clientY);
		var mouseYAsPercent =  (100 * event.clientY) / windowHeightPix;
		console.log("mouse Y pos = " + event.clientY);
		console.log("mouse Y % = " + mouseYAsPercent);
		console.log("scroll pos = " + $(window).scrollTop());

		if((mouseYAsPercent < 10) && $(".header-nav").hasClass("fadeOutUp")){
			// $(this).unbind('mousemove');
			$(".header-nav").removeClass("fadeOutUp");
			$(".header-nav").addClass("fadeInDown");
			console.log("mouseNavDown is working!");
		} else if ($(window).scrollTop() > 50){
			$(".header-nav").mouseleave(function(){
				$(".header-nav").removeClass("fadeInDown");
				$(".header-nav").addClass("fadeOutUp");	
			console.log("mouseNavUp on nav leave is working");
			});
		} else {
			$(".header-nav").unbind("mouseleave");
		}
    });
}
mouseNav();


// Build object to relate keyword and html page

var slides = {
	"autumn-geo": {
		"html_page": "slides/autumn-geotrichum.html",
		"image": "../images/harbisonrawonracks.jpg",
		"next_page_id": "autumn-plat",
		"prev_page_id": "winter-vach"
	},
	"autumn-plat": {
		"html_page": "slides/autumn-platingitup.html",
		"image": "../images/boardoverview.jpg",
		"next_page_id": "autumn-bayley",
		"prev_page_id": "autumn-geo"	
	},
	"autumn-bayley": {
		"html_page": "slides/autumn-bayley-best.html",
		"image": "../images/bayleyhalf.jpg",
		"next_page_id": "winter-vach",
		"prev_page_id": "autumn-plat"	
	},
	"winter-vach": {
		"html_page": "slides/winter-vacherin-style.html",
		"image": "../images/winnimeresign.jpg",
		"next_page_id": "autumn-geo",
		"prev_page_id": "autumn-bayley"
	}
}

// When we click "arrowreadmore", div "fulltextblock" *animates* to visible, expanding top to bottom quickly. Page scrolls down at medium speed to where *window top is top of div* "fulltextblock"
// anchor tag that goes to ID on that page, which I then animate w/webkit transitions !!! Want to make sure I make this back-navigable
// should also make "arrowreadless" display:block

var slideDownSetter = {
		setNow: function(){
			$('a[href^="#"]').on("click",function (slideDown) {
				slideDown.preventDefault();
				console.log("arrowreadmore is working");

				$("#fulltextblock").show(400);
			// better than $("#fulltextblock").css("display", "block");?
			// time is interesting, but can we control how it fades in?
			// how much of this can I do in JS, and how much is better to do in CSS (e.g. as I did w/menu)?
				$("#arrowreadless").show(1000);

				var target = this.hash;
				$target = $(target);

				$("html, body").stop().animate({
					"scrollTop": $target.offset().top
				}, 500, "swing", function () {
					window.location.hash = target;
				})
			})
		}
	}

// When we click "arrowreadless", div "fulltextblock" *animates* to invisible (collapses), page scrolls back to top of window.
// Why is this better/worse than add/removeClass with class in css having only display:block/none, or $("#fulltextblock").css("display", "none");? Would CSS be a better way to do this if I want full control over the transition?
// ! But collapses and reopens, something to do with #introblock href in html !!!!

$("#arrowreadless").on("click", function(e){
	e.preventDefault();
	$("#fulltextblock, #arrowreadless").hide(400);
	console.log("hide fulltext works");
});


// Toggle drop-down menu on hamburger click
// What's the best way to make this so it uses the same full menu, w/o duplicate html?

$(".hamburger").on("click", function(){
	$(".mobilemenu").toggleClass("show");
	$("#introblock").toggleClass("intro-expanded");
	$("#arrowleft, #arrowright").toggleClass("arrow-expanded");
	console.log("hamburger works");
});


$(document).ready(function(){

	// When we click "arrowleft" or "arrowright", a new html file is loaded, replacing the content of the following divs: #introblock and #fulltextblock

	$("#introblock").load("slides/autumn-geotrichum.html #introtext");
	$("#fulltextblock").load("slides/autumn-geotrichum.html #fulltext");
	console.log("AJAX initial is working");
	
	// Sets JS for transition between textblock divs

	slideDownSetter.setNow();
});

$("#arrowright").on("click", function(){
	var current_page_id = $("#introtext").data("page-source");
	var next_page_id = slides[current_page_id].next_page_id;
	var new_html_page = slides[next_page_id].html_page;
	var css_background = "url("+slides[next_page_id].image+")";

	$("#introblock").css("background-image", css_background);
	$("#introblock").load(new_html_page+" #introtext");
	$("#fulltextblock").load(new_html_page+" #fulltext");
	
	console.log("AJAX right arrow is working");
});

$("#arrowleft").on("click", function(){
	var current_page_id = $("#introtext").data("page-source");
	var prev_page_id = slides[current_page_id].prev_page_id;
	var new_html_page = slides[prev_page_id].html_page;
	var css_background = "url("+slides[prev_page_id].image+")";

	$("#introblock").css("background-image", css_background);
	$("#introblock").load(new_html_page+" #introtext");
	$("#fulltextblock").load(new_html_page+" #fulltext");

	console.log("AJAX left arrow is working");
});


// DEPRECATED THIS SITE

// When you click "read more", the container expands to accomodate content
// When the container expands, it becomes partially opaque and takes up more space on the page

// function showHide(){
// 	$(this).siblings("div.hideContent").toggleClass("showContent", 400);
// }
// $(".more").on("click", showHide)

// $(document).ready(function() {
//     $('.post').addClass("hidden").viewportChecker({
//         classToAdd: 'visible animated fadeIn',
//         offset: 100
//        });
// });