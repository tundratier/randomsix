(() => {

	const slideContainer = document.getElementById("selection");

	function removeEventTarget(event) {
		let target = event.currentTarget;
		if (target.parentNode) {
			target.parentNode.removeChild(target);
		}
	}

	function createSlide(side) {
		let slide = document.createElement("DIV");
		slide.classList.add("slide", side);
		slide.addEventListener("transitionend", removeEventTarget, false);
		return slide;
	}

	function removeCurrentSlide() {
		slideContainer.querySelectorAll(".slide:not(.removed)")
		              .forEach(el => el.classList.add("removed"));
	}

	function chooseOperator(event) {
		let side = event.currentTarget.getAttribute("data-side");
		let slide = createSlide(side);
		removeCurrentSlide();
		slideContainer.appendChild(slide);
	}

	document.querySelectorAll(".btn-choose-side")
	        .forEach(el => el.addEventListener("click", chooseOperator, false));

})();