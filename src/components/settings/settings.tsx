import {Component, h} from "preact";
import {Operator, Side} from "../../ops/types";
import {getOperatorRoster, setOperatorActive} from "../../ops/roster";
import {Toggle} from "../controls/toggle";
import style from "./settings.mod.scss"
import {OperatorIcon} from "../operator/icon";
import {Toolbar} from "../controls/toolbar";
import {LinkButton} from "../controls/button";
import {Icon} from "../icon/icon";
import home from "../../icons/home.svg";

type OperatorSelection = { op: Operator, active: boolean };

interface State {
	roster: OperatorSelection[]
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
		let side: { ops: OperatorSelection[], title: string; cls: string}[] = [];
		side.push({
			title: "Attackers",
			cls: style.attacker,
			ops: roster.filter(({op}) => op.side === Side.ATTACKER)
		});
		side.push({
			title: "Defenders",
			cls: style.defender,
			ops: roster.filter(({op}) => op.side === Side.DEFENDER)
		});

		return <div class={style.Settings}>
			<Toolbar>
				<LinkButton path={"/"}><Icon icon={home}/></LinkButton>
			</Toolbar>
			{
				side.map(({title, ops, cls}) => <div>
					<h2 class={cls}>{title}</h2>
					{
						ops.map(({op, active}) => <Toggle onCheckedChange={(checked) => this.onRosterChanged(op, checked)} checked={active} uncheckedClass={style.unchecked}>
							<OperatorIcon op={op}/>
						</Toggle>)
					}
				</div>)
			}
		</div>;
	}
}