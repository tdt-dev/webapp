import "./styles.scss"

import * as React from "react"
import HeaderContainer from "GlobalComponents/HeaderContainer";
import BreadcrumbsComponent from "../../SearchSectionContainer/SearchSection/BreadcrumbsComponent/index";
import {Show} from "../../../reducers/shows";

import { map, take, each } from "lodash"
import SearchItemComponent from "../../SearchSectionContainer/SearchSection/SearchItemComponent/index";
import FooterContainer from "GlobalComponents/FooterContainer";
import {trackPageView} from "../../../services/googleAnalytics";
import {EventHandler} from "react";
import {SortingOrder} from "../../../reducers/movies";
import {convertISODateToRequiredFormat} from "../../../services/utils";


export interface ShowsListSectionProps {
    shows: Show[];
    init: Function;
    requestShowDetails: Function;
    requestingNowPlaying: boolean;
    sortByLatest: EventHandler<any>;
    sortByLatestRated: EventHandler<any>;
    sortByHighestRated: EventHandler<any>;
    sortByLowestRated: EventHandler<any>;
    showMore: EventHandler<any>;
    sortingOrderLabel: string;
    sortingOrder: SortingOrder;
}

class ShowsListSection extends React.Component<ShowsListSectionProps> {
    componentDidMount() {
        this.props.init();
        window.scrollTo(0, 0);

        trackPageView(`/shows/`);
    }

    componentDidUpdate(prevProps: ShowsListSectionProps) {
        if (prevProps.requestingNowPlaying && !this.props.requestingNowPlaying) {
            each(this.props.shows, (i) => { !i.hasDetails && this.props.requestShowDetails(i.id) } );
        }
    }

    render() {
        const showsHtml = map(this.props.shows, (i) =>
            <SearchItemComponent
                key={i.id}
                title={i.name}
                image={i.backdrop_image}
                info1={map(take(i.genres, 2), (v) => v && v.name).join(', ')}
                rating={i.rating}
                info2={convertISODateToRequiredFormat(i.first_air_date)}
                link={`/details/show/${i.id}/`}
                studios={map(take(i.production_companies, 2), (v) => v && v.name).join(', ')}
                actors={map(take(i.cast, 3), (v) => v && v.name).join(', ')}/>
        );

        const showMore = this.props.showMore.bind(null, this.props.shows.length, this.props.sortingOrder);

        return (
            <div className='shows-list-container'>
                <HeaderContainer/>
                <BreadcrumbsComponent type='Shows' title={this.props.sortingOrderLabel}>
                    <div className='sort-dropdown'>
                        <a onClick={this.props.sortByLatest}>Latest</a>
                        <a onClick={this.props.sortByLatestRated}>Latest Rated</a>
                        <a onClick={this.props.sortByHighestRated}>Highest Rated</a>
                        <a onClick={this.props.sortByLowestRated}>Lowest Rated</a>
                    </div>
                </BreadcrumbsComponent>
                <div className='grid-container'>
                    <div className='grid-x grid-margin-x items'>
                        { showsHtml }
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

export default ShowsListSection