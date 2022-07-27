import {h} from "preact";
import Router from "preact-router";
import {Settings} from "./components/settings/settings";
import {createHashHistory} from "history";
import {ATTACKERS, DEFENDERS} from "./ops/operators";
import {Operator} from "./ops/types";
import style from "./app.mod.scss";
import {Random} from "./components/random/random";
import {Queue} from "./components/queue/queue";
import {Home} from "./components/home/home";
import {Motd} from "./components/motd/motd";

export function App() {
	const operators: Operator[] = ATTACKERS.concat(DEFENDERS);

	return <div class={style.app}>
		<Router history={createHashHistory()}>
			<Home path={"/"}/>
			<Random path="/random" operators={operators}/>
			<Queue path="/queue" operators={operators}/>
			<Motd path="/motd" operators={operators}/>
			<Settings path="/settings" operators={operators}/>
		</Router>
	</div>;
}