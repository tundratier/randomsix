import {Component, h} from "preact";
import {Operator, Side} from "../../ops/types";
import {Toolbar} from "../controls/toolbar";
import {Button, LinkButton} from "../controls/button";
import {isOperatorActive} from "../../ops/roster";
import {playlist, PLAYLIST_SKIP} from "../../util/generators";
import {OperatorCarousel} from "../operator/carousel";

interface Props {
	operators: Operator[];
}

export class Queue extends Component<Props> {

	private readonly generators: Map<Side, Iterator<Operator>>;
	private operatorCarousel?: OperatorCarousel;
	private currentOperator?: Operator;

	constructor(props: Props, context: any) {
		super(props, context);

		this.generators = new Map<Side, Iterator<Operator>>();
		this.resetQueue(Side.ATTACKER);
		this.resetQueue(Side.DEFENDER);
	}

	private resetQueue(side: Side) {
		let operators = this.props.operators
							.filter(op => op.side === side)
							.filter(isOperatorActive);
		this.generators.set(side, playlist(operators));
	}

	private onResetClicked() {
		this.resetQueue(Side.ATTACKER);
		this.resetQueue(Side.DEFENDER);
		this.operatorCarousel && this.operatorCarousel.setNextOperator(null);
	}

	private onSideClicked(side: Side) {
		this.selectNextOperator(side);
	}

	private onSkipClicked() {
		if (this.currentOperator) {
			this.selectNextOperator(this.currentOperator.side, true);
		}
	}

	private selectNextOperator(side: Side, skip: boolean = false, recurse: boolean = false) {
		let generator = this.generators.get(side)!;
		let item = generator.next(skip ? PLAYLIST_SKIP : undefined);
		if (item.done) {
			this.resetQueue(side);
			if (!recurse) {
				this.selectNextOperator(side, skip, true);
			} else {
				delete this.currentOperator;
				this.operatorCarousel!.setNextOperator(null);
			}
		} else {
			this.currentOperator = item.value;
			this.operatorCarousel!.setNextOperator(item.value);
		}
	}

	render() {
		return <div>
			<Toolbar>
				<Button onClick={() => this.onSideClicked(Side.ATTACKER)} label={"ATK"} side={Side.ATTACKER}/>
				<LinkButton path={"/"} label={"Home"}/>
				<Button onClick={() => this.onSideClicked(Side.DEFENDER)} label={"DEF"} side={Side.DEFENDER}/>
			</Toolbar>
			<Toolbar>
				<Button label={"RESET"} onClick={this.onResetClicked.bind(this)}/>
				<Button label={"SKIP"} onClick={this.onSkipClicked.bind(this)}/>
			</Toolbar>
			<OperatorCarousel ref={carousel => this.operatorCarousel = carousel}/>
		</div>;
	}
}