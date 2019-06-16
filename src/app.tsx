import {h} from "preact";
import Router from "preact-router";
import {Settings} from "./components/settings/settings";
import {createHashHistory} from "history";
import {ATTACKERS, DEFENDERS} from "./ops/operators";
import {Operator} from "./ops/types";

export function App() {
	const operators: Operator[] = ATTACKERS.concat(DEFENDERS);

	return <Router history={createHashHistory()}>
		<Settings path="/settings" operators={operators}/>
	</Router>;
}