export enum Side {ATTACKER, DEFENDER}

export class Operator {

	private readonly _side: Side;
	private readonly _name: string;
	private readonly _icon: string;

	constructor(side: Side, name: string, icon: string) {
		this._side = side;
		this._name = name;
		this._icon = icon;
	}

	get side(): Side {
		return this._side;
	}

	get name(): string {
		return this._name;
	}

	get icon(): string {
		return this._icon;
	}
}

