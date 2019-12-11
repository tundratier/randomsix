import {Component, h} from "preact";
import {Operator, Side} from "../../ops/types";
import {readOperator, writeOperator} from "./storage";
import {isOperatorActive} from "../../ops/roster";
import {random} from "../../util/generators";
import {OperatorBadge} from "../operator/badge";
import {Toolbar} from "../controls/toolbar";
import {LinkButton} from "../controls/button";
import {Icon} from "../icon/icon";
import home from "../../icons/home.svg";
import style from "./motd.mod.scss";

interface Props {
	operators: Operator[];
}

export class Motd extends Component<Props> {

	private readonly motdMap: Map<Side, Operator>;
	private readonly operatorPool: Map<Side, Operator[]>;

	constructor(props: Props, context: any) {
		super(props, context);
		this.motdMap = new Map<Side, Operator>();
		this.operatorPool = new Map<Side, Operator[]>();
		[Side.ATTACKER, Side.DEFENDER]
			.forEach(side => this.operatorPool.set(side, props.operators
															  .filter(op => op.side == side)
															  .filter(isOperatorActive)));
		let now = new Date();
		for (let [side, operators] of this.operatorPool.entries()) {
			let currentOp = readOperator(now, side, operators) || random(operators).next().value;
			this.motdMap.set(side, currentOp);
			writeOperator(now, currentOp);
		}
	}

	render() {
		return <div class={style.Motd}>
			<Toolbar>
				<LinkButton path={"/"}><Icon icon={home}/></LinkButton>
			</Toolbar>
			{
				Array.from(this.motdMap.entries())
					 .map(([side, operator]) => <div>
						 <OperatorBadge op={operator}/>
					 </div>)
			}
		</div>;
	}
}