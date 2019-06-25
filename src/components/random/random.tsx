import {Component, h} from "preact";
import {Operator, Side} from "../../ops/types";
import {isOperatorActive} from "../../ops/roster";
import {random} from "../../util/generators";
import {OperatorCarousel} from "../operator/carousel";
import {Toolbar} from "../controls/toolbar";
import {Button, LinkButton} from "../controls/button";
import {Icon} from "../icon/icon";
import home from "../../icons/home.svg";

interface Props {
	operators: Operator[]
}

interface State {
	operator: Operator | null;
}

export class Random extends Component<Props, State> {

	private readonly generators: Map<Side, Iterator<Operator>>;
	private operatorCarousel?: OperatorCarousel;

	constructor(props: Props, context: any) {
		super(props, context);
		this.state = {operator: null};
		this.generators = new Map();

		let operators = this.props.operators.filter(isOperatorActive);
		this.generators.set(Side.ATTACKER, random(operators.filter(op => op.side === Side.ATTACKER)));
		this.generators.set(Side.DEFENDER, random(operators.filter(op => op.side === Side.DEFENDER)));
	}

	private onSideClicked(side: Side) {
		let generator = this.generators.get(side);
		if (!generator) {
			return;
		}
		this.operatorCarousel && this.operatorCarousel.setNextOperator(generator.next().value);
	}

	render() {
		return <div>
			<Toolbar>
				<Button onClick={() => this.onSideClicked(Side.ATTACKER)} label={"ATK"} side={Side.ATTACKER}/>
				<LinkButton path={"/"}><Icon icon={home}/></LinkButton>
				<Button onClick={() => this.onSideClicked(Side.DEFENDER)} label={"DEF"} side={Side.DEFENDER}/>
			</Toolbar>
			<OperatorCarousel ref={carousel => this.operatorCarousel = carousel}/>
		</div>;
	}

}