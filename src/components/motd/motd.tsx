import {Component, h} from "preact";
import {Operator, Side} from "../../ops/types";
import {readOperator, resetOperators, writeOperator} from "./storage";
import {isOperatorActive} from "../../ops/roster";
import {random} from "../../util/generators";
import {OperatorBadge} from "../operator/badge";
import {Toolbar} from "../controls/toolbar";
import {Button, LinkButton} from "../controls/button";
import {Icon} from "../icon/icon";
import home from "../../icons/home.svg";
import reset from "../../icons/reset.svg";
import style from "./motd.mod.scss";

interface Props {
	operators: Operator[];
}

interface State {
	motdMap: Map<Side, Operator>;
}

export class Motd extends Component<Props, State> {

	private readonly operatorPool: Map<Side, Operator[]>;

	constructor(props: Props, context: any) {
		super(props, context);
		this.state = {motdMap: new Map<Side, Operator>()};
		this.operatorPool = new Map<Side, Operator[]>();
		[Side.ATTACKER, Side.DEFENDER]
			.forEach(side => this.operatorPool.set(side, props.operators
															  .filter(op => op.side == side)
															  .filter(isOperatorActive)));
		this.calculateMotD();
	}

	private calculateMotD() {
		const now = new Date();
		const motd = new Map<Side, Operator>();
		for (let [side, operators] of this.operatorPool.entries()) {
			let currentOp = readOperator(now, side, operators) || random(operators).next().value;
			motd.set(side, currentOp);
			writeOperator(now, currentOp);
		}
		this.setState({motdMap: motd});
	}

	private onResetClicked() {
		resetOperators();
		this.calculateMotD();
	}

	render() {
		return <div class={style.Motd}>
			<Toolbar>
				<LinkButton path={"/"} label={"HOME"}><Icon icon={home}/></LinkButton>
				<Button label={"RESET"} onClick={this.onResetClicked.bind(this)}><Icon icon={reset}/></Button>
			</Toolbar>
			{
				Array.from(this.state.motdMap.entries())
					 .map(([, operator]) => <OperatorBadge op={operator} showName={true}/>)
			}
		</div>;
	}
}