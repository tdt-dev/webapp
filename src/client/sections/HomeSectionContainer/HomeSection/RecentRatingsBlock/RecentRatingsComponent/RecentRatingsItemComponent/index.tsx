import './styles.scss'

import * as React from 'react';
import RatingComponent, {Ratings} from "./RatingComponent/index";
import {Link} from "react-router-dom";
import {ImageItem} from "../../../../../../reducers/movies";
import ResponsiveImageComponent from "./ResponsiveImageComponent";

interface RecentRatingsItemComponentProps {
    type: string;
    itemId: number;
    title: string;
    imgUrl: ImageItem[];
    genre: string;
    rating: Ratings;
}

class RecentRatingsItemComponent extends React.Component<RecentRatingsItemComponentProps, {}> {
    render() {
        return (
                <div className='recent-ratings-item-container'>
                    <Link to={`/details/${this.props.type}/${this.props.itemId}/`}>
                        <RatingComponent rating={ this.props.rating }>
                            <ResponsiveImageComponent
                              defaultImage={"/public/MoviesShows600.svg"}
                              sizes={"(max-width: 1012px) 96vw, 31vw"}
                              imageItems={this.props.imgUrl}
                            />
                        </RatingComponent>
                        <div className='title'>{ this.props.title }</div>
                        <div className='genre'>{ this.props.genre }</div>
                    </Link>
                </div>
        );
    }
}

export default RecentRatingsItemComponent;