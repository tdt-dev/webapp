import "./styles.scss"

import * as React from "react"
import RatingComponent, {Ratings} from "../../../HomeSectionContainer/HomeSection/RecentRatingsBlock/RecentRatingsComponent/RecentRatingsItemComponent/RatingComponent/index";
import {Link} from "react-router-dom";
import {ImageItem} from "../../../../reducers/movies";
import ResponsiveImageComponent from "../../../HomeSectionContainer/HomeSection/RecentRatingsBlock/RecentRatingsComponent/RecentRatingsItemComponent/ResponsiveImageComponent";

interface SearchItemComponentProps {
    title: string;
    image: ImageItem[];
    actors?: string;
    studios?: string;
    info1?: string;
    rating?: Ratings;
    info2?: string;
    info3?: string;
    description?: string;
    link?: string;
}

class SearchItemComponent extends React.Component<SearchItemComponentProps, {}> {
    render() {
        const imageHtml = this.props.rating ? (
            <RatingComponent rating={ this.props.rating }>
                <ResponsiveImageComponent
                    imageItems={ this.props.image }
                    defaultImage={ "/public/MoviesShows600.svg" }
                    sizes={"(max-width: 1012px) 96vw, 31vw"}
                />
            </RatingComponent>
        ) : (
            <ResponsiveImageComponent
                className='float-center'
                imageItems={ this.props.image }
                defaultImage={"/public/MoviesShows600.svg"}
                sizes={""}
            />
        );

        const actorsHtml = (
            <div className='actors'>
                { this.props.actors }
            </div>
        );

        const studioHtml = (
            <div className='studio'>
                { this.props.studios }
            </div>
        );

        const additionalInfoThreeItemsHtml = (
            <div className='additional-info'>
                <span>
                    { this.props.info1 }
                </span>
                <span>
                    { this.props.info2 }
                </span>
                <span>
                    { this.props.info3 }
                </span>
            </div>
        );

        const additionalInfoTwoItemsHtml = (
            <div className='additional-info-two-items'>
                <span>
                    { this.props.info1 }
                </span>
                <span>
                    { this.props.info2 }
                </span>
            </div>
        );

        const additionalInfoHtml =
            this.props.info1 && this.props.info2 && this.props.info3
                ? additionalInfoThreeItemsHtml : additionalInfoTwoItemsHtml ;

        const descriptionHtml = (
            <div className='description'>
                { this.props.description }
            </div>
        );

        const wrapInLink = (content : any) => {
            if (this.props.link) {
                const linkHtml = (
                    <Link to={ this.props.link }>
                        { content }
                    </Link>
                );
                const anchorHtml = (
                    <a href={ this.props.link } target="_blank">
                        { content }
                    </a>
                );

                return /^https?:\/\//.test(this.props.link) ?  anchorHtml : linkHtml;
            } else {
                return content;
            }
        };

        return (
            <div className='search-item-component-container cell small-12 large-4'>
                { wrapInLink(
                    <div>
                        { imageHtml }
                        <div className='title'>
                            { this.props.title }
                        </div>
                        { this.props.actors && actorsHtml }
                        { this.props.studios && studioHtml }
                        { this.props.info1 && this.props.info2 && additionalInfoHtml}
                        { this.props.description && descriptionHtml }
                    </div>
                ) }
            </div>
        );
    }
}

export default SearchItemComponent;