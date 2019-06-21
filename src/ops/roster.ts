import {Operator} from "./types";

const ROSTER_PREFIX = "op_roster_";
const OP_ACTIVE = "true";
const OP_INACTIVE = "false";

export function getOperatorRoster(): { [name: string]: boolean } {
	let roster: { [name: string]: boolean } = {};
	for (let i = 0; i < window.localStorage.length; i++) {
		let key = window.localStorage.key(i);
		if (!key || !key.startsWith(ROSTER_PREFIX)) {
			continue;
		}
		let name = key.substr(ROSTER_PREFIX.length);
		roster[name] = window.localStorage.getItem(key) === OP_ACTIVE;
	}
	return roster;
}

export function setOperatorActive(operator: Operator, active: boolean): void {
	window.localStorage.setItem(`${ROSTER_PREFIX}${operator.name}`, active ? OP_ACTIVE : OP_INACTIVE);
}

export function isOperatorActive(operator: Operator): boolean {
	let setting = window.localStorage.getItem(`${ROSTER_PREFIX}${operator.name}`);
	return setting === null || setting == OP_ACTIVE;
}