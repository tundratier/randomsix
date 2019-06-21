import {h} from "preact";
import Router from "preact-router";
import {Settings} from "./components/settings/settings";
import {createHashHistory} from "history";
import {ATTACKERS, DEFENDERS} from "./ops/operators";
import {Operator} from "./ops/types";
import style from "./app.mod.scss";
import {Random} from "./components/random/random";

export function App() {
	const operators: Operator[] = ATTACKERS.concat(DEFENDERS);

	return <div class={style.app}>
		<Router history={createHashHistory()}>
			<Random path="/" operators={operators}/>
			<Settings path="/settings" operators={operators}/>
		</Router>
	</div>;
}