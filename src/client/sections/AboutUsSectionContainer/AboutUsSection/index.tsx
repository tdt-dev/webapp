import "./styles.scss"

import * as React from "react"
import HeaderContainer from "GlobalComponents/HeaderContainer";
import ContactUsFormComponent, {ContactUsFormComponentProps} from "./ContactUsFormComponent/index";
import FooterContainer from "GlobalComponents/FooterContainer";
import {DoContactUs} from "../index";
import {trackPageView} from "../../../services/googleAnalytics";

interface AboutUsSectionProps extends ContactUsFormComponentProps {
    isMobile: boolean;
    doContactUs: DoContactUs;
}

class AboutUsSection extends React.Component<AboutUsSectionProps, {}> {
    private formContainerRef: HTMLDivElement;

    componentDidMount() {
        if (this.props.doContactUs === "ContactUs") {
            this.formContainerRef.scrollIntoView(true);
        } else {
            window.scrollTo(0, 0);
        }

        trackPageView('/about/');
    }

    render() {
        return (
            <div className="about-us-container">
                <HeaderContainer/>
                <div className='grid-container'>
                    <div className='grid-x grid-margin-x items'>
                        <div className='large-12 cell about-us-body'>
                            <p>
                                Named after the director and creator <a href="http://www.avaduvernay.com/" target="_blank"><b>Ava DuVernay</b></a>, and first coined by New York Times
                                film critic <a href="https://www.nytimes.com/2016/01/30/movies/sundance-fights-tide-with-films-like-the-birth-of-a-nation.html?smprod=nytcore-ipad&smid=nytcore-ipad-share&_r=0" target="_blank"><b>Manohla Darghis</b></a>
                                , The DuVernay Test aims to measure racial representation in film and television by
                                having you and everyone you know answer a five question test. The scope of the test
                                intends to cover the core issues of how race is represented in entertainment, factoring
                                in casting decisions, power dynamics between roles, depth of character development,
                                stereotypes, and authenticity of the creative team.
                            </p>

                            <p>
                                Hollywood’s power to create and distribute certain narratives has undeniable influence
                                on our collective conscious. The DuVernay Test helps keep the industry in check by
                                revealing those movies and shows that could do better on racial representation and
                                strengthening the argument for why genuine diversity and inclusion is so important.
                            </p>

                            <p>
                                The more you take tests -- and tell all your friends, fellow fans and fellow haters to
                                take tests too -- the more accurate we can get about showing the industry how it’s
                                acing it, merely passing, or straight up failing.
                            </p>

                            <p className='disclaimer'>
                                The DuVernay Test methodology can be viewed on <a href="https://github.com/theduvernaytest/apiapp/blob/master/src/services/ratingService.ts#L33-L50" target="_blank">GitHub</a>.
                            </p>

                            <p className='disclaimer'>
                                The DuVernay Test is not officially associated with Ava DuVernay, does not receive any
                                profit or funding, and is not an academically certified instrument. This is a grassroots
                                creation and an effort powered by people like you.
                            </p>

                            <p className='disclaimer'>
                                <a href="https://www.themoviedb.org/" target="_blank">
                                    <img
                                        src="https://www.themoviedb.org/assets/1/v4/logos/primary-blue-40c00543e47b657e8e53a2f3e8650eb9de230316cf158965edb012d72ddca755.svg"
                                        width="71px"
                                        height="63px"
                                    />
                                </a> The DuVernay Test uses the TMDb API but is not endorsed or certified by TMDb.
                            </p>
                        </div>
                    </div>
                </div>
                <div ref={ (r) => this.formContainerRef = r }>
                    <ContactUsFormComponent sendContactUsForm={this.props.sendContactUsForm}/>
                </div>
                <FooterContainer/>

                <div className='left-border'/>
            </div>
        );
    }
}

export default AboutUsSection;