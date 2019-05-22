import "./styles.scss"

import * as React from "react"
import BreadcrumbsComponent from "./BreadcrumbsComponent/index";
import CategoryComponent from "./CategoryComponent/index";
import SearchItemComponent from "./SearchItemComponent/index";
import {Person} from "../../../actions/persons";
import {Movie} from "../../../reducers/movies";
import {Show} from "../../../reducers/shows";
import {News} from "../../../reducers/news";

import { map, take, isEmpty, each, size } from "lodash";
import {isNumber} from "util";
import HeaderContainer from "GlobalComponents/HeaderContainer";
import FooterContainer from "GlobalComponents/FooterContainer";
import {trackPageView} from "../../../services/googleAnalytics";
import {convertISODateToRequiredFormat} from "../../../services/utils";

interface SearchSectionProps {
    init: Function,
    requestMovieDetails: Function,
    requestShowDetails: Function,
    changeSearchInput: Function,
    searchMore: (request: string, page: number) => void
    searchRequest: string,
    persons: Person[],
    movies: Movie[],
    shows: Show[],
    news: News[] | null,
    requestingSearchResults: boolean,
    receivedFirstSearchResults: boolean
}

interface SearchSectionState {
   moviesPage: number;
   showMoviesShowMoreButton: boolean;

   showsPage: number;
   showShowsShowMoreButton: boolean;

   newsPage: number;
   showNewsShowMoreButton: boolean;
}

const ITEMS_PER_PAGE = 3;
const ITEMS_PER_PAGE_SERVER_SIDE = 20;

class SearchSection extends React.Component<SearchSectionProps, SearchSectionState> {
    constructor(props: SearchSectionProps) {
        super(props);
        this.state = {
            moviesPage: 1,
            showMoviesShowMoreButton: true,
            showsPage: 1,
            showShowsShowMoreButton: true,
            newsPage: 1,
            showNewsShowMoreButton: true
        };
    }

    componentDidMount() {
        this.props.init();
        window.scrollTo(0, 0);
        this.props.changeSearchInput(this.props.searchRequest);

        trackPageView(`/search/${this.props.searchRequest}/`);
    }

    componentDidUpdate(prevProps: SearchSectionProps) {
        if (this.props.searchRequest !== prevProps.searchRequest) {
            window.scrollTo(0, 0);
            this.props.init();
        }

        if (prevProps.requestingSearchResults && !this.props.requestingSearchResults) {
            each(this.props.movies, (i) => { !i.hasDetails && this.props.requestMovieDetails(i.id) });
            each(this.props.shows, (i) => { !i.hasDetails && this.props.requestShowDetails(i.id) });
        }
    }

    componentWillUnmount() {
        this.props.changeSearchInput('');
    }

    loadMoreIfNeeded(nextPageNumber: number, list: Array<any>) {
        if ( ( ( nextPageNumber ) * ITEMS_PER_PAGE ) > size(list) ) {
            this.props.searchMore(this.props.searchRequest, Math.floor(size(list) / ITEMS_PER_PAGE_SERVER_SIDE) + 1)
        }
    }

    static areThereMoreItems(nextPageNumber: number, list: Array<any>): boolean {
        return size(list) >= (ITEMS_PER_PAGE * nextPageNumber);
    }

    showMoreMovies() {
        this.loadMoreIfNeeded(this.state.moviesPage + 1, this.props.movies);
        this.setState({
            moviesPage: this.state.moviesPage + 1,
            showMoviesShowMoreButton: SearchSection.areThereMoreItems(this.state.moviesPage, this.props.movies)
        });
    }

    showMoreShows() {
        this.loadMoreIfNeeded(this.state.showsPage + 1, this.props.shows);
        this.setState({
            showsPage: this.state.showsPage + 1,
            showShowsShowMoreButton: SearchSection.areThereMoreItems(this.state.showsPage, this.props.shows)
        });
    }

    showMoreNews() {
        this.loadMoreIfNeeded(this.state.newsPage + 1, this.props.news);
        this.setState({
            newsPage: this.state.newsPage + 1,
            showNewsShowMoreButton: SearchSection.areThereMoreItems(this.state.newsPage, this.props.news)
        });
    }

    render() {
        const moviesHtml = map(take(this.props.movies, ITEMS_PER_PAGE * this.state.moviesPage), (i) =>
            <SearchItemComponent
                key={`movies${i.id}`}
                title={i.title}
                image={i.backdrop_image}
                info1={map(take(i.genres, 2), (v) => v && v.name).join(', ')}
                rating={i.rating}
                info2={convertISODateToRequiredFormat(i.release_date)}
                link={`/details/movie/${i.id}/`}
                info3={`$${isNumber(i.revenue) ? new Intl.NumberFormat().format(i.revenue) : ' N/A'}`}
                studios={map(take(i.studios, 2), (v) => v && v.name).join(', ')}
                actors={map(take(i.cast, 3), (v) => v && v.name).join(', ')}/>
        );
        const showsHtml = map(take(this.props.shows, ITEMS_PER_PAGE * this.state.showsPage), (i) =>
            <SearchItemComponent
                key={`shows${i.id}`}
                title={i.name}
                image={i.backdrop_image}
                info1={map(take(i.genres, 2), (v) => v && v.name).join(', ')}
                rating={i.rating}
                info2={convertISODateToRequiredFormat(i.first_air_date)}
                link={`/details/show/${i.id}/`}
                studios={map(take(i.production_companies, 2), (v) => v && v.name).join(', ')}
                actors={map(take(i.cast, 3), (v) => v && v.name).join(', ')}/>
        );
        const newsHtml = map(take(this.props.news, ITEMS_PER_PAGE * this.state.newsPage), (i) =>
            <SearchItemComponent
                key={`news${i._id}`}
                title={i.title}
                image={i.image_url}
                description={i.description}
                link={i.link}
                info1={i.author}
                info2={i.publication}
                info3={ convertISODateToRequiredFormat(i.date) }
            />);

        const moviesContainerHtml = [
            (
                <CategoryComponent key='moviestitle' title='Movies'>
                    { moviesHtml }
                </CategoryComponent>
            ),
            this.state.showMoviesShowMoreButton ? (
                <div key='moviesbody' className='grid-container'>
                    <div className='grid-x grid-margin-x'>
                        <div className='show-more cell large-12'>
                            <a href="javascript:undefined" onClick={this.showMoreMovies.bind(this)}>Show More</a>
                        </div>
                    </div>
                </div>
            ) : null
        ];

        const showsContainerHtml = [
            (
                <CategoryComponent key='showstitle' title='Shows'>
                    { showsHtml }
                </CategoryComponent>
            ),
            this.state.showShowsShowMoreButton ? (
                <div key='showsbody' className='grid-container'>
                    <div className='grid-x grid-margin-x'>
                        <div className='show-more cell large-12'>
                            <a href="javascript:undefined" onClick={this.showMoreShows.bind(this)}>Show More</a>
                        </div>
                    </div>
                </div>
            ) : null
        ];

        const newsContainerHtml = [
            (
                <CategoryComponent key='newstitle' title='News'>
                    { newsHtml }
                </CategoryComponent>
            ),
            this.state.showNewsShowMoreButton ? (
                <div key='newsbody' className='grid-container'>
                    <div className='grid-x grid-margin-x'>
                        <div className='show-more cell large-12'>
                            <a href="javascript:undefined" onClick={this.showMoreNews.bind(this)}>Show More</a>
                        </div>
                    </div>
                </div>
            ) : null
        ];

        const nothingFoundHtml = (
            <div className='search-status'>Nothing has been found by your request.</div>
        );

        const loadingHtml = (
            <div className='search-status'>Searching...</div>
        );

        return (
            <div className='search-section-container'>
                <HeaderContainer/>
                <BreadcrumbsComponent type='Search' title={ this.props.searchRequest }/>

                { this.props.requestingSearchResults || isEmpty(this.props.movies) || moviesContainerHtml }

                { this.props.requestingSearchResults || isEmpty(this.props.shows) || showsContainerHtml }

                { this.props.requestingSearchResults || isEmpty(this.props.news) || newsContainerHtml}

                {
                    isEmpty(this.props.persons) &&
                    isEmpty(this.props.movies) &&
                    isEmpty(this.props.shows) &&
                    isEmpty(this.props.news) &&
                    !this.props.requestingSearchResults &&
                    this.props.receivedFirstSearchResults &&
                    nothingFoundHtml
                }

                { this.props.requestingSearchResults && loadingHtml }

                <FooterContainer/>
                <div className='left-border'/>
            </div>
        );
    }
}

export default SearchSection;