import DetailsSection from "./DetailsSection/index";
import {connect, MapDispatchToProps, MapStateToProps} from "react-redux";
import {Cast, Crew, Genre, Studio} from "../../reducers/movies";
import {asyncRequestShowDetails, asyncRequestUsersRatingForShow} from "../../actions/shows";
import {asyncRequestMovieDetails, asyncRequestUsersRatingForMovie} from "../../actions/movies";
import {
    applySessionFromStorage,
    asyncFacebookLogin, asyncGoogleLogin, asyncSaveSessionToLocalStorage,
    signOutAndClearSessionStorage
} from "../../actions/auth";

import { map, size, assign } from "lodash";
import {
    asyncRequestMovieAnswers, asyncRequestQuestions, asyncRequestShowAnswers, nextMovieQuestion, nextShowQuestion,
    previousMovieQuestion,
    previousShowQuestion, selectAnswer, asyncSendAnswer, AnswersType, asyncSendReview
} from "../../actions/thetest";
import {push} from "react-router-redux";
import {buildExtendedId} from "../ReviewsSectionContainer";
import {Rating} from "../../reducers/ratings";
import * as jwtDecode from "jwt-decode";
import {receivedRatings} from "../../actions/ratings";

declare global {
    interface Window {
        gapi: any;
        FB: any;
    }
}

interface DetailsSectionContainerProps {
    match: {
        params: {
            type: AnswersType;
            id: number;
        }
    };
    location: {
        pathname: string;
    }
}

const isMovie = (props: DetailsSectionContainerProps) => props.match.params.type === 'movie';

const mapStateToProps: MapStateToProps<{}, DetailsSectionContainerProps, any> = (state: any, ownProps: DetailsSectionContainerProps) => {
    const id = ownProps.match.params.id;
    const source = isMovie(ownProps) ? state.movies.moviesById[id] : state.shows.showsById[id];

    // TODO replace Any to JWT interface
    const userId = state.auth.isAuthenticated ? jwtDecode<any>(state.auth.token).sub : null;

    const extendedId = buildExtendedId(isMovie(ownProps), id);
    const rating: Rating =
        state.auth.isAuthenticated && state.ratings.itemsByExtendedItemId[extendedId]
            ? state.ratings.itemsByExtendedItemId[extendedId][userId]
            : null;

    const itemDetails = source ? {
        posterImage: source.poster_image,
        backdropImage: source.backdrop_image[0].path,
        title: isMovie(ownProps) ? source.title : source.name,
        releaseDate: isMovie(ownProps) ? source.release_date : source.first_air_date,
        genres: map(source.genres,(v: Genre) => v.name),
        studios: map(isMovie(ownProps) ? source.studios : source.production_companies,(v: Studio) => v.name),
        boxOffice: isMovie(ownProps) ? source.revenue : null,
        rating: source.rating,
        ratingsCounter: source.ratings_counter,
        reviewsCounter: source.reviews_counter,
        cast: map(source.cast,(v: Cast) => ({photo: v.profile_path, fullName: v.name, id: v.credit_id})),
        crew: map(source.crew,(v: Crew) => (
                {
                    photo: v.profile_path,
                    fullName: v.name,
                    id: v.credit_id || v.id,
                    job: v.job,
                    department: v.department
                }
            )
        ),
        hasDetails: source.hasDetails,
        usersRating: rating && rating.usersRating ? rating.usersRating : source.usersRating,
        didUserLeftComment: rating ? !!rating.review : true,
        ratingObject: rating
    } : {
        posterImage: '',
        backdropImage: '',
        title: '',
        releaseDate: '',
        genres: '',
        studios: '',
        boxOffice: 0,
        rating: '',
        ratingsCounter: 0,
        reviewsCounter: 0,
        cast: [{id: 0, photo: '', fullName: ''}],
        crew: [{id: 0, photo: '', fullName: ''}],
        hasDetails: false
    };

    const sourceAnswers = isMovie(ownProps) ? state.thetest.movieAnswers[id] : state.thetest.showAnswers[id];

    const theTestParams = {
        isUserAuthenticated: state.auth.isAuthenticated,
        isAuthenticatedByGoogle: state.auth.isAuthenticatedByGoogle,
        isTestFinished: sourceAnswers && size(sourceAnswers) === size(state.thetest.questions),
        totalQuestions: size(state.thetest.questions),
        currentQuestion: state.thetest.activeQuestion,
        selectedAnswer: state.thetest.activeAnswer,
        isBackButtonDisabled: state.thetest.activeQuestion === 0,
        isNextButtonDisabled: state.thetest.activeAnswer === null,
        ...state.thetest.questions[state.thetest.activeQuestion],
    };

    return {
        ...itemDetails,
        ...theTestParams,
        isMobile: state.browser.lessThan.large,
        type: isMovie(ownProps) ? 'Movies' : 'Shows',
        id: id
    }
};

const mapDispatchToProps: MapDispatchToProps<{}, DetailsSectionContainerProps> = (dispatch, ownProps) => {
    const itemId = ownProps.match.params.id;

    const initSecured = () => {
        isMovie(ownProps)
            ? dispatch(asyncRequestMovieAnswers(itemId))
            : dispatch(asyncRequestShowAnswers(itemId));

        dispatch(asyncRequestQuestions());
    };

    const saveSession = () => {
        dispatch(asyncSaveSessionToLocalStorage());
    };

    return {
        init: (isUserAuthenticated: boolean, hasDetails: boolean ) => {
            dispatch(selectAnswer(null));

            if(!hasDetails) {
                isMovie(ownProps)
                    ? dispatch(asyncRequestMovieDetails(itemId))
                    : dispatch(asyncRequestShowDetails(itemId));
            }

            if (isUserAuthenticated) {
                initSecured();
            }
        },
        applySessionFromStorage: () => {
            if (dispatch(applySessionFromStorage())) {
                initSecured();
            }
        },
        initFinalStep: (isUserAuthenticated: boolean) => {
            if (isUserAuthenticated) {
                isMovie(ownProps)
                    ? dispatch(asyncRequestUsersRatingForMovie(itemId))
                    : dispatch(asyncRequestUsersRatingForShow(itemId));
            }
        },
        loginFacebook: (facebookToken: string, name: string, email: string, userId: string) =>
            dispatch(asyncFacebookLogin(facebookToken, name, email, userId))
                .then(initSecured)
                .then(saveSession),
        loginGoogle: (googleToken: string, name: string) =>
            dispatch(asyncGoogleLogin(googleToken, name))
                .then(initSecured)
                .then(saveSession),
        backButtonHandler: () => {
            isMovie(ownProps)
                ? dispatch(previousMovieQuestion(itemId))
                : dispatch(previousShowQuestion(itemId))
        },
        nextButtonHandler: (questionId: string, answer: number, recaptchaToken?: string) => {
            isMovie(ownProps)
                ? dispatch(nextMovieQuestion(itemId))
                : dispatch(nextShowQuestion(itemId));
            dispatch(asyncSendAnswer(ownProps.match.params.type, itemId, questionId, answer, recaptchaToken));
        },
        answerHandler: (answerId: number) => dispatch(selectAnswer(answerId)),
        sendReviewAndOpenReviewsPage: (review: string, rating: Rating, recaptchaToken: string) => {
            const updatedRating = assign({}, rating, { review });
            dispatch(receivedRatings([updatedRating]));
            dispatch(asyncSendReview(ownProps.match.params.type, itemId, review, recaptchaToken));
            dispatch(push(`/details/${ownProps.match.params.type}/${itemId}/reviews/`));
        },
        signOutHandler: (isAuthenticatedByGoogle: boolean) => {
            if(isAuthenticatedByGoogle) {
                let auth2 = window.gapi.auth2.getAuthInstance();
                auth2.disconnect();
                auth2.signOut().then(function () {
                    dispatch(signOutAndClearSessionStorage());
                });
            } else {
                window.FB.logout();
                dispatch(signOutAndClearSessionStorage());
            }
        }
    };
};

const DetailsSectionContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(DetailsSection);

export default DetailsSectionContainer;