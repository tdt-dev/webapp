import {Ratings} from "../sections/HomeSectionContainer/HomeSection/RecentRatingsBlock/RecentRatingsComponent/RecentRatingsItemComponent/RatingComponent";
import {Answer} from "./thetest";
import {DELETE_REVIEW, RatingsAction, RECEIVED_RATINGS, REQUESTING_RATINGS} from "../actions/ratings";
import {keyBy, mergeWith, assign, reduce, isArray, concat} from "lodash";

export interface Rating {
    subjectId: string;
    userId: string;
    userName: string;
    answers: Answer[];
    review: string;
    usersRating?: Ratings;
    isSubmittedByCurrentUser?: boolean;
}

export interface RatingsToUserIdMap {
    [userId: string]: Rating;
}

export interface RatingsToItemIdMap {
    [id: string]: RatingsToUserIdMap;
}

interface RatingsState {
    /*
     itemsByExtendedItemId means that any item of the map may be ether movie or show and this defined by
     first letter of id. m123456 - movie and s123456 - show.
    */
    itemsByExtendedItemId: RatingsToItemIdMap;
    requestingRatings: Boolean;
}

const defaultState: RatingsState = {
    itemsByExtendedItemId: {},
    requestingRatings: false
};

export default function ratings(state: RatingsState = defaultState, action: RatingsAction): RatingsState {
    switch (action.type) {
        case REQUESTING_RATINGS:
            return {
                ...state,
                requestingRatings: true
            };
        case RECEIVED_RATINGS:
            return {
                ...state,
                requestingRatings: false,
                itemsByExtendedItemId: mergeRatings(state.itemsByExtendedItemId, action.ratings)
            };
        case DELETE_REVIEW:
            return {
                ...state,
                itemsByExtendedItemId: deleteReview(action.itemIdToDeleteRating, action.userIdToDeleteRating, state.itemsByExtendedItemId)
            };
        default:
            return state;
    }
}

export function mergeRatings(oldRatings: RatingsToItemIdMap, newRatings: Rating[]): RatingsToItemIdMap {
    const customizer = (objValue: Rating[], newValue: Rating[]) => {
        const srcRatingsByUserId = keyBy(objValue, 'userId');
        const newRatingsByUserId = keyBy(newValue, 'userId');

        return mergeWith(assign({}, srcRatingsByUserId), newRatingsByUserId,
            (objValue: Rating, srcValue: Rating) => {
                if(objValue) {
                    const ratingWithReview = !srcValue.review ? {...objValue} : {...objValue, review: srcValue.review};
                    return !srcValue.usersRating ? {...ratingWithReview} : {...ratingWithReview, usersRating: srcValue.usersRating};
                } else {
                    return srcValue;
                }
            }
        );
    };

    return mergeWith(assign( {}, oldRatings), keyByWithArray(newRatings, 'subjectId'), customizer);
}


function keyByWithArray(items: Array<{[key: string]: any}>, field: string) {
    return reduce(items, (result: any, value) => {
        const key = value[field];
        const extendedArray = isArray(result[key]) ? concat(result[key], value) : [value];

        return {...result, [key]: extendedArray}
    }, {});
}


function deleteReview(itemId: string, userId: string, itemByExtendedItemId: RatingsToItemIdMap) {
    if (itemByExtendedItemId[itemId] && itemByExtendedItemId[itemId][userId]) {
        return {...itemByExtendedItemId, [itemId]: {...itemByExtendedItemId[itemId], [userId]: {...itemByExtendedItemId[itemId][userId], review: ""}}};
    }
}