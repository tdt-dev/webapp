import {connect, MapDispatchToProps, MapStateToProps} from "react-redux";
import {map, values, filter} from "lodash";
import {AnswersType, asyncDeleteReview, ItemId} from "../../actions/thetest";
import {Cast, Crew, Genre, Studio} from "../../reducers/movies";
import ReviewsSection from "./ReviewsSection";
import {asyncRequestMovieDetails} from "../../actions/movies";
import {asyncRequestShowDetails} from "../../actions/shows";
import {asyncRequestMovieRatings, asyncRequestShowRatings} from "../../actions/ratings";
import * as jwtDecode from "jwt-decode";
import {Rating} from "../../reducers/ratings";
import {applySessionFromStorage} from "../../actions/auth";

interface ReviewsSectionContainerProps {
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

const isMovie = (props: ReviewsSectionContainerProps) => props.match.params.type === 'movie';

export const buildExtendedId = (isMovie: Boolean, id: number) => {
    return isMovie ? `m${id}` : `s${id}`;
};

const mapStateToProps: MapStateToProps<{}, ReviewsSectionContainerProps, any> = (state: any, ownProps: ReviewsSectionContainerProps) => {
    const id = ownProps.match.params.id;
    const source = isMovie(ownProps) ? state.movies.moviesById[id] : state.shows.showsById[id];

    // TODO replace Any to JWT interface
    const currentUserId = state.auth.isAuthenticated ? jwtDecode<any>(state.auth.token).sub : null;

    const itemDetails = source ? {
        posterImage: source.poster_image,
        backdropImage: source.backdrop_image,
        title: isMovie(ownProps) ? source.title : source.name,
        releaseDate: isMovie(ownProps) ? source.release_date : source.first_air_date,
        genres: map(source.genres,(v: Genre) => v.name),
        studios: map(isMovie(ownProps) ? source.studios : source.production_companies,(v: Studio) => v.name),
        boxOffice: isMovie(ownProps) ? source.revenue : null,
        rating: source.rating,
        ratingsCounter: source.ratings_counter,
        reviewsCounter: source.reviews_counter,
        cast: map(source.cast,(v: Cast) => ({photo: v.profile_path, fullName: v.name, id: v.credit_id})),
        crew: map(source.crew,(v: Crew) => ({photo: v.profile_path, fullName: v.name, id: v.credit_id})),
        hasDetails: source.hasDetails
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

    const onlyRatingsWithReview = filter(values(state.ratings.itemsByExtendedItemId[buildExtendedId(isMovie(ownProps), id)]),(v) => {
        return !!v.review;
    });

    const ratingsWithAddedUserFlag = map(onlyRatingsWithReview, (rating: Rating) => {
        rating.isSubmittedByCurrentUser = rating.userId === currentUserId;
        return rating;
    });

    return {
        ...itemDetails,
        isMobile: state.browser.lessThan.large,
        type: isMovie(ownProps) ? 'Movies' : 'Shows',
        id: id,
        ratings: ratingsWithAddedUserFlag
    }
};

const mapDispatchToProps: MapDispatchToProps<{}, ReviewsSectionContainerProps> = (dispatch, ownProps) => {
    const itemId = ownProps.match.params.id;

    return {
        init: (hasDetails: boolean ) => {
            if(!hasDetails) {
                if (isMovie(ownProps)) {
                    dispatch(asyncRequestMovieDetails(itemId));
                } else {
                    dispatch(asyncRequestShowDetails(itemId));
                }
            }

            if (isMovie(ownProps)) {
                dispatch(asyncRequestMovieRatings(itemId));
            } else {
                dispatch(asyncRequestShowRatings(itemId));
            }
        },
        applySessionFromStorage: () => {
            dispatch(applySessionFromStorage());
        },
        deleteReview: (itemId: ItemId, itemType: string) => {
            dispatch(asyncDeleteReview(itemType === "Movies" ? "movie" : "show", itemId));
        }
    };
};

const ReviewsSectionContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ReviewsSection);

export default ReviewsSectionContainer;