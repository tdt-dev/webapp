import {connect, MapDispatchToProps, MapStateToProps} from "react-redux";
import MoviesListSection, {MoviesListSectionProps} from "./MoviesListSection/index";
import {MovieId, MOVIES_PER_PAGE, SortingOrder} from "../../reducers/movies";
import {
    asyncRequestHighestRatedMovies,
    asyncRequestLatestRatedMovies, asyncRequestLowestRatedMovies, asyncRequestMoreHighestRatedMovies,
    asyncRequestMoreLatestRatedMovies, asyncRequestMoreLowestRatedMovies, asyncRequestMoreNowPlayingMovies,
    asyncRequestMovieDetails,
    asyncRequestNowPlayingMovies, sortByHighestRated, sortByLatest, sortByLatestRated, sortByLowestRated
} from "../../actions/movies";
import { map } from "lodash";

const mapStateToProps: MapStateToProps<{}, MoviesListSectionProps, any> = (state) => {
  const m = state.movies;
  const sourceMap: any = {
    LATEST: [m.nowPlaying, m.requestingNowPlaying, 'Latest'],
    LATEST_RATED: [m.latestRated, m.requestingLatestRated, 'Latest Rated'],
    HIGHEST_RATED: [m.highestRated, m.requestingHighestRated, 'Highest Rated'],
    LOWEST_RATED: [m.lowestRated, m.requestingLowestRated, 'Lowest Rated']
  };

  const source = sourceMap[m.moviesListSortingOrder];

  return {
      movies: map(source[0], (v: number) => m.moviesById[v]),
      requestingNowPlaying: source[1],
      sortingOrderLabel: source[2],
      sortingOrder: m.moviesListSortingOrder
  }
};

const mapDispatchToProps: MapDispatchToProps<{}, MoviesListSectionProps> = (dispatch) => {
  return {
      init: () => dispatch(asyncRequestLatestRatedMovies()),
      requestMovieDetails: (id: MovieId) => dispatch(asyncRequestMovieDetails(id)),
      sortByLatest: () => {
          dispatch(asyncRequestNowPlayingMovies());
          dispatch(sortByLatest());
      },
      sortByLatestRated: () => {
          dispatch(asyncRequestLatestRatedMovies());
          dispatch(sortByLatestRated());
      },
      sortByHighestRated: () => {
          dispatch(asyncRequestHighestRatedMovies());
          dispatch(sortByHighestRated());
      },
      sortByLowestRated: () => {
          dispatch(asyncRequestLowestRatedMovies());
          dispatch(sortByLowestRated());
      },
      showMore: (moviesTotalNow: number, sortingOrder: SortingOrder) => {
          const page = Math.ceil(moviesTotalNow / MOVIES_PER_PAGE) + 1;

          const actionsMap: any = {
              LATEST: asyncRequestMoreNowPlayingMovies.bind(null, page),
              LATEST_RATED: asyncRequestMoreLatestRatedMovies.bind(null, page),
              HIGHEST_RATED: asyncRequestMoreHighestRatedMovies.bind(null, page),
              LOWEST_RATED: asyncRequestMoreLowestRatedMovies.bind(null, page)
          };

          dispatch(actionsMap[sortingOrder]());
      }
  };
};

const MoviesListSectionContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(MoviesListSection);

export default MoviesListSectionContainer;