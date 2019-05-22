import './styles.scss'

import * as React from 'react';
import {createReCaptcha, executeReCaptcha} from "../../../../../services/grecaptcha";

interface SubscriptionBannerComponentProps {
    sendSubscriptionForm: Function;
    isMobile?: boolean;
}

interface SubscriptionBannerComponentState {
    isSent: boolean;
    email: string;
}

class SubscriptionBannerComponent extends React.Component<SubscriptionBannerComponentProps, SubscriptionBannerComponentState>{
    private grecaptchaId: any;

    constructor(props: SubscriptionBannerComponentProps) {
        super(props);
        this.state = {
            isSent: false,
            email: "",
        };
    }

    componentDidMount() {
        createReCaptcha('recaptcha-container', this.sendForm.bind(this))
            .then((id: any) => this.grecaptchaId = id);
    }

    private handleChange(event: React.FormEvent<HTMLInputElement>) {
        this.setState({
            email: event.currentTarget.value
        });
    }

    private sendForm(token: any) {
        this.props.sendSubscriptionForm(this.state.email, token);

        this.setState({
            isSent: true
        });
    }

    render() {
        const formOrThankYouHtml = this.state.isSent ? (
            <div className='banner-subheader'>Welcome to the TDT fam!</div>
        ) : (
            <div className='banner-subscribe-form'>
                <input
                    type='text'
                    onChange={this.handleChange.bind(this)}
                    value={this.state.email}
                    placeholder='enter email address'
                />
                <button onClick={ () => { executeReCaptcha(this.grecaptchaId) } }>Subscribe</button>
            </div>
        );

        return (
            <div className='subscription-banner-container'>
                <div id='recaptcha-container'/>
                <div className='banner-header'>Let’s make Hollywood better.</div>
                <div className='banner-subheader'>Sign up to stay connected and join the action:</div>
                { formOrThankYouHtml }
            </div>
        );
    }
}

export default SubscriptionBannerComponent;