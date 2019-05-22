import "./styles.scss"

import * as React from 'react';

import { History } from 'history';
import { Route } from 'react-router'
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux'
import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk';

import reducers from './reducers'

import HomeSectionContainer from "./sections/HomeSectionContainer/index";
import DetailsSectionContainer from "./sections/DetailsSectionContainer/index";
import SearchSectionContainer from "./sections/SearchSectionContainer/index";
import MoviesListSectionContainer from "./sections/MoviesListSectionContainer/index";
import ShowsListSectionContainer from "./sections/ShowsListSectionContainer/index";
import NewsListSectionContainer from "./sections/NewsListSectionContainer/index";
import AboutUsSectionContainer from "./sections/AboutUsSectionContainer/index";
import {createResponsiveStoreEnhancer, createResponsiveStateReducer} from "redux-responsive";
import ReviewsSectionContainer from "./sections/ReviewsSectionContainer";

type ReduxWindow = {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any
}

const generateMain = (history: History) => {
    const middleware = routerMiddleware(history);

    const typedWindow: ReduxWindow | null = typeof window  === 'object' ? window as any : null;

    const composeEnhancers = typedWindow &&
        typedWindow.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
            typedWindow.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

    const store = createStore(
        combineReducers({
            ...reducers,
            router: routerReducer,
            browser: createResponsiveStateReducer({
                extraSmall: 480,
                small: 768,
                medium: 992,
                large: 1200,
                extraLarge: 1360,
            })
        }),
        composeEnhancers(createResponsiveStoreEnhancer({calculateInitialState: false}), applyMiddleware(middleware, thunk))
    );

    return {
       jsx: (
           <Provider store={store}>
                   <ConnectedRouter history={history}>
                       <div>
                           <Route exact path="/" component={HomeSectionContainer}/>
                           <Route path="/about/:doContactUs?/" component={AboutUsSectionContainer}/>
                           <Route exact path="/details/:type/:id/" component={DetailsSectionContainer}/>
                           <Route path="/details/:type/:id/reviews/" component={ReviewsSectionContainer}/>
                           <Route path="/search/:query/" component={SearchSectionContainer}/>
                           <Route path="/movies/" component={MoviesListSectionContainer}/>
                           <Route path="/shows/" component={ShowsListSectionContainer}/>
                           <Route path="/news/" component={NewsListSectionContainer}/>
                       </div>
                   </ConnectedRouter>
           </Provider>
       ),
       store
    };
};

export default generateMain;