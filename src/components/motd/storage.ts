import {Operator, Side} from "../../ops/types";

const PREFIX = "MOTD";

export function dateStamp(date: Date): string {
	return `${Math.floor(date.getTime() / 86400000)}`;
}

function createKey(side: Side): string {
	return `${PREFIX}_${side}`;
}

function createValue(date: Date, operator: Operator): string {
	return `${dateStamp(date)}_${operator.name}`;
}

export function writeOperator(date: Date, operator: Operator) {
	let key = createKey(operator.side);
	let value = createValue(date, operator);
	window.localStorage.setItem(key, value);
}

export function readOperator(date: Date, side: Side, operators: Operator[]): Operator | null {
	let key = createKey(side);
	let item = window.localStorage.getItem(key);
	if (item == null) {
		return null;
	}
	let [stamp, name] = item.split("_");
	let requestStamp = dateStamp(date);
	return stamp == requestStamp
		? operators.find(op => op.name == name) || null
		: null;
}