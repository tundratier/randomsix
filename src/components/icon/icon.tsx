import {Component, h} from "preact";
import style from "./icon.mod.scss";

interface Props {
	icon: string;
}

export class Icon extends Component<Props> {

	shouldComponentUpdate(nextProps: Readonly<Props>, nextState: Readonly<{}>, nextContext: any): boolean {
		return false;
	}

	componentDidMount(): void {
		(this.base as HTMLElement).innerHTML = this.props.icon;
	}

	render() {
		return <div class={style.Icon}/>;
	}
}