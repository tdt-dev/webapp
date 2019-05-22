import "./styles.scss"

import * as React from "react";
import {convertISODateToRequiredFormat} from "../../../../../services/utils";
import {ImageItem} from "../../../../../reducers/movies";
import ResponsiveImageComponent from "../../RecentRatingsBlock/RecentRatingsComponent/RecentRatingsItemComponent/ResponsiveImageComponent";

interface NewsItemComponentProps {
    imageUrl: ImageItem[];
    title: string;
    description: string;
    link: string;
    isMobile: boolean;
    author: string;
    publication: string;
    date: string;
}

class NewsItemComponent extends React.Component<NewsItemComponentProps, {}> {
    render() {
        const initialItem = (
            <div className="grid-x grid-margin-x">
                <div className="medium-3 cell">
                    <ResponsiveImageComponent
                        imageItems={this.props.imageUrl}
                        defaultImage={"/public/MoviesShows600.svg"}
                        sizes={"(max-width: 630px) 96vw, 21vw"}
                    />
                </div>
                <div className="medium-9 cell">
                    <div className="title">{ this.props.title }</div>
                    <div className="info">
                        <span>{ this.props.author }</span>
                        <span>{ this.props.publication }</span>
                        <span>{ convertISODateToRequiredFormat(this.props.date) }</span>
                    </div>
                    {
                        !this.props.isMobile ? [
                            (<div key={'std'} className="short-text">
                                { this.props.description }
                            </div>),
                            (<div key={'rml'} className="read-more">
                                <a href={ this.props.link } target="_blank">Read More</a>
                            </div>)
                        ] : null
                    }
                </div>
            </div>
        );

        const processedItem = this.props.isMobile ? (
            <a href={ this.props.link } target="_blank">
                { initialItem }
            </a>
        ) : initialItem;

        return (
            <div className="news-item-container">
                { processedItem }
            </div>
        );
    }
}

export default NewsItemComponent;