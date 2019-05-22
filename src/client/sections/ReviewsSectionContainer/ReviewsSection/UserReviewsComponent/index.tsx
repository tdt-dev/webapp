import './styles.scss'

import * as React from 'react'
import UserReviewItemComponent from "./UserReviewItemComponent";
import {Rating} from "../../../../reducers/ratings";
import {map} from "lodash";
import {ItemId} from "../../../../actions/thetest";

export interface UserReviewsComponentProps {
    ratings: Rating[];
    deleteReview: Function;
    itemId: ItemId;
    itemType: string;
}

class UserReviewsComponent extends React.Component<UserReviewsComponentProps, {}> {
    render() {
        const ratingsHtml = map(this.props.ratings, (i) => {
            return (<UserReviewItemComponent
                key={i.userId}
                review={i.review}
                usersRating={i.usersRating}
                name={i.userName || i.userId}
                isDisplayedToOwner={i.isSubmittedByCurrentUser}
                deleteReview={this.props.deleteReview}
                itemId={this.props.itemId}
                itemType={this.props.itemType}/>
            );
        });

        const ratingsContainerHtml = [
            (
                <div key={'user_review'} className='large-12 cell'>
                    <h1>User Reviews</h1>
                </div>
            ),
            ratingsHtml
        ];

        const noRatingsContainerHtml = (
            <div className='large-12 cell'>
                <h1>No Users Reviews so far. Be first!</h1>
            </div>
        );

        return (
            <div className='user-reviews-container grid-container' ref={ (r) => r && r.scrollIntoView(true) }>
                <div className='grid-x grid-margin-x'>
                    { this.props.ratings.length ? ratingsContainerHtml : noRatingsContainerHtml }
                </div>
            </div>
        );
    }
}

export default UserReviewsComponent;