import './styles.scss'

import * as React from 'react';
import RecentRatingsItemComponent from "./RecentRatingsItemComponent/index";
import {Shows} from "../../../../../reducers/shows";
import {Genre, Movies} from "../../../../../reducers/movies";
import {map, take} from "lodash";
import {Link} from "react-router-dom";

export type ItemType = 'movie' | 'show';

interface RecentRatingsComponentProps {
    type: ItemType;
    latestItems: Movies[] | Shows[];
    isMobile: boolean;
}

const getGenreString = (genres: Genre[]) => genres && map(take(genres, 3),(v: Genre) => v.name).join(', ');

class RecentRatingsComponent extends React.Component<RecentRatingsComponentProps, {}> {
    render() {
        return (
            <div className='recent-ratings-container'>
                <div className='grid-x header'>
                    <div className='cell'>
                        <Link to={ this.props.type === 'movie' ? "/movies/" : "/shows/"}>
                            <h3>{ this.props.type === 'movie' ? 'Movies' : 'Shows' }</h3>
                        </Link>
                    </div>
                </div>
                <div className='grid-x rating-items'>
                    {
                        map(this.props.latestItems, (v: any) => {
                            return (
                                <div key={`${this.props.type}${v.id}`} className='cell small-12 large-4'>
                                    <RecentRatingsItemComponent
                                        type={this.props.type}
                                        itemId={v.id}
                                        title={v.title ? v.title : v.name}
                                        imgUrl={v.backdrop_image}
                                        rating={v.rating}
                                        genre={getGenreString(v.genres)}
                                    />
                                </div>
                            )
                        })
                    }
                </div>
                <div className='grid-x'>
                    <div className={['show-more', 'cell', this.props.isMobile ? 'small-12' : 'small-offset-10 small-2'].join(' ')}>
                        <Link to={ this.props.type === 'movie' ? "/movies/" : "/shows/"}>Show More</Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default RecentRatingsComponent;