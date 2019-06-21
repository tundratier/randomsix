import {h} from "preact";
import {Side} from "../../ops/types";
import style from "./button.mod.scss";
import {Link} from "preact-router";

interface Props {
	label: string;
	onClick?: () => void;
	side?: Side;
}

interface LinkProps {
	path: string;
}

function className(props: Props): string {
	return props.side === undefined
		? style.Button
		: `${style.Button} ${props.side === Side.ATTACKER ? style.attacker : style.defender}`;
}

export function Button(props: Props) {
	return <button class={className(props)} type="button" onClick={props.onClick}>{props.label}</button>
}

export function LinkButton(props: Props & LinkProps) {
	return <Link path={props.path} class={className(props)} onClick={props.onClick}>{props.label}</Link>
}