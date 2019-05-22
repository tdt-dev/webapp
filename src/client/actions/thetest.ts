import {Action} from "redux";
import {MovieId} from "../reducers/movies";
import {ShowId} from "../reducers/shows";
import {Answer, Question} from "../reducers/thetest";
import {Dispatch} from "react-redux";
import {
    deleteMovieReview, deleteShowReview,
    fetchMovieAnswers, fetchQuestions, fetchShowAnswers, sendMovieAnswer, sendMovieReview,
    sendShowAnswer, sendShowReview
} from "../services/rest";
import {decreaseMovieReviewsCounter, increaseMovieReviewsCounter, updateMovieRating} from "./movies";
import {decreaseShowReviewsCounter, increaseShowReviewsCounter, updateShowRating} from "./shows";
import {signOutAndClearSessionStorage} from "./auth";
import {deleteReview} from "./ratings";
import * as jwtDecode from "jwt-decode";

export const REQUESTING_QUESTIONS = 'REQUESTING_QUESTIONS';
export const RECEIVED_QUESTIONS = 'RECEIVED_QUESTIONS';

export const REQUESTING_ANSWERS = 'REQUESTING_ANSWERS';
export const RECEIVED_MOVIE_ANSWERS = 'RECEIVED_MOVIE_ANSWERS';
export const RECEIVED_SHOW_ANSWERS = 'RECEIVED_SHOW_ANSWERS';

export const SELECT_ANSWER = 'SELECT_ANSWER';

export const NEXT_MOVIE_QUESTION = 'NEXT_MOVIE_QUESTION';
export const PREVIOUS_MOVIE_QUESTION = 'PREVIOUS_MOVIE_QUESTION';
export const NEXT_SHOW_QUESTION = 'NEXT_SHOW_QUESTION';
export const PREVIOUS_SHOW_QUESTION = 'PREVIOUS_SHOW_QUESTION';

export type AnswersType = 'movie' | 'show';
export type ItemId = MovieId | ShowId;

export interface TheTestAction extends Action {
    itemId?: ItemId;
    activeAnswer?: number;
    questions?: Question[];
    answers?: Answer[];
    review?: string;
}

function requestingQuestions(): TheTestAction {
    return {
        type: REQUESTING_QUESTIONS
    }
}

function receivedQuestions(questions: Question[]): TheTestAction {
    return {
        type: RECEIVED_QUESTIONS,
        questions
    }
}

function requestingAnswers(): TheTestAction {
    return {
        type: REQUESTING_ANSWERS
    }
}

function receivedMovieAnswers(itemId: ItemId, answers: Answer[]): TheTestAction {
    return {
        type: RECEIVED_MOVIE_ANSWERS,
        itemId,
        answers
    }
}

function receivedShowAnswers(itemId: ItemId, answers: Answer[]): TheTestAction {
    return {
        type: RECEIVED_SHOW_ANSWERS,
        itemId,
        answers
    }
}

export function selectAnswer(activeAnswer: number): TheTestAction {
    return {
        type: SELECT_ANSWER,
        activeAnswer
    }
}

export function nextMovieQuestion(itemId: ItemId): TheTestAction {
    return {
        type: NEXT_MOVIE_QUESTION,
        itemId
    }
}

export function previousMovieQuestion(itemId: ItemId): TheTestAction {
    return {
        type: PREVIOUS_MOVIE_QUESTION,
        itemId
    }
}

export function nextShowQuestion(itemId: ItemId): TheTestAction {
    return {
        type: NEXT_SHOW_QUESTION,
        itemId
    }
}

export function previousShowQuestion(itemId: ItemId): TheTestAction {
    return {
        type: PREVIOUS_SHOW_QUESTION,
        itemId
    }
}

export function asyncRequestQuestions() {
    return (dispatch: Dispatch<TheTestAction>, getState: Function) => {
        const { token } = getState().auth;

        dispatch(requestingQuestions());
        fetchQuestions(token)
            .then((questions) => dispatch(receivedQuestions(questions)))
            .catch((e) => {
                (e.response && e.response.status === 401) && dispatch(signOutAndClearSessionStorage());
            });
    }
}

export function asyncRequestMovieAnswers(id: ItemId) {
    return (dispatch: Dispatch<TheTestAction>, getState: Function) => {
        const { token } = getState().auth;

        dispatch(requestingAnswers());
        fetchMovieAnswers(token, id)
            .then((answers) => dispatch(receivedMovieAnswers(id, answers)))
            .catch((e) => {
                (e.response && e.response.status === 401) && dispatch(signOutAndClearSessionStorage());
            });
    }
}

export function asyncRequestShowAnswers(id: ItemId) {
    return (dispatch: Dispatch<TheTestAction>, getState: Function) => {
        const { token } = getState().auth;

        dispatch(requestingAnswers());
        fetchShowAnswers(token, id)
            .then((answers) => dispatch(receivedShowAnswers(id, answers)))
            .catch((e) => {
                (e.response && e.response.status === 401) && dispatch(signOutAndClearSessionStorage());
            });
    }
}

export function asyncSendAnswer(type: AnswersType, itemId: ItemId, questionId: string, answer: number, recaptchaToken?: string) {
    return (dispatch: Dispatch<TheTestAction>, getState: Function) => {
        const state = getState();

        if ( type === 'movie' ) {
            sendMovieAnswer(state.auth.token, recaptchaToken, itemId, questionId, answer)
                .then((r) => {
                    if (r.data.usersRating && r.data.globalRating) {
                        dispatch(updateMovieRating(itemId, r.data.usersRating, r.data.globalRating));
                    }
                })
                .catch((e) => {
                    (e.response && e.response.status === 401) && dispatch(signOutAndClearSessionStorage());
                });
        } else {
            sendShowAnswer(state.auth.token, recaptchaToken, itemId, questionId, answer)
                .then((r) => {
                    if (r.data.usersRating && r.data.globalRating) {
                        dispatch(updateShowRating(itemId, r.data.usersRating, r.data.globalRating));
                    }
                })
                .catch((e) => {
                    (e.response && e.response.status === 401) && dispatch(signOutAndClearSessionStorage());
                });
        }
    }
}

export function asyncSendReview(type: AnswersType, itemId: ItemId, review: string, recaptchaToken: string) {
    return (dispatch: Dispatch<TheTestAction>, getState: Function) => {
        const state = getState();

        if ( type === 'movie' ) {
            dispatch(increaseMovieReviewsCounter(itemId));

            sendMovieReview(state.auth.token, recaptchaToken, itemId, review)
                .catch((e) => {
                    (e.response && e.response.status === 401) && dispatch(signOutAndClearSessionStorage());
                });
        } else {
            dispatch(increaseShowReviewsCounter(itemId));
            sendShowReview(state.auth.token, recaptchaToken, itemId, review)
                .catch((e) => {
                    (e.response && e.response.status === 401) && dispatch(signOutAndClearSessionStorage());
                });
        }
    }
}

export function asyncDeleteReview(type: AnswersType, itemId: ItemId) {
    return (dispatch: Dispatch<TheTestAction>, getState: Function) => {
        const state = getState();
        const currentUserId = state.auth.isAuthenticated ? jwtDecode<any>(state.auth.token).sub : null;

        if ( type === 'movie' ) {
            dispatch(decreaseMovieReviewsCounter(itemId));
            dispatch(deleteReview('m' + itemId, currentUserId));

            deleteMovieReview(state.auth.token, itemId)
                .catch((e) => {
                    (e.response && e.response.status === 401) && dispatch(signOutAndClearSessionStorage());
                });
        } else {
            dispatch(decreaseShowReviewsCounter(itemId));
            dispatch(deleteReview('s' + itemId, currentUserId));

            deleteShowReview(state.auth.token, itemId)
                .catch((e) => {
                    (e.response && e.response.status === 401) && dispatch(signOutAndClearSessionStorage());
                });
        }
    }
}