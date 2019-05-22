import {
    CHANGE_SEARCH_REQUEST, RECEIVED_MORE_SEARCH_RESULTS, RECEIVED_SEARCH_RESULTS, REQUESTING_SEARCH_RESULTS,
    SearchAction
} from "../actions/search";
import {MovieId} from "./movies";
import {ShowId} from "./shows";

import {map} from "lodash";

type NewsId = string;
type PersonId = number;

interface SearchState {
    movies: MovieId[];
    shows: ShowId[];
    news: NewsId[];
    persons: PersonId[];
    requestingSearchResults: boolean;
    receivedFirstSearchResults: boolean;
    searchRequest: string;
}

const defaultState: SearchState = {
    movies: [],
    shows: [],
    news: [],
    persons: [],
    requestingSearchResults: false,
    receivedFirstSearchResults: false,
    searchRequest: ''
};

export default function search(state: SearchState = defaultState, action: SearchAction): SearchState {
    switch (action.type) {
        case CHANGE_SEARCH_REQUEST:
            return {
                ...state,
                searchRequest: action.searchRequest
            };
        case RECEIVED_SEARCH_RESULTS:
            return {
                ...state,
                movies: map(action.searchResults.movies, (i) => i.id),
                shows: map(action.searchResults.shows, (i) => i.id),
                news: map(action.searchResults.news, (i) => i._id),
                persons: map(action.searchResults.persons, (i) => i.id),
                requestingSearchResults: false,
                receivedFirstSearchResults: true
            };
        case RECEIVED_MORE_SEARCH_RESULTS:
            return {
                ...state,
                movies: [...state.movies, ...map(action.searchResults.movies, (i) => i.id)],
                shows: [...state.shows, ...map(action.searchResults.shows, (i) => i.id)],
                news: [...state.news, ...map(action.searchResults.news, (i) => i._id)],
                persons: [...state.persons, ...map(action.searchResults.persons, (i) => i.id)]
            };
        case REQUESTING_SEARCH_RESULTS:
            return {
                ...state,
                requestingSearchResults: true
            };
        default:
            return state;
    }
}