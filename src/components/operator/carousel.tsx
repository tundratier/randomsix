import {Operator, Side} from "../../ops/types";
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

	public setNextOperator(operator: Operator | null): void {
		this.state.items.forEach(item => item.item && item.item.die());
		if (operator) {
			this.setState({
				items: this.state.items.concat({id: idCounter++, op: operator})
			});
		}
	}

	private onItemDeath(): void {
		let livingItems = this.state.items.filter(item => item.item && item.item.isAlive());
		this.setState({items: livingItems});
	}

	render() {
		return <div class={style.Carousel}>
			{this.state.items.map((item) => <CarouselItem key={item.id} operator={item.op} ref={it => item.item = it} onDeath={this.onItemDeath.bind(this)}/>)}
		</div>
	}

}

interface ItemState {
	alive: boolean;
	dying: boolean;
}

interface ItemProps {
	operator: Operator;
	onDeath: () => void;
}

class CarouselItem extends Component<ItemProps, ItemState> {

	constructor(props: ItemProps, context: any) {
		super(props, context);
		this.state = {
			alive: true,
			dying: false
		}
	}

	isAlive(): boolean {
		return this.state.alive;
	}

	die(): void {
		this.setState({dying: true});
	}

	private onTransitionEnd() {
		if (this.state.dying) {
			this.setState({alive: false});
			this.props.onDeath();
		}
	}

	private getClassName(): string {
		let lifecycle = !this.state.alive ? style.dead : this.state.dying ? style.dying : "";
		let side = this.props.operator.side === Side.ATTACKER ? style.attacker : style.defender;
		return `${lifecycle} ${side}`;
	}

	render() {
		return <div class={this.getClassName()} onTransitionEnd={this.onTransitionEnd.bind(this)}>
			<OperatorBadge op={this.props.operator} showName={true}/>
		</div>;
	}
}