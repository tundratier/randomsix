import {Component, h} from "preact";
import style from "./toolbar.mod.scss"

export class Toolbar extends Component<{}, {}> {

	render() {
		return <header class={style.Toolbar}>
			{this.props.children}
		</header>
	}

}