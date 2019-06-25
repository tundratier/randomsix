import {ComponentChildren, h, VNode} from "preact";
import {Side} from "../../ops/types";
import style from "./button.mod.scss";
import {Link} from "preact-router";

interface Props {
	label?: string;
	onClick?: () => void;
	side?: Side;
	children?: ComponentChildren;
}

interface LinkProps {
	path: string;
}

function className(props: Props): string {
	let classes = [style.Button];

	if (props.side !== undefined) {
		classes.push(props.side === Side.ATTACKER ? style.attacker : style.defender);
	}

	if (!props.label) {
		classes.push(style.icon_only);
	}

	return classes.join(" ");
}

function label(props: Props): VNode | string {
	return props.label ? <span>{props.label}</span> : "";
}

export function Button(props: Props) {
	return <button class={className(props)} type="button" onClick={props.onClick}>{props.children}{label(props)}</button>
}

export function LinkButton(props: Props & LinkProps) {
	return <Link path={props.path} class={className(props)} href={props.path} onClick={props.onClick}>{props.children}{label(props)}</Link>
}