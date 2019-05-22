import * as React from 'react';
import * as ReactDom from 'react-dom';
import createHistory from 'history/createBrowserHistory'
import generateMain from "./index";
import {calculateResponsiveState} from "redux-responsive";
import * as ReactGA from 'react-ga';

declare global {
    interface Window {
        envGaId: string;
    }
}

ReactGA.initialize(window.envGaId);

const history = createHistory();

const main = generateMain(history);

ReactDom.hydrate(
    main.jsx,
    document.getElementById("webapp")
);

main.store.dispatch(calculateResponsiveState(window));
