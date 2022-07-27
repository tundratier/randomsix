import {h} from "preact";
import {LinkButton} from "../controls/button";
import style from "./home.mod.scss";
import roster from "../../icons/roster.svg";
import queue from "../../icons/queue.svg";
import random from "../../icons/random.svg";
import motd from "../../icons/motd.svg";
import {Icon} from "../icon/icon";

export function Home() {
	return <nav class={style.Home}>
		<LinkButton label={"Random"} path={"/random"}><Icon icon={random}/></LinkButton>
		<LinkButton label={"Playlist"} path={"/queue"}><Icon icon={queue}/></LinkButton>
		<LinkButton label={"MOTD"} path={"/motd"}><Icon icon={motd}/></LinkButton>
		<LinkButton label={"Roster"} path={"/settings"}><Icon icon={roster}/></LinkButton>
	</nav>
}