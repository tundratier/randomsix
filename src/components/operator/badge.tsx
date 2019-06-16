import {Operator} from "../../ops/types";
import {h} from "preact";
import {OperatorIcon} from "./icon";
import {OperatorName} from "./name";
import style from "./operator.mod.scss";

export function OperatorBadge(props: { op: Operator }) {
	return <div class={style.OperatorBadge}>
		<OperatorIcon op={props.op}/>
		<OperatorName op={props.op}/>
	</div>
}