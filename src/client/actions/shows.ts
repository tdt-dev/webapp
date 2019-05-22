import {Show, ShowId, Shows} from "../reducers/shows";
import {Action, Dispatch} from "redux";
import {
    fetchHighestRatedShows, fetchLatestRatedShows, fetchLowestRatedShows, fetchNowPlayingShows, fetchShowDetails,
    fetchUsersRatingForShow
} from "../services/rest";
import {Ratings} from "../sections/HomeSectionContainer/HomeSection/RecentRatingsBlock/RecentRatingsComponent/RecentRatingsItemComponent/RatingComponent";
import {receivedRatings, requestingRatings} from "./ratings";


export const RECEIVED_LATEST_RATED_SHOWS = 'RECEIVED_LATEST_RATED_SHOWS';
export const REQUESTING_LATEST_RATED_SHOWS = 'REQUESTING_LATEST_RATED_SHOWS';
export const RECEIVED_MORE_LATEST_RATED_SHOWS = 'RECEIVED_MORE_LATEST_RATED_SHOWS';

export const RECEIVED_NOW_PLAYING_SHOWS = 'RECEIVED_NOW_PLAYING_SHOWS';
export const REQUESTING_NOW_PLAYING_SHOWS = 'REQUESTING_NOW_PLAYING_SHOWS';
export const RECEIVED_MORE_NOW_PLAYING_SHOWS = 'RECEIVED_MORE_NOW_PLAYING_SHOWS';

export const RECEIVED_HIGHEST_RATED_SHOWS = 'RECEIVED_HIGHEST_RATED_SHOWS';
export const REQUESTING_HIGHEST_RATED_SHOWS = 'REQUESTING_HIGHEST_RATED_SHOWS';
export const RECEIVED_MORE_HIGHEST_RATED_SHOWS = 'RECEIVED_MORE_HIGHEST_RATED_SHOWS';

export const RECEIVED_LOWEST_RATED_SHOWS = 'RECEIVED_LOWEST_RATED_SHOWS';
export const REQUESTING_LOWEST_RATED_SHOWS = 'REQUESTING_LOWEST_RATED_SHOWS';
export const RECEIVED_MORE_LOWEST_RATED_SHOWS = 'RECEIVED_MORE_LOWEST_RATED_SHOWS';

export const RECEIVED_SHOW_DETAILS = 'RECEIVED_SHOW_DETAILS';
export const REQUESTING_SHOW_DETAILS = 'REQUESTING_SHOW_DETAILS';
export const RECEIVED_SHOWS = 'RECEIVED_SHOWS';
export const UPDATE_SHOW_RATING = 'UPDATE_SHOW_RATING';

export const SORT_SHOWS_BY_LATEST = 'SORT_SHOWS_BY_LATEST';
export const SORT_SHOWS_BY_LATEST_RATED = 'SORT_SHOWS_BY_LATEST_RATED';
export const SORT_SHOWS_BY_HIGHEST_RATED = 'SORT_SHOWS_BY_HIGHEST_RATED';
export const SORT_SHOWS_BY_LOWEST_RATED = 'SORT_SHOWS_BY_LOWEST_RATED';

export const INCREASE_SHOW_REVIEWS_COUNTER = 'INCREASE_SHOW_REVIEWS_COUNTER';
export const DECREASE_SHOW_REVIEWS_COUNTER = 'DECREASE_SHOW_REVIEWS_COUNTER';

export interface ShowsAction extends Action {
    shows?: Shows[];
    show?: Show;
}

export function updateShowRating(itemId: ShowId, usersRating: Ratings, globalRating: Ratings) {
    return {
        type: UPDATE_SHOW_RATING,
        show: {
            id: +itemId,
            rating: globalRating,
            usersRating
        }
    }
}

export function increaseShowReviewsCounter(itemId: ShowId) {
    return {
        type: INCREASE_SHOW_REVIEWS_COUNTER,
        show: {
            id: +itemId
        }
    }
}

export function decreaseShowReviewsCounter(itemId: ShowId) {
    return {
        type: DECREASE_SHOW_REVIEWS_COUNTER,
        show: {
            id: +itemId
        }
    }
}

export function receivedShows(shows: Shows[]) {
    return {
        type: RECEIVED_SHOWS,
        shows
    }
}

function receivedLatestRatedShows(shows: Shows[]) {
    return {
        type: RECEIVED_LATEST_RATED_SHOWS,
        shows
    }
}

function receivedMoreLatestRatedShows(shows: Shows[]) {
    return {
        type: RECEIVED_MORE_LATEST_RATED_SHOWS,
        shows
    }
}

function requestingLatestRatedShows() {
    return {
        type: REQUESTING_LATEST_RATED_SHOWS
    }
}

function receivedNowPlayingShows(shows: Shows[]) {
    return {
        type: RECEIVED_NOW_PLAYING_SHOWS,
        shows
    }
}

function receivedMoreNowPlayingShows(shows: Shows[]) {
    return {
        type: RECEIVED_MORE_NOW_PLAYING_SHOWS,
        shows
    }
}

function requestingNowPlayingShows() {
    return {
        type: REQUESTING_NOW_PLAYING_SHOWS
    }
}

function receivedHighestRatedShows(shows: Shows[]) {
    return {
        type: RECEIVED_HIGHEST_RATED_SHOWS,
        shows
    }
}

function receivedMoreHighestRatedShows(shows: Shows[]) {
    return {
        type: RECEIVED_MORE_HIGHEST_RATED_SHOWS,
        shows
    }
}

function requestingHighestRatedShows() {
    return {
        type: REQUESTING_HIGHEST_RATED_SHOWS
    }
}

function receivedLowestRatedShows(shows: Shows[]) {
    return {
        type: RECEIVED_LOWEST_RATED_SHOWS,
        shows
    }
}

function receivedMoreLowestRatedShows(shows: Shows[]) {
    return {
        type: RECEIVED_MORE_LOWEST_RATED_SHOWS,
        shows
    }
}

function requestingLowestRatedShows() {
    return {
        type: REQUESTING_LOWEST_RATED_SHOWS
    }
}

function receivedShowDetails(show: Show) {
    return {
        type: RECEIVED_SHOW_DETAILS,
        show
    }
}

function requestingShowDetails() {
    return {
        type: REQUESTING_SHOW_DETAILS
    }
}

export function sortByLatest() {
    return {
        type: SORT_SHOWS_BY_LATEST
    }
}

export function sortByLatestRated() {
    return {
        type: SORT_SHOWS_BY_LATEST_RATED
    }
}

export function sortByHighestRated() {
    return {
        type: SORT_SHOWS_BY_HIGHEST_RATED
    }
}

export function sortByLowestRated() {
    return {
        type: SORT_SHOWS_BY_LOWEST_RATED
    }
}

export function asyncRequestHighestRatedShows() {
    return (dispatch: Dispatch<ShowsAction>) => {
        dispatch(requestingHighestRatedShows());
        fetchHighestRatedShows()
            .then((movies) => {
                dispatch(receivedHighestRatedShows(movies))
            });
    }
}

export function asyncRequestMoreHighestRatedShows(page: number) {
    return (dispatch: Dispatch<ShowsAction>) => {
        dispatch(requestingHighestRatedShows());
        fetchHighestRatedShows(page)
            .then((shows) => {
                dispatch(receivedMoreHighestRatedShows(shows))
            });
    }
}

export function asyncRequestLowestRatedShows() {
    return (dispatch: Dispatch<ShowsAction>) => {
        dispatch(requestingLowestRatedShows());
        fetchLowestRatedShows()
            .then((shows) => {
                dispatch(receivedLowestRatedShows(shows))
            });
    }
}

export function asyncRequestMoreLowestRatedShows(page: number) {
    return (dispatch: Dispatch<ShowsAction>) => {
        dispatch(requestingLowestRatedShows());
        fetchLowestRatedShows(page)
            .then((shows) => {
                dispatch(receivedMoreLowestRatedShows(shows))
            });
    }
}

export function asyncRequestLatestRatedShows() {
    return (dispatch: Dispatch<ShowsAction>) => {
        dispatch(requestingLatestRatedShows());
        fetchLatestRatedShows()
            .then((shows) => {
                dispatch(receivedLatestRatedShows(shows));
            });
    }
}

export function asyncRequestMoreLatestRatedShows(page: number) {
    return (dispatch: Dispatch<ShowsAction>) => {
        dispatch(requestingLatestRatedShows());
        fetchLatestRatedShows(page)
            .then((shows) => {
                dispatch(receivedMoreLatestRatedShows(shows));
            });
    }
}

export function asyncRequestNowPlayingShows() {
    return (dispatch: Dispatch<ShowsAction>) => {
        dispatch(requestingNowPlayingShows());
        fetchNowPlayingShows()
            .then((shows) => {
                dispatch(receivedNowPlayingShows(shows));
            });
    }
}

export function asyncRequestMoreNowPlayingShows(page: number) {
    return (dispatch: Dispatch<ShowsAction>) => {
        dispatch(requestingNowPlayingShows());
        fetchNowPlayingShows(page)
            .then((shows) => {
                dispatch(receivedMoreNowPlayingShows(shows));
            });
    }
}

export function asyncRequestShowDetails(id: ShowId): any {
    return (dispatch: Dispatch<ShowsAction>) => {
        dispatch(requestingShowDetails());
        fetchShowDetails(id)
            .then((show) => {
                dispatch(receivedShowDetails(show))
            });
    }
}

export function asyncRequestUsersRatingForShow(id: ShowId) {
    return (dispatch: Dispatch<ShowsAction>, getState: Function) => {
        const state = getState();

        dispatch(requestingRatings());
        fetchUsersRatingForShow(state.auth.token, id)
            .then((ur) => {
                dispatch(receivedRatings([ur]));
            })
    }
}