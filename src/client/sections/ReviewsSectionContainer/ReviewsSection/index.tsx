import './styles.scss'

import * as React from 'react'
import {
    default as DetailedInfoComponent,
    DetailedInfoComponentProps
} from "../../DetailsSectionContainer/DetailsSection/DetailedInfoComponent";
import {trackPageView} from "../../../services/googleAnalytics";
import HeaderContainer from "GlobalComponents/HeaderContainer";
import FooterContainer from "GlobalComponents/FooterContainer";
import UserReviewsComponent, {UserReviewsComponentProps} from "./UserReviewsComponent";
import {omit} from "lodash";
import {ItemId} from "../../../actions/thetest";

interface ReviewsSectionProps extends DetailedInfoComponentProps, UserReviewsComponentProps {
    type: string;
    id: ItemId;
    init: Function;
    applySessionFromStorage: Function;
    deleteMovieReview: Function;
    hasDetails: boolean;
}

class ReviewsSection extends React.Component<ReviewsSectionProps, {}> {
    componentDidMount() {
        this.props.applySessionFromStorage();
        this.props.init(this.props.hasDetails);

        window.scrollTo(0, 0);
        trackPageView(`/details/${this.props.type}/${this.props.id}/reviews/`);
    }

    render() {
        const detailsProps: DetailedInfoComponentProps = omit(this.props, ['id', 'type']) as any;

        return (
            <div className='reviews-section-container'>
                <HeaderContainer/>
                <DetailedInfoComponent {...detailsProps}/>
                <UserReviewsComponent
                    ratings={this.props.ratings}
                    deleteReview={this.props.deleteReview}
                    itemId={this.props.id}
                    itemType={this.props.type}
                />
                <FooterContainer/>
                <div className='left-border'/>
            </div>
        );
    }
}

export default ReviewsSection;