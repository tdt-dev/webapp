import {Action} from "redux";
import {Movie} from "../reducers/movies";
import {Show} from "../reducers/shows";
import {News} from "../reducers/news";
import {Dispatch} from "react-redux";
import {fetchSearchResults} from "../services/rest";
import {Person, receivedPersons} from "./persons";
import {receivedMovies} from "./movies";
import {receivedShows} from "./shows";
import {receivedNews} from "./news";

export const RECEIVED_SEARCH_RESULTS = "RECEIVED_SEARCH_RESULTS";
export const RECEIVED_MORE_SEARCH_RESULTS = "RECEIVED_MORE_SEARCH_RESULTS";

export const REQUESTING_SEARCH_RESULTS = "REQUESTING_SEARCH_RESULTS";
export const CHANGE_SEARCH_REQUEST = "CHANGE_SEARCH_REQUEST";

export interface SearchResults {
    movies: Movie[];
    shows: Show[];
    news: News[];
    persons: Person[];
}

export interface SearchAction extends Action {
    searchResults?: SearchResults;
    searchRequest?: string;
}

function receivedSearchResults(searchResults: SearchResults): SearchAction {
    return {
        type: RECEIVED_SEARCH_RESULTS,
        searchResults
    }
}

function receivedMoreSearchResults(searchResults: SearchResults): SearchAction {
    return {
        type: RECEIVED_MORE_SEARCH_RESULTS,
        searchResults
    }
}

function requestingSearchResults(): SearchAction {
    return {
        type: REQUESTING_SEARCH_RESULTS
    }
}

export function changeSearchRequest(searchRequest: string) {
    return {
        type: CHANGE_SEARCH_REQUEST,
        searchRequest
    }
}

export function asyncDoSearch(request: string) {
    return (dispatch: Dispatch<SearchAction>) => {
        dispatch(requestingSearchResults());

        fetchSearchResults(request)
            .then((searchResults: SearchResults) => {
                dispatch(receivedMovies(searchResults.movies));
                dispatch(receivedShows(searchResults.shows));
                dispatch(receivedNews(searchResults.news));
                dispatch(receivedPersons(searchResults.persons));
                dispatch(receivedSearchResults(searchResults));
            });
    }
}

export function asyncDoMoreSearch(request: string, page: number) {
    return (dispatch: Dispatch<SearchAction>) => {
        fetchSearchResults(request, page)
            .then((searchResults: SearchResults) => {
                dispatch(receivedMovies(searchResults.movies));
                dispatch(receivedShows(searchResults.shows));
                dispatch(receivedNews(searchResults.news));
                dispatch(receivedPersons(searchResults.persons));
                dispatch(receivedMoreSearchResults(searchResults));
            });
    }
}