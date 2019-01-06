import {Component, h} from "preact";
import {Operator} from "../../ops/types";

export class OperatorIcon extends Component<{ op: Operator }, { icon: string }> {

	constructor(props: { op: Operator }, context: any) {
		super(props, context);
		this.loadIcon();
	}

	private loadIcon() {
		fetch(this.props.op.icon)
			.then(response => response.text())
			.then(svg => this.setState({icon: svg}));
	}

	render() {
		let {icon} = this.state;
		if (icon) {
			return <div>${icon}</div>;
		} else {
			return <div/>;
		}
	}
}