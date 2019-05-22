import * as React from 'react';
import generateMain from "./index";
import {createMemoryHistory} from 'history';


module.exports = (url: string) => {
    const history = createMemoryHistory({initialEntries: [ url ],  initialIndex: 0});

    return generateMain(history).jsx;
};