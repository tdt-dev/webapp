import { merge, reduce, concat, uniq } from 'lodash';
import {
    Cast, Crew, Genre, HIGHEST_RATED, ImageItem, LATEST, LATEST_RATED, LOWEST_RATED, SortingOrder,
    Studio
} from "./movies";
import {
    RECEIVED_LATEST_RATED_SHOWS, ShowsAction, REQUESTING_LATEST_RATED_SHOWS,
    RECEIVED_NOW_PLAYING_SHOWS, REQUESTING_NOW_PLAYING_SHOWS, RECEIVED_SHOW_DETAILS, REQUESTING_SHOW_DETAILS,
    RECEIVED_SHOWS, UPDATE_SHOW_RATING, SORT_SHOWS_BY_LATEST, SORT_SHOWS_BY_LATEST_RATED, SORT_SHOWS_BY_HIGHEST_RATED,
    SORT_SHOWS_BY_LOWEST_RATED, REQUESTING_LOWEST_RATED_SHOWS, RECEIVED_LOWEST_RATED_SHOWS,
    REQUESTING_HIGHEST_RATED_SHOWS, RECEIVED_HIGHEST_RATED_SHOWS, RECEIVED_MORE_LATEST_RATED_SHOWS,
    RECEIVED_MORE_NOW_PLAYING_SHOWS, RECEIVED_MORE_HIGHEST_RATED_SHOWS, RECEIVED_MORE_LOWEST_RATED_SHOWS,
    INCREASE_SHOW_REVIEWS_COUNTER, DECREASE_SHOW_REVIEWS_COUNTER
} from "../actions/shows";
import {Ratings} from "../sections/HomeSectionContainer/HomeSection/RecentRatingsBlock/RecentRatingsComponent/RecentRatingsItemComponent/RatingComponent/index";

export type ShowId = number;

export const SHOWS_PER_PAGE = 20;

// TODO move to common module later.
export interface Shows {
    id: number;
    rating: Ratings;
    name: string;
    backdrop_image: ImageItem[];
    poster_image: ImageItem[];
    hasDetails?: boolean;
}

export interface Show {
    backdrop_image: ImageItem[] | null;
    cast: Cast[];
    crew: Crew[];
    first_air_date: string;
    genres: Genre[];
    rating: Ratings;
    ratings_counter: number;
    reviews_counter: number;
    id: number;
    name: string;
    overview: string;
    poster_image: ImageItem[] | null;
    production_companies: Studio[];
    hasDetails: boolean;
}

export interface ShowsMap {
    [id: number]: Shows | Show
}

export interface ShowsState {
    showsById: ShowsMap;
    nowPlaying: ShowId[];
    requestingNowPlaying: Boolean;
    receivedNowPlaying: Boolean;
    latestRated: ShowId[];
    requestingLatestRated: Boolean;
    receivedLatestRated: Boolean;
    requestingShowDetails: Boolean;
    receivedShowDetails: Boolean;
    highestRated: ShowId[];
    requestingHighestRated: Boolean;
    receivedHighestRated: Boolean;
    lowestRated: ShowId[];
    requestingLowestRated: Boolean;
    receivedLowestRated: Boolean;
    showsListSortingOrder: SortingOrder;
}

const defaultState: ShowsState = {
    showsById: {},
    nowPlaying: [],
    latestRated: [],
    requestingLatestRated: false,
    requestingNowPlaying: false,
    requestingShowDetails: false,
    receivedLatestRated: false,
    receivedNowPlaying: false,
    receivedShowDetails: false,
    highestRated: [],
    requestingHighestRated: false,
    receivedHighestRated: false,
    lowestRated: [],
    requestingLowestRated: false,
    receivedLowestRated: false,
    showsListSortingOrder: LATEST_RATED
};


interface NormalizedShows {
    showsById: ShowsMap;
    ids: ShowId[];
}

function normalizeShows(shows: Shows[]): NormalizedShows {
    return reduce(shows, (result, value) => {
        return {
            showsById: merge(result.showsById, {[value.id]: value}),
            ids: concat(result.ids, value.id)
        };
    },{
        showsById: {},
        ids: []
    });
}

export default function shows(state: ShowsState = defaultState, action: ShowsAction): ShowsState {
    switch (action.type) {
        case RECEIVED_SHOWS:
            const normalizedShows = normalizeShows(action.shows);

            return {
                ...state,
                showsById: merge(state.showsById, normalizedShows.showsById)
            };
        case RECEIVED_LATEST_RATED_SHOWS:
            const nLatestRatedShows = normalizeShows(action.shows);

            return {
                ...state,
                requestingLatestRated: false,
                receivedLatestRated: true,
                showsById: merge(state.showsById, nLatestRatedShows.showsById),
                latestRated: nLatestRatedShows.ids
            };
        case RECEIVED_MORE_LATEST_RATED_SHOWS:
            const nMoreLatestRatedShows = normalizeShows(action.shows);

            return {
                ...state,
                requestingLatestRated: false,
                receivedLatestRated: true,
                showsById: merge(state.showsById, nMoreLatestRatedShows.showsById),
                latestRated: uniq([...state.latestRated, ...nMoreLatestRatedShows.ids])
            };
        case REQUESTING_LATEST_RATED_SHOWS:
            return {
                ...state,
                requestingLatestRated: true,
                receivedLatestRated: false
            };
        case RECEIVED_NOW_PLAYING_SHOWS:
            const nNowPlayingShows = normalizeShows(action.shows);

            return {
                ...state,
                requestingNowPlaying: false,
                receivedNowPlaying: true,
                showsById: merge(state.showsById, nNowPlayingShows.showsById),
                nowPlaying: nNowPlayingShows.ids
            };
        case RECEIVED_MORE_NOW_PLAYING_SHOWS:
            const nMoreNowPlayingShows = normalizeShows(action.shows);

            return {
                ...state,
                requestingNowPlaying: false,
                receivedNowPlaying: true,
                showsById: merge(state.showsById, nMoreNowPlayingShows.showsById),
                nowPlaying: uniq([...state.nowPlaying, ...nMoreNowPlayingShows.ids])
            };
        case REQUESTING_NOW_PLAYING_SHOWS:
            return {
                ...state,
                requestingNowPlaying: true,
                receivedNowPlaying: false
            };
        case RECEIVED_HIGHEST_RATED_SHOWS:
            const nHighestRatedShows = normalizeShows(action.shows);

            return {
                ...state,
                requestingHighestRated: false,
                receivedHighestRated: true,
                showsById: merge(state.showsById, nHighestRatedShows.showsById),
                highestRated: nHighestRatedShows.ids
            };
        case RECEIVED_MORE_HIGHEST_RATED_SHOWS:
            const nMoreHighestRatedShows = normalizeShows(action.shows);

            return {
                ...state,
                requestingHighestRated: false,
                receivedHighestRated: true,
                showsById: merge(state.showsById, nMoreHighestRatedShows.showsById),
                highestRated: uniq([...state.highestRated, ...nMoreHighestRatedShows.ids])
            };
        case REQUESTING_HIGHEST_RATED_SHOWS:
            return {
                ...state,
                requestingHighestRated: true,
                receivedHighestRated: false
            };
        case RECEIVED_LOWEST_RATED_SHOWS:
            const nLowestRatedShows = normalizeShows(action.shows);

            return {
                ...state,
                requestingLowestRated: false,
                receivedLowestRated: true,
                showsById: merge(state.showsById, nLowestRatedShows.showsById),
                lowestRated: nLowestRatedShows.ids
            };
        case RECEIVED_MORE_LOWEST_RATED_SHOWS:
            const nMoreLowestRatedShows = normalizeShows(action.shows);

            return {
                ...state,
                requestingLowestRated: false,
                receivedLowestRated: true,
                showsById: merge(state.showsById, nMoreLowestRatedShows.showsById),
                lowestRated: uniq([...state.lowestRated, ...nMoreLowestRatedShows.ids])
            };
        case REQUESTING_LOWEST_RATED_SHOWS:
            return {
                ...state,
                requestingLowestRated: true,
                receivedLowestRated: false
            };
        case REQUESTING_SHOW_DETAILS:
            return {
                ...state,
                requestingShowDetails: true,
                receivedShowDetails: false
            };
        case RECEIVED_SHOW_DETAILS:
            return {
                ...state,
                requestingShowDetails: false,
                receivedShowDetails: true,
                showsById: {...state.showsById, [action.show.id]: {...action.show, hasDetails: true}}
            };
        case UPDATE_SHOW_RATING:
            const currentShowObject1: Show = state.showsById[action.show.id] as Show;

            return {
                ...state,
                showsById: {
                    ...state.showsById,
                    [action.show.id]: {
                        ...currentShowObject1,
                        ...action.show,
                        ratings_counter: currentShowObject1.ratings_counter + 1
                    }
                }
            };
        case INCREASE_SHOW_REVIEWS_COUNTER:
            const currentShowObject2: Show = state.showsById[action.show.id] as Show;

            return {
                ...state,
                showsById: {
                    ...state.showsById,
                    [action.show.id]: {
                        ...currentShowObject2,
                        reviews_counter: currentShowObject2.reviews_counter + 1
                    }
                }
            };
        case DECREASE_SHOW_REVIEWS_COUNTER:
            const currentShowObject3: Show = state.showsById[action.show.id] as Show;

            return {
                ...state,
                showsById: {
                    ...state.showsById,
                    [action.show.id]: {
                        ...currentShowObject3,
                        reviews_counter: currentShowObject3.reviews_counter - 1
                    }
                }
            };
        case SORT_SHOWS_BY_LATEST:
            return {
                ...state,
                showsListSortingOrder: LATEST
            };
        case SORT_SHOWS_BY_LATEST_RATED:
            return {
                ...state,
                showsListSortingOrder: LATEST_RATED
            };
        case SORT_SHOWS_BY_HIGHEST_RATED:
            return {
                ...state,
                showsListSortingOrder: HIGHEST_RATED
            };
        case SORT_SHOWS_BY_LOWEST_RATED:
            return {
                ...state,
                showsListSortingOrder: LOWEST_RATED
            };
        default:
            return state;
    }
}