import {connect, MapDispatchToProps, MapStateToProps} from "react-redux";
import ShowsListSection, {ShowsListSectionProps} from "./ShowsListSection/index";

import { map } from "lodash";
import {
    asyncRequestHighestRatedShows, asyncRequestLatestRatedShows, asyncRequestLowestRatedShows,
    asyncRequestMoreHighestRatedShows,
    asyncRequestMoreLatestRatedShows, asyncRequestMoreLowestRatedShows,
    asyncRequestMoreNowPlayingShows,
    asyncRequestNowPlayingShows,
    asyncRequestShowDetails
} from "../../actions/shows";
import {ShowId, SHOWS_PER_PAGE} from "../../reducers/shows";
import {
    sortByHighestRated, sortByLatest, sortByLatestRated, sortByLowestRated
} from "../../actions/shows";
import {SortingOrder} from "../../reducers/movies";

const mapStateToProps: MapStateToProps<{}, ShowsListSectionProps, any> = (state) => {
    const m = state.shows;
    const sourceMap: any = {
        LATEST: [m.nowPlaying, m.requestingNowPlaying, 'Latest'],
        LATEST_RATED: [m.latestRated, m.requestingLatestRated, 'Latest Rated'],
        HIGHEST_RATED: [m.highestRated, m.requestingHighestRated, 'Highest Rated'],
        LOWEST_RATED: [m.lowestRated, m.requestingLowestRated, 'Lowest Rated']
    };

    const source = sourceMap[m.showsListSortingOrder];

    return {
        shows: map(source[0], (v: number) => m.showsById[v]),
        requestingNowPlaying: source[1],
        sortingOrderLabel: source[2],
        sortingOrder: m.showsListSortingOrder
    }
};

const mapDispatchToProps: MapDispatchToProps<{}, ShowsListSectionProps> = (dispatch) => {
    return {
        init: () => dispatch(asyncRequestLatestRatedShows()),
        requestShowDetails: (id: ShowId) => dispatch(asyncRequestShowDetails(id)),
        sortByLatest: () => {
            dispatch(asyncRequestNowPlayingShows());
            dispatch(sortByLatest());
        },
        sortByLatestRated: () => {
            dispatch(asyncRequestLatestRatedShows());
            dispatch(sortByLatestRated());
        },
        sortByHighestRated: () => {
            dispatch(asyncRequestHighestRatedShows());
            dispatch(sortByHighestRated());
        },
        sortByLowestRated: () => {
            dispatch(asyncRequestLowestRatedShows());
            dispatch(sortByLowestRated());
        },
        showMore: (showsTotalNow: number, sortingOrder: SortingOrder) => {
            const page = Math.ceil(showsTotalNow / SHOWS_PER_PAGE) + 1;

            const actionsMap: any = {
                LATEST: asyncRequestMoreNowPlayingShows.bind(null, page),
                LATEST_RATED: asyncRequestMoreLatestRatedShows.bind(null, page),
                HIGHEST_RATED: asyncRequestMoreHighestRatedShows.bind(null, page),
                LOWEST_RATED: asyncRequestMoreLowestRatedShows.bind(null, page)
            };

            dispatch(actionsMap[sortingOrder]());
        }
    };
};

const ShowsListSectionContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ShowsListSection);

export default ShowsListSectionContainer