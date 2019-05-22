import './styles.scss'

import * as React from 'react';

export type Ratings = '?' | 'F' | 'D' | 'C' | 'B' | 'A';

interface RatingComponentProps {
    rating: Ratings;
}

const RATING_TO_COLOR = {
    'A': 'rating-a',
    'B': 'rating-b',
    'C': 'rating-c',
    'D': 'rating-d',
    'F': 'rating-f',
    '?': 'rating-na'
};

const getColorForRating = (rating : Ratings) : string => {
    return RATING_TO_COLOR[rating];
};

class RatingComponent extends React.Component<RatingComponentProps, {}> {
    render() {
        const rating = this.props.rating;

        return (
            <div className='rating-component'>
                { this.props.children }
                <div className={ [`rating-box`, getColorForRating(rating)].join(' ') }>{ rating }</div>
            </div>
        );
    }
}

export default RatingComponent;