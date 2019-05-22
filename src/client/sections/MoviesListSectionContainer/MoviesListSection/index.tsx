import "./styles.scss"
import * as React from "react";
import HeaderContainer from "GlobalComponents/HeaderContainer";
import BreadcrumbsComponent from "../../SearchSectionContainer/SearchSection/BreadcrumbsComponent/index";
import SearchItemComponent from "../../SearchSectionContainer/SearchSection/SearchItemComponent/index";

import { map, take, isNumber, each } from "lodash"
import {Movie, SortingOrder} from "client/reducers/movies";
import FooterContainer from "GlobalComponents/FooterContainer";
import {trackPageView} from "../../../services/googleAnalytics";
import {EventHandler} from "react";
import {convertISODateToRequiredFormat} from "../../../services/utils";

export interface MoviesListSectionProps {
    movies: Movie[];
    init: Function;
    requestMovieDetails: Function;
    requestingNowPlaying: boolean;
    sortByLatest: EventHandler<any>;
    sortByLatestRated: EventHandler<any>;
    sortByHighestRated: EventHandler<any>;
    sortByLowestRated: EventHandler<any>;
    sortingOrderLabel: string;
    showMore: EventHandler<any>;
    sortingOrder: SortingOrder;
}

class MoviesListSection extends React.Component<MoviesListSectionProps> {
    componentDidMount() {
        this.props.init();
        window.scrollTo(0, 0);

        trackPageView(`/movies/`);
    }

    componentDidUpdate(prevProps: MoviesListSectionProps) {
        if (prevProps.requestingNowPlaying && !this.props.requestingNowPlaying) {
            each(this.props.movies, (i) => { !i.hasDetails && this.props.requestMovieDetails(i.id) } );
        }
    }

    render() {
        const moviesHtml = map(this.props.movies, (i) =>
            i && <SearchItemComponent
                key={i.id}
                title={i.title}
                image={i.backdrop_image}
                info1={map(take(i.genres, 2), (v) => v.name).join(', ')}
                rating={i.rating}
                info2={convertISODateToRequiredFormat(i.release_date)}
                link={`/details/movie/${i.id}/`}
                info3={`$${isNumber(i.revenue) ? new Intl.NumberFormat().format(i.revenue) : ' N/A'}`}
                studios={map(take(i.studios, 2), (v) => v.name).join(', ')}
                actors={map(take(i.cast, 3), (v) => v.name).join(', ')}/>
        );

        const showMore = this.props.showMore.bind(null, this.props.movies.length, this.props.sortingOrder);

        return (
            <div className='movies-list-container'>
                <HeaderContainer/>
                <BreadcrumbsComponent type='Movies' title={this.props.sortingOrderLabel}>
                    <div className='sort-dropdown'>
                        <a onClick={this.props.sortByLatest}>Latest</a>
                        <a onClick={this.props.sortByLatestRated}>Latest Rated</a>
                        <a onClick={this.props.sortByHighestRated}>Highest Rated</a>
                        <a onClick={this.props.sortByLowestRated}>Lowest Rated</a>
                    </div>
                </BreadcrumbsComponent>
                <div className='grid-container'>
                    <div className='grid-x grid-margin-x items'>
                        { moviesHtml }
                    </div>
                    <div className='grid-x grid-margin-x items'>
                        <div className='cell full show-more'>
                            <a href="javascript:undefined" onClick={showMore}>Show More</a>
                        </div>
                    </div>
                </div>
                <FooterContainer/>
                <div className='left-border'/>
            </div>
        );
    }
}

export default MoviesListSection;