const content = document.querySelector(".inside");



function getScrollAmount() {
	let contentWidth = content.scrollWidth;
	return -(contentWidth - window.innerWidth+00);
}



const tween = gsap.to(content, {
	x: getScrollAmount,
	duration: 1,
	ease: "none",
});
	
	



	const tl = ScrollTrigger.create({
		trigger:".zainteresowania",
		start:"top 0",
		end: () => `+=${getScrollAmount() * -1}`,
		pin:".zainteresowania",
		animation:tween,
		scrub:0,
		invalidateOnRefresh:true,
		markers:false
	})

	tl.refresh();




