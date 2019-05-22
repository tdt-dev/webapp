import "./styles.scss"

import * as React from 'react';

interface HeroComponentProps {
    isMobile: boolean;
    activateHintMode: Function;
    deactivateHintMode: Function;
}

interface HeroComponentState {
    isVideoModalOpen: boolean;
}

class HeroComponent extends React.Component<HeroComponentProps, HeroComponentState> {
    constructor(props: HeroComponentProps) {
        super(props);
        this.state = {
            isVideoModalOpen: false,
        };
    }

    closeVideoModal() {
        this.props.deactivateHintMode();
        this.setState(
            {
                isVideoModalOpen: false
            }
        );
    }

    openVideoModal() {
        this.props.activateHintMode();
        this.setState(
            {
                isVideoModalOpen: true
            }
        );
    }

    render() {
        return (
            <div className='hero-container'>
                { this.state.isVideoModalOpen ? (
                    <div
                        className='hint-overflow'
                        onClick={this.closeVideoModal.bind(this)}
                        onScroll={this.closeVideoModal.bind(this)}
                    >
                        <div className="desktop-block">
                            <img className="desktop-arrow-1" src="/public/arrow1.svg"/>
                            <div className="desktop-text-1">Search for anything you want to test!</div>
                            <img className="desktop-arrow-3" src="/public/arrow3.svg"/>
                            <div className="desktop-text-2">Click on any of the latest rated movies & shows</div>
                            <img className="desktop-arrow-2" src="/public/arrow2.svg"/>
                        </div>
                        <div className="mobile-block">
                            <img className="mobile-arrow-7" src="/public/arrow7.svg"/>
                            <div className="mobile-text-1">Click on any of the latest rated movies & shows</div>
                            <img className="mobile-arrow-5" src="/public/arrow5.svg"/>
                            <div className="mobile-right-block">
                                <div className="mobile-text-2">Search for anything you want to test!</div>
                                <img className="mobile-arrow-4" src="/public/arrow4.svg"/>
                            </div>
                        </div>
                    </div>
                ) : null}
                <button className="video-button" onClick={this.openVideoModal.bind(this)}>
                    <img className="desktop-image" src="/public/TDT_Desktop_Hero_5.1.png" width="100%" height="auto"/>
                    <img className="mobile-image" src="/public/TDT_Mobile_Hero_5.1.png" width="100%" height="auto"/>
                </button>
            </div>
        );
    }
}

export default HeroComponent;

