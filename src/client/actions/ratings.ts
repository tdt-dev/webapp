import {Action, Dispatch} from "redux";
import {MovieId} from "../reducers/movies";
import {ShowId} from "../reducers/shows";
import {fetchAllRatingsForMovie, fetchAllRatingsForShow} from "../services/rest";
import {Rating} from "../reducers/ratings";

export const RECEIVED_RATINGS = "RECEIVED_RATINGS";
export const REQUESTING_RATINGS = "REQUESTING_RATINGS";
export const DELETE_REVIEW = "DELETE_REVIEW";

export interface RatingsAction extends Action {
    ratings?: Rating[];
    itemIdToDeleteRating?: string;
    userIdToDeleteRating?: string;
}

export function receivedRatings(ratings: Rating[]) {
    return {
        type: RECEIVED_RATINGS,
        ratings,
    }
}

export function requestingRatings() {
    return {
        type: REQUESTING_RATINGS
    }
}

export function deleteReview(itemId: string, userId: string){
    return {
        type: DELETE_REVIEW,
        itemIdToDeleteRating: itemId,
        userIdToDeleteRating: userId
    }
}

export function asyncRequestMovieRatings(movieId: MovieId) {
    return (dispatch: Dispatch<RatingsAction>, getState: Function) => {
        const state = getState();

        dispatch(requestingRatings());
        fetchAllRatingsForMovie(state.auth.token, movieId)
            .then((ratings) => {
                dispatch(receivedRatings(ratings))
            });
    }
}

export function asyncRequestShowRatings(showId: ShowId) {
    return (dispatch: Dispatch<RatingsAction>) => {
        dispatch(requestingRatings());
        fetchAllRatingsForShow(showId)
            .then((ratings) => {
               dispatch(receivedRatings(ratings))
            });
    }
}