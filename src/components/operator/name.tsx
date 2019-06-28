import {h} from "preact";
import {Operator} from "../../ops/types";

export function OperatorName({op}: { op: Operator }) {
	return <span>{op.name}</span>;
}