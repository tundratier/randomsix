import {Operator} from "../../ops/types";
import {h} from "preact";
import {OperatorIcon} from "./icon";
import {OperatorName} from "./name";
import style from "./operator.mod.scss";

export function OperatorBadge(props: { op: Operator; showName?: boolean }) {
	return <div class={style.OperatorBadge} alt={props.op.name} style={`background-image: url('${props.op.icon}')`}>
		{props.showName && <OperatorName op={props.op}/>}
	</div>
}