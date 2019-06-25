import {Component, h} from "preact";
import style from "./space.mod.scss";

export class RemainingVerticalSpace extends Component {

	componentDidMount(): void {
		let bounds = this.base!.getBoundingClientRect();
		let height = window.innerHeight - bounds.top;
		this.base!.style.height = `${height}px`;
	}

	render() {
		return <div class={style.RemainingVerticalSpace}>{this.props.children}</div>
	}
}