import "./styles.scss";

import * as React from "react";
import RatingComponent, {Ratings} from "../../../HomeSectionContainer/HomeSection/RecentRatingsBlock/RecentRatingsComponent/RecentRatingsItemComponent/RatingComponent/index";
import { take, find, filter, compact, uniqBy } from 'lodash';
import {Link} from "react-router-dom";
import {convertISODateToRequiredFormat} from "../../../../services/utils";
import {ImageItem} from "../../../../reducers/movies";
import ResponsiveImageComponent from "../../../HomeSectionContainer/HomeSection/RecentRatingsBlock/RecentRatingsComponent/RecentRatingsItemComponent/ResponsiveImageComponent";

export interface People {
    id: number;
    photo: ImageItem[];
    fullName: string;
    job?: string;
    department?: string;
}

export interface DetailedInfoComponentProps {
    posterImage: ImageItem[];
    title: string;
    releaseDate: string;
    genres: string[];
    studios: string[];
    boxOffice?: number;
    rating: Ratings;
    ratingsCounter: number;
    reviewsCounter: number;
    cast: People[];
    crew: People[];
    isMobile?: boolean;
    type?: string;
    id?: number;
    isTestFinished: Boolean;
}

interface LinkToReviewsProps {
    type: string;
    id: number;
    reviewsCounter: number;
}

class LinkToReviews extends React.Component<LinkToReviewsProps, {}>{
    render() {
        const type = this.props.type === "Movies" ? "movie" : "show";

        const childrenInLink = (
            <Link to={`/details/${type}/${this.props.id}/reviews/`}>
                { this.props.children }
            </Link>
        );

        const children = this.props.children;

        return (this.props.type && this.props.id && this.props.reviewsCounter) ? childrenInLink : children;
    }
}


class DetailedInfoComponent extends React.Component<DetailedInfoComponentProps, {}> {
    render() {
        const boxOfficeHtml = (withLabel: boolean) => this.props.boxOffice ? (
            <div className='box-office'>
                ${new Intl.NumberFormat().format(this.props.boxOffice)} {withLabel ? '(Global Box Office)' : ''}
            </div>
        ) : null;

        const peopleToHtml =
            (people: People[], isMobile: Boolean) => take(people, isMobile ? 3 : 4).map((p) => (
                <span key={ p.id } className={`people small-${ isMobile ? 4 : 3 } large-${ isMobile ? 4 : 3 } cell`}>
                    <ResponsiveImageComponent
                        defaultImage={"/public/Persons70.svg"}
                        imageItems={p.photo}
                        sizes={"10vw"}
                    />
                    <span>{ p.fullName }</span>
                </span>
            ));

        const crewToHtml = (people: People[]) =>
            this.props.type === "Movies" ? peopleToHtml(
                uniqBy(
                    compact(
                    [
                            find(people, {job: 'Director'}),
                            ...filter(people, {department: 'Writing'})
                         ]
                    ),
                    'fullName'
                ), this.props.isMobile
            ) : peopleToHtml(people, this.props.isMobile);

        const info = this.props.isMobile ? [
            (
                <div key='mi' className='mobile-info small-6 cell'>
                    <div className='mobile-rating clearfix'>
                        <RatingComponent rating={this.props.rating}/>
                    </div>
                    { boxOfficeHtml(false) }
                    <div className='mobile-release-date'>
                        { convertISODateToRequiredFormat(this.props.releaseDate) }
                    </div>
                    <div className='mobile-genre'>
                        { take(this.props.genres, 2).join(', ') }
                    </div>
                    <div className='mobile-co'>
                        { take(this.props.studios, 1).join(', ') }
                    </div>
                </div>
            ),
            (
                <div key='mrs' className='mobile-rating-stats small-12 cell'>
                    <div className='grid-x grid-margin-x'>
                        <div className='small-6 cell'>
                            { new Intl.NumberFormat().format(this.props.ratingsCounter) } Ratings
                        </div>
                        <div className='small-6 cell'>
                            <LinkToReviews id={this.props.id} type={this.props.type} reviewsCounter={this.props.reviewsCounter}>
                                { new Intl.NumberFormat().format(this.props.reviewsCounter) } Reviews
                            </LinkToReviews>
                        </div>
                    </div>
                </div>
            ),
            (
                <div key='mc' className='mobile-cast small-12 cell'>
                    <div className='section-title'>
                        Cast
                    </div>
                    <div className="grid-x grid-margin-x">
                        { peopleToHtml(this.props.cast, this.props.isMobile) }
                    </div>
                </div>
            ),
            (
                <div key='mc1' className='mobile-creative small-12 cell'>
                    <div className='section-title'>
                        Creative
                    </div>
                    <div className="grid-x grid-margin-x">
                        { crewToHtml(this.props.crew) }
                    </div>
                </div>
            )
        ] : (
            <div className='info large-9 cell'>
                <div className='info'>
                    <div className='title'>{ this.props.title }</div>
                    <div className='date-genre-studio'>
                        <span className='date'>{ convertISODateToRequiredFormat(this.props.releaseDate) }</span>
                        <span className='genre'>{ take(this.props.genres, 3).join(', ') }</span>
                        <span className='studio'>{ take(this.props.studios, 2).join(', ') }</span>
                    </div>
                    { boxOfficeHtml(true) }
                    <div className='rating'>
                        <div>
                            <RatingComponent rating={this.props.rating}/>
                        </div>
                        <div className='rated-by'>
                            <div className='rating-title'>
                                Rated By
                            </div>
                            <div>
                                { new Intl.NumberFormat().format(this.props.ratingsCounter) } users
                            </div>
                        </div>
                        <div className='user-reviews'>
                            <div className='rating-title'>
                                User Reviews
                            </div>
                            <div>
                                <LinkToReviews id={this.props.id} type={this.props.type} reviewsCounter={this.props.reviewsCounter}>
                                    { new Intl.NumberFormat().format(this.props.reviewsCounter) } reviews
                                </LinkToReviews>
                            </div>
                        </div>
                    </div>
                    <div className='cast'>
                        <div className='title'>
                            Cast
                        </div>
                        <div className="grid-x grid-margin-x">
                            { peopleToHtml(this.props.cast, this.props.isMobile) }
                        </div>
                    </div>
                    <div className='crew'>
                        <div className='title'>
                            Creative
                        </div>
                        <div className="grid-x grid-margin-x">
                            { crewToHtml(this.props.crew) }
                        </div>
                    </div>
                </div>
            </div>
        );

        const output = [
            (
                <div key="dicc" className='detailed-info-component-container grid-container'>
                    <div className='grid-x grid-margin-x'>
                        <div className='image small-6 large-3 cell'>
                            <ResponsiveImageComponent
                                imageItems={this.props.posterImage}
                                defaultImage={"/public/MoviesShows500.svg"}
                                sizes={"50vw"}
                            />
                        </div>
                        { info }
                    </div>
                </div>
            )
        ];

        if (!this.props.isTestFinished && this.props.type && this.props.id) {
            output.unshift(
                (<div className="take-the-test-link-container grid-container">
                    <a href="#take-the-test">Take The DuVernay Test!</a>
                </div>)
            );
        }

        return output;
    }
}

export default DetailedInfoComponent;