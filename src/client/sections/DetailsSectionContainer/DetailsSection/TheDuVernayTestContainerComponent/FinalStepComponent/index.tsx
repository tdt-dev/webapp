import "./styles.scss"

import * as React from "react";
import RatingComponent, {Ratings} from "../../../../HomeSectionContainer/HomeSection/RecentRatingsBlock/RecentRatingsComponent/RecentRatingsItemComponent/RatingComponent";
import {generateFacebookSharingUrl, generateTwitterSharingUrl} from "../../../../../services/social";
import {Rating} from "../../../../../reducers/ratings";
import {createReCaptcha, executeReCaptcha, resetReCaptcha} from "../../../../../services/grecaptcha";

export interface FinalStepComponentProps {
    title: string;
    backdropImage: string;
    usersRating: Ratings;
    isUserAuthenticated: Boolean;
    initFinalStep: Function;
    sendReviewAndOpenReviewsPage: Function;
    didUserLeftComment: Boolean;
    ratingObject: Rating;
    signOutHandler: Function;
    isAuthenticatedByGoogle: boolean;
}

interface FinalStepComponentState {
    review: string;
}

class FinalStepComponent extends React.Component<FinalStepComponentProps, FinalStepComponentState> {
    private grecaptchaId: any;

    constructor(props: FinalStepComponentProps) {
        super(props);
        this.state = {
            review: ""
        };
    }

    componentDidMount() {
        this.props.initFinalStep(this.props.isUserAuthenticated);

        createReCaptcha('recaptcha-container', this.sendReviewAndOpenReviewsPage.bind(this))
            .then((id: any) => this.grecaptchaId = id);
    }

    sendReviewAndOpenReviewsPage(token: any) {
        resetReCaptcha(this.grecaptchaId);
        if (this.state.review) {
            this.props.sendReviewAndOpenReviewsPage(this.state.review, this.props.ratingObject, token);
        }
    }

    handleReviewTextBoxChange(event: React.FormEvent<HTMLTextAreaElement>) {
        this.setState({review: event.currentTarget.value});
    }

    private signOut() {
        this.props.signOutHandler(this.props.isAuthenticatedByGoogle);
    }

    render() {
        const title = `Take The DuVernay Test for ${this.props.title}`;
        const description = `Take The DuVernay Test for ${this.props.title} -- rate it based on racial representation!`;

        const facebookUrl = generateFacebookSharingUrl(
            window.location.href,
            title,
            description,
            this.props.backdropImage
        );

        const twitterUrl = generateTwitterSharingUrl(
            window.location.href,
            `Take The DuVernay Test for ${this.props.title} -- rate it based on racial representation!`
        );

        return (
            <div className="final-step-container grid-container">
                <div id='recaptcha-container'/>
                <div className='sign-out'>
                    <button title='Sign Out' onClick={this.signOut.bind(this)}>
                        <i className='fa fa-sign-out'/>
                    </button>
                </div>
                <div className='grid-x grid-margin-x'>
                    <div className='large-6 small-12 cell'>
                        <div className='users-rating-block'>
                            <div className='final-step-label'>
                                Thank you for taking this test!
                            </div>
                            <div className='final-step-label'>
                                This is what you scored <span className='title'>{this.props.title}</span>:
                            </div>
                            <div>
                                <RatingComponent rating={this.props.usersRating}/>
                            </div>
                        </div>
                    </div>
                    <div className='large-6 small-12 cell'>
                        <div className='social-block'>
                            <div className='social-label'>
                                Do your friends agree?
                            </div>
                            <div className='social-label'>
                                Ask them!
                            </div>
                            <div className='float-center social-links-container'>
                                <a href={twitterUrl} target="_blank">
                                    <i className="fa fa-twitter" aria-hidden="true"/>
                                </a>
                                <a href={facebookUrl} target="_blank">
                                    <i className="fa fa-facebook" aria-hidden="true"/>
                                </a>
                            </div>
                        </div>
                    </div>
                    {
                        !this.props.didUserLeftComment ? (
                            <div className='large-12 small-12 cell'>
                                <div className='review-block'>
                                    <div className='final-step-label'>
                                        How did <span className='title'>{this.props.title}</span> do on race and diversity? Write a review (optional):
                                    </div>
                                    <div className='final-step-label'>
                                        <textarea
                                            onChange={this.handleReviewTextBoxChange.bind(this)}
                                            value={this.state.review}
                                            placeholder="Please be respectful. Any language with the intent to discriminate is not permitted."
                                        />
                                    </div>
                                    <div className='navigation'>
                                        <button
                                            className='next-button'
                                            onClick={() => executeReCaptcha(this.grecaptchaId)}
                                            disabled={!this.state.review}
                                        >
                                            Next
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : null
                    }
                </div>
            </div>
        );
    }
}

export default FinalStepComponent;