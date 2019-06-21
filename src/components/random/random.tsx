import {Component, h} from "preact";
import {Operator, Side} from "../../ops/types";
import {Link} from "preact-router";
import {isOperatorActive} from "../../ops/roster";
import {random} from "../../util/generators";

interface Props {
	operators: Operator[]
}

interface State {
	operator: Operator | null;
}

export class Random extends Component<Props, State> {

	private readonly generators: Map<Side, Iterator<Operator>>;

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
		this.setState({operator: generator.next().value});
	}

	render() {
		return <div>
			<header>
				<button type="button" onClick={() => this.onSideClicked(Side.ATTACKER)}>ATK</button>
				<Link path={"/"}>Home</Link>
				<button type="button" onClick={() => this.onSideClicked(Side.DEFENDER)}>DEF</button>
			</header>
			<div>{this.state.operator && this.state.operator.name}</div>
		</div>;
	}

}