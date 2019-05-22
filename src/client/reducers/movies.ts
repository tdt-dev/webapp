import {
    REQUESTING_NOW_PLAYING_MOVIES,
    RECEIVED_NOW_PLAYING_MOVIES,
    REQUESTING_LATEST_RATED_MOVIES,
    RECEIVED_LATEST_RATED_MOVIES,
    MoviesAction,
    REQUESTING_MOVIE_DETAILS,
    RECEIVED_MOVIE_DETAILS,
    RECEIVED_MOVIES,
    UPDATE_MOVIE_RATING,
    RECEIVED_HIGHEST_RATED_MOVIES,
    REQUESTING_HIGHEST_RATED_MOVIES,
    RECEIVED_LOWEST_RATED_MOVIES,
    REQUESTING_LOWEST_RATED_MOVIES,
    SORT_MOVIES_BY_LATEST,
    SORT_MOVIES_BY_LATEST_RATED,
    SORT_MOVIES_BY_HIGHEST_RATED,
    SORT_MOVIES_BY_LOWEST_RATED,
    RECEIVED_MORE_LATEST_RATED_MOVIES,
    RECEIVED_MORE_NOW_PLAYING_MOVIES,
    RECEIVED_MORE_HIGHEST_RATED_MOVIES,
    RECEIVED_MORE_LOWEST_RATED_MOVIES,
    INCREASE_MOVIE_REVIEWS_COUNTER,
    DECREASE_MOVIE_REVIEWS_COUNTER
} from "../actions/movies";
import { merge, reduce, concat, uniq } from 'lodash';
import {Ratings} from "../sections/HomeSectionContainer/HomeSection/RecentRatingsBlock/RecentRatingsComponent/RecentRatingsItemComponent/RatingComponent/index";

export type MovieId = number;

export const MOVIES_PER_PAGE = 20;

// TODO move to common module later.
export interface Movies {
    id: number;
    rating: Ratings;
    title: string;
    backdrop_image: ImageItem[];
    poster_image: ImageItem[];
    hasDetails?: boolean;
}

export interface ImageItem {
    res: string;
    path: string;
}

export interface Studio {
    id: number;
    name: string;
}

export interface Genre {
    id: number;
    name: string;
}

export interface Cast {
    character: string;
    credit_id: string;
    name: string;
    profile_path: ImageItem[];
}

export interface Crew {
    id?: string;
    credit_id: string;
    department: string;
    job: string;
    name: string;
    profile_path: ImageItem[];
}

export interface Movie {
    cast: Cast[];
    crew: Crew[];
    genres: Genre[];
    id: number;
    poster_image: ImageItem[];
    backdrop_image: ImageItem[];
    overview: string;
    rating: Ratings;
    ratings_counter: number;
    reviews_counter: number;
    release_date: string;
    revenue: number;
    studios: Studio[];
    title: string;
    hasDetails: boolean
}

export interface MoviesMap {
    [id: number]: Movies | Movie
}


export const LATEST = 'LATEST';
export const LATEST_RATED = 'LATEST_RATED';
export const HIGHEST_RATED = 'HIGHEST_RATED';
export const LOWEST_RATED = 'LOWEST_RATED';

export type SortingOrder = 'LATEST' | 'LATEST_RATED' | 'HIGHEST_RATED' | 'LOWEST_RATED';

export interface MoviesState {
    moviesById: MoviesMap;
    nowPlaying: MovieId[];
    requestingNowPlaying: Boolean;
    receivedNowPlaying: Boolean;
    latestRated: MovieId[];
    requestingLatestRated: Boolean;
    receivedLatestRated: Boolean;
    requestingMovieDetails: Boolean;
    receivedMovieDetails: Boolean;
    highestRated: MovieId[];
    requestingHighestRated: Boolean;
    receivedHighestRated: Boolean;
    lowestRated: MovieId[];
    requestingLowestRated: Boolean;
    receivedLowestRated: Boolean;
    moviesListSortingOrder: SortingOrder;
}

const defaultState: MoviesState = {
    moviesById: {},
    nowPlaying: [],
    latestRated: [],
    requestingLatestRated: false,
    requestingNowPlaying: false,
    requestingMovieDetails: false,
    receivedLatestRated: false,
    receivedNowPlaying: false,
    receivedMovieDetails: false,
    highestRated: [],
    requestingHighestRated: false,
    receivedHighestRated: false,
    lowestRated: [],
    requestingLowestRated: false,
    receivedLowestRated: false,
    moviesListSortingOrder: LATEST_RATED
};


interface NormalizedMovies {
    moviesById: MoviesMap;
    ids: MovieId[];
}

function normalizeMovies(movies: Movies[]): NormalizedMovies {
    return reduce(movies, (result, value) => {
                return {
                    moviesById: merge(result.moviesById, {[value.id]: value}),
                    ids: concat(result.ids, value.id)
                };
            },{
                moviesById: {},
                ids: []
            });
    }

export default function movies(state: MoviesState = defaultState, action: MoviesAction): MoviesState {
    switch (action.type) {
        case RECEIVED_MOVIES:
            const normalizedMovies = normalizeMovies(action.movies);

            return {
                ...state,
                moviesById: merge(state.moviesById, normalizedMovies.moviesById)
            };
        case RECEIVED_LATEST_RATED_MOVIES:
            const nLatestRatedMovies = normalizeMovies(action.movies);

            return {
                ...state,
                requestingLatestRated: false,
                receivedLatestRated: true,
                moviesById: merge(state.moviesById, nLatestRatedMovies.moviesById),
                latestRated: nLatestRatedMovies.ids
            };
        case RECEIVED_MORE_LATEST_RATED_MOVIES:
            const nMoreLatestRatedMovies = normalizeMovies(action.movies);

            return {
                ...state,
                requestingLatestRated: false,
                receivedLatestRated: true,
                moviesById: merge(state.moviesById, nMoreLatestRatedMovies.moviesById),
                latestRated: uniq([...state.latestRated, ...nMoreLatestRatedMovies.ids])
            };
        case REQUESTING_LATEST_RATED_MOVIES:
            return {
                ...state,
                requestingLatestRated: true,
                receivedLatestRated: false
            };
        case RECEIVED_NOW_PLAYING_MOVIES:
            const nNowPlayingMovies = normalizeMovies(action.movies);

            return {
                ...state,
                requestingNowPlaying: false,
                receivedNowPlaying: true,
                moviesById: merge(state.moviesById, nNowPlayingMovies.moviesById),
                nowPlaying: nNowPlayingMovies.ids
            };
        case RECEIVED_MORE_NOW_PLAYING_MOVIES:
            const nMoreNowPlayingMovies = normalizeMovies(action.movies);

            return {
                ...state,
                requestingNowPlaying: false,
                receivedNowPlaying: true,
                moviesById: merge(state.moviesById, nMoreNowPlayingMovies.moviesById),
                nowPlaying: uniq([...state.nowPlaying, ...nMoreNowPlayingMovies.ids])
            };
        case REQUESTING_NOW_PLAYING_MOVIES:
            return {
                ...state,
                requestingNowPlaying: true,
                receivedNowPlaying: false
            };
        case RECEIVED_HIGHEST_RATED_MOVIES:
            const nHighestRatedMovies = normalizeMovies(action.movies);

            return {
                ...state,
                requestingHighestRated: false,
                receivedHighestRated: true,
                moviesById: merge(state.moviesById, nHighestRatedMovies.moviesById),
                highestRated: nHighestRatedMovies.ids
            };
        case RECEIVED_MORE_HIGHEST_RATED_MOVIES:
            const nMoreHighestRatedMovies = normalizeMovies(action.movies);

            return {
                ...state,
                requestingHighestRated: false,
                receivedHighestRated: true,
                moviesById: merge(state.moviesById, nMoreHighestRatedMovies.moviesById),
                highestRated: uniq([...state.highestRated, ...nMoreHighestRatedMovies.ids])
            };
        case REQUESTING_HIGHEST_RATED_MOVIES:
            return {
                ...state,
                requestingHighestRated: true,
                receivedHighestRated: false
            };
        case RECEIVED_LOWEST_RATED_MOVIES:
            const nLowestRatedMovies = normalizeMovies(action.movies);

            return {
                ...state,
                requestingLowestRated: false,
                receivedLowestRated: true,
                moviesById: merge(state.moviesById, nLowestRatedMovies.moviesById),
                lowestRated: nLowestRatedMovies.ids
            };
        case RECEIVED_MORE_LOWEST_RATED_MOVIES:
            const nMoreLowestRatedMovies = normalizeMovies(action.movies);

            return {
                ...state,
                requestingLowestRated: false,
                receivedLowestRated: true,
                moviesById: merge(state.moviesById, nMoreLowestRatedMovies.moviesById),
                lowestRated: uniq([...state.lowestRated, ...nMoreLowestRatedMovies.ids])
            };
        case REQUESTING_LOWEST_RATED_MOVIES:
            return {
                ...state,
                requestingLowestRated: true,
                receivedLowestRated: false
            };
        case REQUESTING_MOVIE_DETAILS:
            return {
                ...state,
                requestingMovieDetails: true,
                receivedMovieDetails: false
            };
        case RECEIVED_MOVIE_DETAILS:
            return {
                ...state,
                requestingMovieDetails: false,
                receivedMovieDetails: true,
                moviesById: {...state.moviesById, [action.movie.id]: {...action.movie, hasDetails: true}}
            };
        case UPDATE_MOVIE_RATING:
            const currentMovieObject1: Movie = state.moviesById[action.movie.id] as Movie;

            return {
                ...state,
                moviesById: {
                    ...state.moviesById,
                    [action.movie.id]: {
                        ...currentMovieObject1,
                        ...action.movie,
                        ratings_counter: currentMovieObject1.ratings_counter + 1
                    }
                }
            };
        case INCREASE_MOVIE_REVIEWS_COUNTER:
            const currentMovieObject2: Movie = state.moviesById[action.movie.id] as Movie;

            return {
                ...state,
                moviesById: {
                    ...state.moviesById,
                    [action.movie.id]: {
                        ...currentMovieObject2,
                        reviews_counter: currentMovieObject2.reviews_counter + 1
                    }
                }
            };
        case DECREASE_MOVIE_REVIEWS_COUNTER:
            const currentMovieObject3: Movie = state.moviesById[action.movie.id] as Movie;

            return {
                ...state,
                moviesById: {
                    ...state.moviesById,
                    [action.movie.id]: {
                        ...currentMovieObject3,
                        reviews_counter: currentMovieObject3.reviews_counter - 1
                    }
                }
            };
        case SORT_MOVIES_BY_LATEST:
            return {
                ...state,
                moviesListSortingOrder: LATEST
            };
        case SORT_MOVIES_BY_LATEST_RATED:
            return {
                ...state,
                moviesListSortingOrder: LATEST_RATED
            };
        case SORT_MOVIES_BY_HIGHEST_RATED:
            return {
                ...state,
                moviesListSortingOrder: HIGHEST_RATED
            };
        case SORT_MOVIES_BY_LOWEST_RATED:
            return {
                ...state,
                moviesListSortingOrder: LOWEST_RATED
            };
        default:
            return state;
    }
}