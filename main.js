(() => {

	const slideContainer = document.getElementById("selection");
	const operators = {
		attacker: [
			"Ash",
			"Blackbeard",
			"Blitz",
			"Buck",
			"Capitao",
			"Dokkaebi",
			"Fuze",
			"Glaz",
			"Hibana",
			"IQ",
			"Jackal",
			"Montagne",
			"Sledge",
			"Thatcher",
			"Thermite",
			"Twitch",
			"Ying",
			"Zofia",
		],
		defender: [
			"Bandit",
			"Castle",
			"Caveira",
			"Doc",
			"Echo",
			"Ela",
			"Frost",
			"Jager",
			"Kapkan",
			"Lesion",
			"Mira",
			"Mute",
			"Pulse",
			"Rook",
			"Smoke",
			"Tachanka",
			"Valkyrie",
			"Vigil",
		]
	};

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

	function createOperator(side) {
		let pool = operators[side];
		let operator = pool[Math.floor(Math.random() * pool.length)];
		let el = document.createElement("div");
		el.innerText = operator;
		el.classList.add("operator");
		return el;
	}

	function removeCurrentSlide() {
		slideContainer.querySelectorAll(".slide:not(.removed)")
		              .forEach(el => el.classList.add("removed"));
	}

	function chooseOperator(event) {
		let side = event.currentTarget.getAttribute("data-side");
		let slide = createSlide(side);
		let operator = createOperator(side);
		slide.appendChild(operator);
		removeCurrentSlide();
		slideContainer.appendChild(slide);
	}

	document.querySelectorAll(".btn-choose-side")
	        .forEach(el => el.addEventListener("click", chooseOperator, false));

})();