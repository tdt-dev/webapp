import {connect, MapDispatchToProps, MapStateToProps} from "react-redux";
import SearchSection from "./SearchSection/index";
import {asyncDoMoreSearch, asyncDoSearch, changeSearchRequest} from "../../actions/search";

import { map, uniq } from "lodash";
import {MovieId} from "../../reducers/movies";
import {ShowId} from "../../reducers/shows";
import {asyncRequestMovieDetails} from "../../actions/movies";
import {asyncRequestShowDetails} from "../../actions/shows";

interface SearchSectionContainerProps {
    match: {
        params: {
            query: string;
        }
    }
}

function getItemsFromLinks(itemsById: any, links: Array<any>) {
    return map(links, (i) => itemsById[i]);
}

const mapStateToProps: MapStateToProps<{}, SearchSectionContainerProps, any> = (state, ownProps) => {
    return {
        requestingSearchResults: state.search.requestingSearchResults,
        receivedFirstSearchResults: state.search.receivedFirstSearchResults,
        searchRequest: ownProps.match.params.query,
        persons: uniq(getItemsFromLinks(state.persons.personsById, state.search.persons)),
        movies: uniq(getItemsFromLinks(state.movies.moviesById, state.search.movies)),
        shows: uniq(getItemsFromLinks(state.shows.showsById, state.search.shows)),
        news: uniq(getItemsFromLinks(state.news.items, state.search.news))
    };
};

const mapDispatchToProps: MapDispatchToProps<{}, SearchSectionContainerProps> = (dispatch, ownProps) => {
    const query = ownProps.match.params.query;

    return {
        init: () => dispatch(asyncDoSearch(query)),
        requestMovieDetails: (id: MovieId) => dispatch(asyncRequestMovieDetails(id)),
        requestShowDetails: (id: ShowId) => dispatch(asyncRequestShowDetails(id)),
        changeSearchInput: (query: string) => dispatch(changeSearchRequest(query)),
        searchMore: (query: string, page: number) => dispatch(asyncDoMoreSearch(query, page))
    };
};

const SearchSectionContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchSection);

export default SearchSectionContainer;
