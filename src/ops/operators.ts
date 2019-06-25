import {Operator, Side} from "./types";

function getIconPath(name: string) {
	return `icons/${name.toLowerCase()}.svg`;
}

export const ATTACKERS: Array<Operator> = [
	"Sledge",
	"Thatcher",
	"Ash",
	"Thermite",
	"Twitch",
	"Montagne",
	"Glaz",
	"Fuze",
	"Blitz",
	"IQ",
	"Buck",
	"Blackbeard",
	"Capitao",
	"Hibana",
	"Jackal",
	"Ying",
	"Zofia",
	"Dokkaebi",
	"Lion",
	"Finka",
	"Maverick",
	"Nomad",
	"Gridlock",
	"Nokk",
].map(name => new Operator(Side.ATTACKER, name, getIconPath(name)));

export const DEFENDERS: Array<Operator> = [
	"Smoke",
	"Mute",
	"Castle",
	"Pulse",
	"Doc",
	"Rook",
	"Kapkan",
	"Tachanka",
	"Jager",
	"Bandit",
	"Frost",
	"Valkyrie",
	"Caveira",
	"Echo",
	"Mira",
	"Lesion",
	"Ela",
	"Vigil",
	"Maestro",
	"Alibi",
	"Clash",
	"Kaid",
	"Mozzie",
	"Warden",
].map(name => new Operator(Side.DEFENDER, name, getIconPath(name)));