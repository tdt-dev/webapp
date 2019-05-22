import "./styles.scss"

import * as React from "react";
import RecentRatingsComponent from "./RecentRatingsComponent/index";
import {Movies} from "../../../../reducers/movies";
import {Shows} from "../../../../reducers/shows";

export interface RecentRatingsBlockProps {
    latestMovies: Movies[];
    latestShows: Shows[];
    isMobile: boolean;
    hintMode?: boolean;
}

class RecentRatingsBlock extends React.Component<RecentRatingsBlockProps, {}> {
    private ratingsSeparatorRef: HTMLDivElement;

    componentDidMount() {
        if (this.props.hintMode) {
            this.ratingsSeparatorRef.scrollIntoView(true);
        }
    }

    render() {

        if (this.props.hintMode) {
            this.ratingsSeparatorRef.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });
        }

        return (
            <div className='recent-ratings-block-container'>
                <div className='grid-container full'>
                    <div className='grid-x'>
                        <div className='cell'>
                            <h2>Latest Rated</h2>
                        </div>
                    </div>
                    <RecentRatingsComponent
                        type='movie'
                        latestItems={this.props.latestMovies}
                        isMobile={this.props.isMobile}
                    />
                    <div className='space' ref={ (r) => this.ratingsSeparatorRef = r }/>
                    <RecentRatingsComponent
                        type='show'
                        latestItems={this.props.latestShows}
                        isMobile={this.props.isMobile}
                    />
                </div>
            </div>
        );
    }
}

export default RecentRatingsBlock;
