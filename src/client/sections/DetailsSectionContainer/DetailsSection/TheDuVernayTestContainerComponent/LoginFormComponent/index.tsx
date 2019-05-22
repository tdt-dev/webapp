import "./styles.scss"

import * as React from "react";
import FacebookLogin from "react-facebook-login";
import GoogleLoginComponent, { GoogleLoginResponse } from "react-google-login";

export interface LoginFormComponentProps {
    loginFacebook: Function;
    loginGoogle: Function;
    applySessionFromStorage: Function;
}

interface FacebookResponse {
    name: string,
    email: string,
    id: string,
    accessToken: string,
    userID: string,
    expiresIn: number,
    signedRequest: string
}

class LoginFormComponent extends React.Component<LoginFormComponentProps, {}> {
    componentDidMount() {
        this.props.applySessionFromStorage();
    }

    private facebookResponse(r: FacebookResponse) {
        this.props.loginFacebook(r.accessToken, r.name, r.email, r.userID);
    }

    private googleResponse(r: GoogleLoginResponse) {
        this.props.loginGoogle(r.getAuthResponse().id_token, r.getBasicProfile().getName());
    }

    render() {
        return (
            <div id="take-the-test" className="login-component-container grid-container">
                <div className='grid-x grid-margin-x'>
                    <div className='large-12 cell'>
                        <div className='title'>
                            <b>Take The DuVernay Test!</b>
                        </div>
                        <div className="grid-x grid-margin-x">
                            <div className='small-12 large-6 cell facebook-button-container'>
                                <FacebookLogin
                                    appId='119223982083782'
                                    fields='name,email'
                                    callback={(r: FacebookResponse) => this.facebookResponse(r)}
                                    cssClass='login-button facebook-button'
                                    icon='fa-facebook'
                                    disableMobileRedirect={true}
                                />
                            </div>
                            <div className='small-12 large-6 cell'>
                                <GoogleLoginComponent
                                    clientId='350502640940-0r6hlpd6ag0latcrj5jrqcmf17ut8b5r.apps.googleusercontent.com'
                                    onSuccess={(r: GoogleLoginResponse) => this.googleResponse(r)}
                                    onFailure={(r: GoogleLoginResponse) => this.googleResponse(r)}
                                    className='login-button google-button'
                                >
                                    <i className="fa fa-google" aria-hidden="true"/>
                                    <span>Login with Google</span>
                                </GoogleLoginComponent>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginFormComponent;