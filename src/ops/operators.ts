import {Operator, Side} from "./types";

function getIconPath(name: string) {
	return `icons/${name.toLowerCase()}.svg`;
}

export const ATTACKERS: Array<Operator> = [
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
	"Lion",
	"Finka",
	"Maverick",
	"Nomad",
].map(name => new Operator(Side.ATTACKER, name, getIconPath(name)));

export const DEFENDERS: Array<Operator> = [
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
	"Alibi",
	"Maestro",
	"Clash",
	"Kaid",
].map(name => new Operator(Side.DEFENDER, name, getIconPath(name)));