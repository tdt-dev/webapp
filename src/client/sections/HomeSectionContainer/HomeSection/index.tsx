import "./styles.scss"

import * as React from "react";

import HeroComponent from "./HeroComponent/index";
import RecentRatingsBlockComponent from "./RecentRatingsBlock/index";
import RecentNewsComponent from "./RecentNewsComponent/index";
import {Movies} from "../../../reducers/movies";
import {Shows} from "../../../reducers/shows";
import {News} from "../../../reducers/news";
import {each} from "lodash";
import HeaderContainer from "GlobalComponents/HeaderContainer";
import FooterContainer from "GlobalComponents/FooterContainer";
import {trackPageView} from "../../../services/googleAnalytics";


export interface HomeSectionProps {
    receivedLatestRated: boolean;
    latestMovies: Movies[];
    latestShows: Shows[];
    news: News[];
    init: Function;
    requestMovieDetails: Function;
    requestShowDetails: Function;
    sendSubscriptionForm: Function;
    isMobile: boolean;
}

export interface HomeSectionState {
    isInHintState: boolean;
}

class HomeSection extends React.Component<HomeSectionProps, HomeSectionState> {
    constructor(props: HomeSectionProps) {
        super(props);
        this.state = {
            isInHintState: false
        };
    }

    componentDidMount() {
        this.props.init();
        window.scrollTo(0, 0);

        trackPageView(`/`);
    }

    componentDidUpdate(prevProps: HomeSectionProps) {
        if (this.props.receivedLatestRated && !prevProps.receivedLatestRated) {
            each(this.props.latestMovies, (i) => { i && !i.hasDetails && this.props.requestMovieDetails(i.id) } );
            each(this.props.latestShows, (i) => { i && !i.hasDetails && this.props.requestShowDetails(i.id) } );
        }
    }

    activateHintMode() {
        this.setState({
            isInHintState: true
        })
    }

    deactivateHintMode() {
        this.setState({
            isInHintState: false
        })
    }

    render() {
        return (
            <div className='home-section-container'>
                <HeaderContainer/>
                <HeroComponent
                    isMobile={this.props.isMobile}
                    activateHintMode={this.activateHintMode.bind(this)}
                    deactivateHintMode={this.deactivateHintMode.bind(this)}
                />
                <RecentRatingsBlockComponent
                    latestMovies={this.props.latestMovies}
                    latestShows={this.props.latestShows}
                    isMobile={this.props.isMobile}
                    hintMode={this.state.isInHintState}
                />
                <RecentNewsComponent
                    news={this.props.news}
                    sendSubscriptionForm={this.props.sendSubscriptionForm}
                    isMobile={this.props.isMobile}
                />
                <FooterContainer/>
            </div>
        );
    }
}

export default HomeSection;