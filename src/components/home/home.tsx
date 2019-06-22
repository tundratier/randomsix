import {h} from "preact";
import {LinkButton} from "../controls/button";
import style from "./home.mod.scss";

export function Home() {
	return <nav class={style.Home}>
		<LinkButton label={"Random"} path={"/random"}/>
		<LinkButton label={"Playlist"} path={"/queue"}/>
		<LinkButton label={"Roster"} path={"/settings"}/>
	</nav>
}