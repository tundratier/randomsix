import {Operator} from "../../ops/types";
import {Component, h} from "preact";
import {OperatorBadge} from "./badge";
import style from "./carousel.mod.scss";

let idCounter = 0;

interface State {
	items: { id: number, op: Operator, item?: CarouselItem }[];
}

export class OperatorCarousel extends Component<{}, State> {

	constructor(props: {}, context: any) {
		super(props, context);
		this.state = {
			items: []
		};
	}

	public setNextOperator(operator: Operator): void {
		this.setState({
			items: this.state.items.concat({id: idCounter++, op: operator})
		});
	}

	private onItemDeath(): void {
		let livingItems = this.state.items.filter(item => item.item && item.item.isAlive());
		this.setState({items: livingItems});
	}

	render() {
		return <div>
			{this.state.items.map((item) => <CarouselItem key={item.id} operator={item.op} ref={it => item.item = it} onDeath={this.onItemDeath.bind(this)}/>)}
		</div>
	}

}

interface ItemState {
	alive: boolean;
}

interface ItemProps {
	operator: Operator;
	onDeath: () => void;
}

class CarouselItem extends Component<ItemProps, ItemState> {

	constructor(props: ItemProps, context: any) {
		super(props, context);
		this.setState({alive: true});
	}

	componentDidMount(): void {
		setTimeout(() => {
			this.setState({alive: false});
			this.props.onDeath();
		}, 1000);
	}

	isAlive(): boolean {
		return this.state.alive;
	}

	render() {
		return <div class={this.state.alive ? "" : style.dead}>
			<OperatorBadge op={this.props.operator}/>
		</div>;
	}
}