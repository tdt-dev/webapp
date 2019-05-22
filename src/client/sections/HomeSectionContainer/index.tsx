import {connect, MapDispatchToProps, MapStateToProps} from "react-redux";

import HomeSection from "./HomeSection/index";
import {MovieId, Movies, MoviesMap} from "../../reducers/movies";
import {ShowId, Shows, ShowsMap} from "../../reducers/shows";

import {take, concat, difference, values} from "lodash";
import {
    asyncRequestLatestRatedMovies, asyncRequestMovieDetails,
    asyncRequestNowPlayingMovies
} from "../../actions/movies";
import {asyncRequestLatestRatedShows, asyncRequestNowPlayingShows, asyncRequestShowDetails} from "../../actions/shows";
import {asyncRequestNews} from "../../actions/news";
import {asyncSendSubscriptionForm} from "../../actions/subscribe";

const LATEST_FOR_DISPLAY = 3;

function combineLatestAndPlaying<T>(p: any) : T[] {
    return concat(
        p.latestRated.map((v: any) => p.mapById[v])
        ,
        take(difference(p.nowPlaying, p.latestRated), LATEST_FOR_DISPLAY - p.ratedLength)
            .map((v: any) => p.mapById[v])
    );
}

const getLatestMovies = (nowPlaying: MovieId[], latestRated: MovieId[], moviesById: MoviesMap): Movies[] => {
    const ratedLength = latestRated.length;

    return ratedLength < LATEST_FOR_DISPLAY
            ? combineLatestAndPlaying<Movies>({ratedLength, nowPlaying, latestRated, mapById: moviesById})
            : take(latestRated, 9).map((v) => moviesById[v]);
};

const getLatestShows = (nowPlaying: ShowId[], latestRated: ShowId[], showsById: ShowsMap): Shows[] => {
    const ratedLength = latestRated.length;

    return ratedLength < LATEST_FOR_DISPLAY
            ? combineLatestAndPlaying<Shows>({ratedLength, nowPlaying, latestRated, mapById: showsById})
            : take(latestRated, 9).map((v) => showsById[v]);
};

const mapStateToProps: MapStateToProps<{}, {}, any> = state => {
  return {
    latestMovies: getLatestMovies(state.movies.nowPlaying, state.movies.latestRated, state.movies.moviesById),
    latestShows: getLatestShows(state.shows.nowPlaying, state.shows.latestRated, state.shows.showsById),
    news: take(values(state.news.items), 3),
    receivedLatestRated: state.shows.receivedLatestRated &&
                         state.shows.receivedNowPlaying &&
                         state.movies.receivedLatestRated &&
                         state.movies.receivedNowPlaying,
    isMobile: state.browser.lessThan.large
  };
};

const mapDispatchToProps: MapDispatchToProps<{}, {}> = dispatch => {
    return {
        init: () => {
            dispatch(asyncRequestLatestRatedMovies());
            dispatch(asyncRequestNowPlayingMovies());
            dispatch(asyncRequestLatestRatedShows());
            dispatch(asyncRequestNowPlayingShows());
            dispatch(asyncRequestNews());
        },
        requestMovieDetails: (id: MovieId) => dispatch(asyncRequestMovieDetails(id)),
        requestShowDetails: (id: ShowId) => dispatch(asyncRequestShowDetails(id)),
        sendSubscriptionForm: (email: string, captchaToken: string) =>
            dispatch(asyncSendSubscriptionForm(email, captchaToken))
    };
};

const HomeSectionContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(HomeSection);

export default HomeSectionContainer;