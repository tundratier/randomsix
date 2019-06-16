import {Component, h} from "preact";

interface State {
	checked: boolean;
}

interface Props {
	onCheckedChange: (checked: boolean) => void;
	checked: boolean;
}

export class Toggle extends Component<Props, State> {

	constructor(props: Props, context: any) {
		super(props, context);
		this.state = {
			checked: props.checked
		};
	}

	private onClick() {
		let newState = !this.state.checked;
		this.props.onCheckedChange(newState);
		this.setState({checked: newState});
	}

	render() {
		return <button
			type="button"
			class={this.state.checked ? "checked" : "unchecked"}
			onClick={this.onClick.bind(this)}>
			{this.props.children}
		</button>;
	}

}