import {Component, h} from "preact";
import {Operator, Side} from "../../ops/types";
import {getOperatorRoster, setOperatorActive} from "../../ops/roster";
import {Toggle} from "../controls/toggle";
import style from "./settings.mod.scss"
import {OperatorIcon} from "../operator/icon";

interface State {
	roster: { op: Operator, active: boolean }[]
}

interface Props {
	operators: Operator[]
}

export class Settings extends Component<Props, State> {

	constructor(props: Props, context: any) {
		super(props, context);

		let roster = getOperatorRoster();
		this.state = {
			roster: props.operators.map(op => ({
				op,
				active: roster.hasOwnProperty(op.name) ? roster[op.name] : true
			}))
		};
	}

	private onRosterChanged(op: Operator, checked: boolean) {
		setOperatorActive(op, checked);
		let newRoster = this.state.roster.map(it => it.op.name === op.name ? {op, active: checked} : it);
		this.setState({roster: newRoster});
	}

	render() {
		let {roster} = this.state;
		let attackers = roster.filter(({op}) => op.side === Side.ATTACKER);
		let defenders = roster.filter(({op}) => op.side === Side.DEFENDER);

		return <div class={style.Settings}>{
			[attackers, defenders].map(side => <div>{
				side.map(({op, active}) => <Toggle onCheckedChange={(checked) => this.onRosterChanged(op, checked)} checked={active} uncheckedClass={style.unchecked}>
					<OperatorIcon op={op}/>
				</Toggle>)
			}</div>)
		}</div>;
	}
}