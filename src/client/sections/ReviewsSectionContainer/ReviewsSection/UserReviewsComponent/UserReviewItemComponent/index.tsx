import './styles.scss'

import * as React from 'react'
import RatingComponent, {Ratings} from "../../../../HomeSectionContainer/HomeSection/RecentRatingsBlock/RecentRatingsComponent/RecentRatingsItemComponent/RatingComponent";
import {ItemId} from "../../../../../actions/thetest";

interface UserReviewItemComponentProps {
    usersRating: Ratings;
    review: string;
    name: string;
    isDisplayedToOwner: boolean;
    deleteReview: Function;
    itemId: ItemId;
    itemType: string;
}

class UserReviewItemComponent extends React.Component<UserReviewItemComponentProps, {}> {
    render() {

        const deleteButton = this.props.isDisplayedToOwner ? (
            <span className="deleteLink">
                <i onClick={() => this.deleteReviewWithConfirmation()} className="fa fa-trash" aria-hidden="true"/>
            </span>
        ) : null;

        return (
            <div className='user-review-item-container'>
                <div className='large-12 cell'>
                    <div className='clearfix'>
                        <div className='name'>
                                { deleteButton }
                                <span>
                                    {this.props.name}
                                </span>
                        </div>
                        <div className='score'>
                            <span className='score-label'>
                                TDT Score:
                            </span>
                            <span className='score-container'>
                                <RatingComponent rating={this.props.usersRating}/>
                            </span>
                        </div>
                    </div>
                    <div className='clearfix review'>{this.props.review}</div>
                </div>
            </div>
        );
    }

    deleteReviewWithConfirmation() {
        if(window.confirm("Do you really want to delete the comment?")) {
            this.props.deleteReview(this.props.itemId, this.props.itemType)
        }
    }
}

export default UserReviewItemComponent;