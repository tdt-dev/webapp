import {Movie, MovieId, Movies} from "../reducers/movies";
import {Action, Dispatch} from "redux";
import {
    fetchHighestRatedMovies,
    fetchLatestRatedMovies, fetchLowestRatedMovies, fetchMovieDetails, fetchNowPlayingMovies,
    fetchUsersRatingForMovie
} from "../services/rest";
import {Ratings} from "../sections/HomeSectionContainer/HomeSection/RecentRatingsBlock/RecentRatingsComponent/RecentRatingsItemComponent/RatingComponent";
import {receivedRatings, requestingRatings} from "./ratings";

export const RECEIVED_LATEST_RATED_MOVIES = 'RECEIVED_LATEST_RATED_MOVIES';
export const REQUESTING_LATEST_RATED_MOVIES = 'REQUESTING_LATEST_RATED_MOVIES';
export const RECEIVED_MORE_LATEST_RATED_MOVIES = 'RECEIVED_MORE_LATEST_RATED_MOVIES';

export const RECEIVED_NOW_PLAYING_MOVIES = 'RECEIVED_NOW_PLAYING_MOVIES';
export const REQUESTING_NOW_PLAYING_MOVIES = 'REQUESTING_NOW_PLAYING_MOVIES';
export const RECEIVED_MORE_NOW_PLAYING_MOVIES = 'RECEIVED_MORE_NOW_PLAYING_MOVIES';

export const RECEIVED_HIGHEST_RATED_MOVIES = 'RECEIVED_HIGHEST_RATED_MOVIES';
export const REQUESTING_HIGHEST_RATED_MOVIES = 'REQUESTING_HIGHEST_RATED_MOVIES';
export const RECEIVED_MORE_HIGHEST_RATED_MOVIES = 'RECEIVED_MORE_HIGHEST_RATED_MOVIES';

export const RECEIVED_LOWEST_RATED_MOVIES = 'RECEIVED_LOWEST_RATED_MOVIES';
export const REQUESTING_LOWEST_RATED_MOVIES = 'REQUESTING_LOWEST_RATED_MOVIES';
export const RECEIVED_MORE_LOWEST_RATED_MOVIES = 'RECEIVED_MORE_LOWEST_RATED_MOVIES';

export const RECEIVED_MOVIE_DETAILS = 'RECEIVED_MOVIE_DETAILS';
export const REQUESTING_MOVIE_DETAILS = 'REQUESTING_MOVIE_DETAILS';
export const RECEIVED_MOVIES = 'RECEIVED_MOVIES';
export const UPDATE_MOVIE_RATING = 'UPDATE_MOVIES_RATING';

export const SORT_MOVIES_BY_LATEST = 'SORT_MOVIES_BY_LATEST';
export const SORT_MOVIES_BY_LATEST_RATED = 'SORT_MOVIES_BY_LATEST_RATED';
export const SORT_MOVIES_BY_HIGHEST_RATED = 'SORT_MOVIES_BY_HIGHEST_RATED';
export const SORT_MOVIES_BY_LOWEST_RATED = 'SORT_MOVIES_BY_LOWEST_RATED';

export const INCREASE_MOVIE_REVIEWS_COUNTER = 'INCREASE_MOVIE_REVIEWS_COUNTER';
export const DECREASE_MOVIE_REVIEWS_COUNTER = 'DECREASE_MOVIE_REVIEWS_COUNTER';

export interface MoviesAction extends Action {
    movies?: Movies[];
    movie?: Movie;
}

export function updateMovieRating(itemId: MovieId, usersRating: Ratings, globalRating: Ratings) {
   return {
       type: UPDATE_MOVIE_RATING,
       movie: {
           id: +itemId,
           rating: globalRating,
           usersRating
       }
   }
}

export function increaseMovieReviewsCounter(itemId: MovieId) {
    return {
        type: INCREASE_MOVIE_REVIEWS_COUNTER,
        movie: {
            id: +itemId
        }
    }
}

export function decreaseMovieReviewsCounter(itemId: MovieId) {
    return {
        type: DECREASE_MOVIE_REVIEWS_COUNTER,
        movie: {
            id: +itemId
        }
    }
}

export function receivedMovies(movies: Movies[]) {
    return {
        type: RECEIVED_MOVIES,
        movies
    }
}

function receivedLatestRatedMovies(movies: Movies[]) {
    return {
        type: RECEIVED_LATEST_RATED_MOVIES,
        movies
    }
}

function receivedMoreLatestRatedMovies(movies: Movies[]) {
    return {
        type: RECEIVED_MORE_LATEST_RATED_MOVIES,
        movies
    }
}

function requestingLatestRatedMovies() {
    return {
        type: REQUESTING_LATEST_RATED_MOVIES
    }
}

function receivedNowPlayingMovies(movies: Movies[]) {
    return {
        type: RECEIVED_NOW_PLAYING_MOVIES,
        movies
    }
}

function receivedMoreNowPlayingMovies(movies: Movies[]) {
    return {
        type: RECEIVED_MORE_NOW_PLAYING_MOVIES,
        movies
    }
}

function requestingNowPlayingMovies() {
    return {
        type: REQUESTING_NOW_PLAYING_MOVIES
    }
}

function receivedHighestRatedMovies(movies: Movies[]) {
    return {
        type: RECEIVED_HIGHEST_RATED_MOVIES,
        movies
    }
}

function receivedMoreHighestRatedMovies(movies: Movies[]) {
    return {
        type: RECEIVED_MORE_HIGHEST_RATED_MOVIES,
        movies
    }
}

function requestingHighestRatedMovies() {
    return {
        type: REQUESTING_HIGHEST_RATED_MOVIES
    }
}

function receivedLowestRatedMovies(movies: Movies[]) {
    return {
        type: RECEIVED_LOWEST_RATED_MOVIES,
        movies
    }
}

function receivedMoreLowestRatedMovies(movies: Movies[]) {
    return {
        type: RECEIVED_MORE_LOWEST_RATED_MOVIES,
        movies
    }
}

function requestingLowestRatedMovies() {
    return {
        type: REQUESTING_LOWEST_RATED_MOVIES
    }
}

function receivedMovieDetails(movie: Movie) {
    return {
        type: RECEIVED_MOVIE_DETAILS,
        movie
    }
}

function requestingMovieDetails() {
    return {
        type: REQUESTING_MOVIE_DETAILS
    }
}

export function sortByLatest() {
    return {
        type: SORT_MOVIES_BY_LATEST
    }
}

export function sortByLatestRated() {
    return {
        type: SORT_MOVIES_BY_LATEST_RATED
    }
}

export function sortByHighestRated() {
    return {
        type: SORT_MOVIES_BY_HIGHEST_RATED
    }
}

export function sortByLowestRated() {
    return {
        type: SORT_MOVIES_BY_LOWEST_RATED
    }
}

export function asyncRequestNowPlayingMovies() {
    return (dispatch: Dispatch<MoviesAction>) => {
        dispatch(requestingNowPlayingMovies());
        fetchNowPlayingMovies()
            .then((movies) => {
                dispatch(receivedNowPlayingMovies(movies));
            });
    };
}

export function asyncRequestMoreNowPlayingMovies(page: number) {
    return (dispatch: Dispatch<MoviesAction>) => {
        dispatch(requestingNowPlayingMovies());
        fetchNowPlayingMovies(page)
            .then((movies) => {
                dispatch(receivedMoreNowPlayingMovies(movies));
            });
    };
}

export function asyncRequestLatestRatedMovies() {
    return (dispatch: Dispatch<MoviesAction>) => {
        dispatch(requestingLatestRatedMovies());
        fetchLatestRatedMovies()
            .then((movies) => {
                dispatch(receivedLatestRatedMovies(movies));
            });
    };
}

export function asyncRequestMoreLatestRatedMovies(page: number) {
    return (dispatch: Dispatch<MoviesAction>) => {
        dispatch(requestingLatestRatedMovies());
        fetchLatestRatedMovies(page)
            .then((movies) => {
                dispatch(receivedMoreLatestRatedMovies(movies));
            });
    };
}


export function asyncRequestHighestRatedMovies() {
    return (dispatch: Dispatch<MoviesAction>) => {
        dispatch(requestingHighestRatedMovies());
        fetchHighestRatedMovies()
            .then((movies) => {
               dispatch(receivedHighestRatedMovies(movies))
            });
    }
}

export function asyncRequestMoreHighestRatedMovies(page: number) {
    return (dispatch: Dispatch<MoviesAction>) => {
        dispatch(requestingHighestRatedMovies());
        fetchHighestRatedMovies(page)
            .then((movies) => {
                dispatch(receivedMoreHighestRatedMovies(movies))
            });
    }
}


export function asyncRequestLowestRatedMovies() {
    return (dispatch: Dispatch<MoviesAction>) => {
        dispatch(requestingLowestRatedMovies());
        fetchLowestRatedMovies()
            .then((movies) => {
                dispatch(receivedLowestRatedMovies(movies))
            });
    }
}

export function asyncRequestMoreLowestRatedMovies(page: number) {
    return (dispatch: Dispatch<MoviesAction>) => {
        dispatch(requestingLowestRatedMovies());
        fetchLowestRatedMovies(page)
            .then((movies) => {
                dispatch(receivedMoreLowestRatedMovies(movies))
            });
    }
}

export function asyncRequestMovieDetails(id: MovieId): any {
    return (dispatch: Dispatch<MoviesAction>) => {
        dispatch(requestingMovieDetails());
        fetchMovieDetails(id)
            .then((movie) => {
                dispatch(receivedMovieDetails(movie))
            });
    }
}

export function asyncRequestUsersRatingForMovie(id: MovieId) {
    return (dispatch: Dispatch<MoviesAction>, getState: Function) => {
        const state = getState();

        dispatch(requestingRatings());
        fetchUsersRatingForMovie(state.auth.token, id)
            .then((ur) => {
                dispatch(receivedRatings([ur]));
            })
    }
}