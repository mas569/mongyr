Overview - Mongyr.com

Pages: This Season, All Seasons, 

On page load
	Header-nav w/background at 60% opacity comes down from top in 500ms, 
	then background goes to 0% opacity in 500ms
	Div "intro-block" at 100% of screen width contains background image, which uses overflow to "zoom" when user scrolls down. This image has its height fixed equal to the viewport height.

This Season
	Blogpost centered, Semi-transparent, displays 20 lines
	When user clicks "Read more...", blogpost container expands to fit content in 500ms (expands in all directions, to fill page minus header-nav and directional arrows
	Blogpost container also becomes 80% (or fully) opaque when expanded
	Directional arrows remain fixed relative to expanded container and 
		top/bottom of screen (also are outside of blogpost container)
	When user clicks a directional arrow, the previous or next blogpost slides in from left or right edge of blogpost container, maintaining opacity and filling container (looks seamless)
	At bottom of blogpost container, link to "All Seasons", (possibly other mini-navigational info as well)

All Seasons
	Repeats above structure four times vertically (see mock-up)
	When user clicks e.g. "Fall", a list expands to the right (animated)
		with all cheeses in that category in a vertical scroll with name

??
	How to use CSS to create logo graphic
	Best practices for SPAs versus linked pages
	Modular for future expandability - how best to build for this?
	Is this ambitious enough? Can I plug in map API? 

Cheese Plate Widget
	displays an animal
	on animal click, expand a rotating wheel of cheeses
	on hover, basic cheese info
	click and drag cheese to plate


--- 

	function showHide(){
	$(this).siblings("p.hideContent").toggleClass("showContent", 400);
}
$(".more").on("click", showHide)



----

On scrolldown (arrow key, too), nav disappearsa
On scrollup (arrow key, too), nav reappears w/ 60% opacity