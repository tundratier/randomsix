import {h} from "preact";
import {Operator} from "../../ops/types";
import style from "./icon.mod.scss"

export function OperatorIcon(props: {op: Operator}) {
	return <img class={style.OperatorIcon} alt={props.op.name} src={props.op.icon}/>
}