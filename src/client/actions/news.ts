import {Action, Dispatch} from "redux";
import {News} from "../reducers/news";
import {fetchNews} from "../services/rest";
import { map } from "lodash";

export const RECEIVED_NEWS = "RECEIVED_NEWS";
export const REQUESTING_NEWS = "REQUESTING_NEWS";

export interface NewsAction extends Action {
    news?: News[];
}

export function receivedNews(news: News[]) {
    const processedNewsList = map(
        news,
        (v) => (
            {
                ...v,
                image_url: [{
                    path: v.image_url,
                    res: ''
                }]
            }
        )
    );
    return {
        type: RECEIVED_NEWS,
        news: processedNewsList
    }
}

function requestingNews() {
    return {
        type: REQUESTING_NEWS
    }
}

export function asyncRequestNews() {
    return (dispatch: Dispatch<NewsAction>) => {
        dispatch(requestingNews());
        fetchNews()
            .then((news) => {
                dispatch(receivedNews(news));
            });
    }
}