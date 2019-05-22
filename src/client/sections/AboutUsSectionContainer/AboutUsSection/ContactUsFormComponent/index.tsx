import "./styles.scss"

import * as React from "react"
import {createReCaptcha, executeReCaptcha} from "../../../../services/grecaptcha";

export interface ContactUsFormComponentProps {
    sendContactUsForm: Function
}

interface ContactUsFormComponentState {
    isSent: boolean;
    firstName: string;
    lastName: string;
    email: string;
    message: string;
}

class ContactUsFormComponent extends React.Component<ContactUsFormComponentProps, ContactUsFormComponentState> {
    private grecaptchaId: any;

    constructor(props: ContactUsFormComponentProps) {
        super(props);
        this.state = {
            isSent: false,
            firstName: "",
            lastName: "",
            email: "",
            message: ""
        };
    }

    componentDidMount() {
        createReCaptcha('recaptcha-container', this.sendForm.bind(this))
            .then((id: any) => this.grecaptchaId = id);
    }

    private handleChange(field: any) {
        return (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            this.setState({
                [field]:  event.currentTarget.value
            });
        };
    }

    private sendForm(token: any) {
        this.props.sendContactUsForm(
            this.state.firstName,
            this.state.lastName,
            this.state.email,
            this.state.message,
            token
        );

        this.setState({
            isSent: true
        });
    }

    render() {
        const formOrThankYouHTML = this.state.isSent ?
            (
                <div>
                    <h1>Thank you for your feedback!</h1>
                </div>
            )
                :
            (
                <div>
                    <div id='recaptcha-container'/>
                    <div key={0} className='separator'/>
                    <div key={1} className='header-container'>
                        <h1>Contact Us</h1>
                    </div>
                    <div key={2} className='info'>
                        The DuVernay Test will be in constant progress, and feedback is essential. Tell us what you think about the site, the test questions, or about anything else you wanna let us know.
                    </div>
                    <div key={3} className='form clearfix'>
                        <div>
                            <input
                                className='first-name'
                                type='text'
                                placeholder='First*'
                                value={this.state.firstName}
                                onChange={this.handleChange('firstName')}
                            />
                            <input
                                className='last-name'
                                type='text'
                                placeholder='Last*'
                                value={this.state.lastName}
                                onChange={this.handleChange('lastName')}
                            />
                        </div>
                        <div>
                            <input
                                className='email'
                                type='email'
                                placeholder='Email address*'
                                value={this.state.email}
                                onChange={this.handleChange('email')}
                            />
                        </div>
                        <div>
                            <textarea
                                className='message'
                                value={this.state.message}
                                onChange={this.handleChange('message')}
                            />
                        </div>
                        <div>
                            <button className='send-button' onClick={ () => { executeReCaptcha(this.grecaptchaId) } }>
                                Send
                            </button>
                        </div>
                    </div>
                </div>
            );

        return (
            <div className='contact-us-form-container'>
                <div className='grid-container'>
                    <div className='grid-x grid-margin-x'>
                        <div className='large-12 cell'>
                            { formOrThankYouHTML }
                            <div key={4} className='press-inquiries'>
                                <div><b>Press Inquiries</b></div>
                                <div>Please contact press@theduvernaytest.org</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ContactUsFormComponent;