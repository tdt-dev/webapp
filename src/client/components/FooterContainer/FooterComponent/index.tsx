import "./styles.scss"

import * as React from "react";
import SubscriptionBannerComponent from "../../../sections/HomeSectionContainer/HomeSection/RecentNewsComponent/SubscriptionBannerComponent/index";
import MobileFooterSocialComponent from "GlobalComponents/FooterContainer/FooterComponent/MobileFooterSocialComponent/index";
import {Link} from "react-router-dom";

interface FooterComponentProps {
    isMobile?: boolean,
    sendSubscriptionForm?: Function
}

class FooterComponent extends React.Component<FooterComponentProps, {}> {
    render() {
        return this.props.isMobile ? (
            <div className="mobile-footer-component grid-container full">
                <SubscriptionBannerComponent
                    isMobile={this.props.isMobile}
                    sendSubscriptionForm={this.props.sendSubscriptionForm}
                />
                <MobileFooterSocialComponent/>
                <div className='footer'>
                    <div className="grid-x">
                        <div className="small-full cell">
                            <span className="title">The DuVernay Test</span>
                        </div>
                    </div>
                    <div className="grid-x links">
                        <div className="small-6 cell">
                            <Link to="/about/">About</Link>
                        </div>
                        <div className="small-6 cell">
                            <Link to="/about/ContactUs/">Contact</Link>
                        </div>
                    </div>
                </div>
            </div>
        ) : (
            <div className="desktop-footer-component grid-container fluid">
                <div className="grid-x grid-margin-x">
                    <div className="large-10 cell">
                        <span className="title">The DuVernay Test</span>
                        <span className="social">
                            <a href="https://twitter.com/duvernaytestorg" target="_blank">
                                <i className="fa fa-twitter" aria-hidden="true"/>
                            </a>
                            <a href="https://www.facebook.com/TheDuVernayTest/" target="_blank">
                                <i className="fa fa-facebook" aria-hidden="true"/>
                            </a>
                            <a href="https://www.instagram.com/theduvernaytest/" target="_blank">
                                <i className="fa fa-instagram" aria-hidden="true"/>
                            </a>
                        </span>
                    </div>
                    <div className="large-2 cell footer-links">
                        <Link to="/about/">About</Link>
                        <Link to="/about/ContactUs/">Contact</Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default FooterComponent;