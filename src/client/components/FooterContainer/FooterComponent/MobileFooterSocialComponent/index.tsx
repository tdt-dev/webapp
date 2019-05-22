import "./styles.scss"

import * as React from "react"


class MobileFooterSocialComponent extends React.Component<{}, {}> {
    render() {
        return (
            <div className='mobile-footer-social-component'>
                <div className='centered-block'>
                    <a href="https://twitter.com/duvernaytestorg" target="_blank">
                        <i className="fa fa-twitter" aria-hidden="true"/>
                    </a>
                    <a href="https://www.facebook.com/TheDuVernayTest/" target="_blank">
                        <i className="fa fa-facebook" aria-hidden="true"/>
                    </a>
                    <a href="https://www.instagram.com/theduvernaytest/" target="_blank">
                        <i className="fa fa-instagram" aria-hidden="true"/>
                    </a>
                </div>
            </div>
        );
    }
}

export default MobileFooterSocialComponent;