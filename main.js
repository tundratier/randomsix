(() => {

	const slideContainer = document.getElementById("selection");
	const operators = {
		attacker: [
			["ash"],
			["blackbeard"],
			["blitz"],
			["buck"],
			["capitao"],
			["dokkaebi"],
			["fuze"],
			["glaz"],
			["hibana"],
			["iq"],
			["jackal"],
			["montagne"],
			["sledge"],
			["thatcher"],
			["thermite"],
			["twitch"],
			["ying"],
			["zofia"],
			["lion"],
			["finka"],
			["maverick"],
			["nomad"],
		],
		defender: [
			["bandit"],
			["castle"],
			["caveira"],
			["doc"],
			["echo"],
			["ela"],
			["frost"],
			["jager"],
			["kapkan"],
			["lesion"],
			["mira"],
			["mute"],
			["pulse"],
			["rook"],
			["smoke"],
			["tachanka"],
			["valkyrie"],
			["vigil"],
			["alibi"],
			["maestro"],
			["clash"],
			["kaid"],
		]
	};
	const NAME = 0;
	const ICON = 1;

	function loadOperatorIcons() {
		return Promise.all(
			Object.entries(operators)
			      .reduce((names, [side, ops]) => names.concat(ops.map((op, idx) => [side, op[NAME], idx])), [])
			      .map(([side, name, idx]) => {
				      return fetch(`icons/${name}.svg`)
					      .then(response => response.text())
					      .then(svg => operators[side][idx].push(svg));
			      })
		);
	}

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

	function fillOperator(side, slide) {
		let pool = operators[side];
		let operator = pool[Math.floor(Math.random() * pool.length)];
		slide.innerHTML = operator[ICON];
		let name = document.createElement("span");
		name.innerText = operator[NAME];
		slide.appendChild(name);
	}

	function removeCurrentSlide() {
		slideContainer.querySelectorAll(".slide:not(.removed)")
		              .forEach(el => el.classList.add("removed"));
	}

	function chooseOperator(event) {
		let side = event.currentTarget.getAttribute("data-side");
		let slide = createSlide(side);
		fillOperator(side, slide);
		removeCurrentSlide();
		slideContainer.appendChild(slide);
	}

	function init() {
		document.querySelectorAll(".btn-choose-side")
		        .forEach(el => el.addEventListener("click", chooseOperator, false));
	}

	loadOperatorIcons()
		.then(init);
})();