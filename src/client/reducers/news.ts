import {NewsAction, RECEIVED_NEWS, REQUESTING_NEWS} from "../actions/news";
import { keyBy } from "lodash";
import {ImageItem} from "./movies";

export interface News {
    _id?: string;
    title: string;
    image_url: ImageItem[];
    description: string;
    link: string;
    author: string;
    publication: string;
    date: string;
}

export interface NewsMap {
    [id: string]: News
}

interface NewsState {
    items: NewsMap;
    requestingNews: Boolean;
}

const defaultState: NewsState = {
    items: {},
    requestingNews: false
};

export default function news(state: NewsState = defaultState, action: NewsAction): NewsState {
    switch (action.type) {
        case REQUESTING_NEWS:
            return {
                ...state,
                requestingNews: true
            };
        case RECEIVED_NEWS:
            return {
                ...state,
                requestingNews: false,
                items: {...state.items, ...keyBy(action.news, (v) => v._id)}
            };
        default:
            return state;
    }
}
