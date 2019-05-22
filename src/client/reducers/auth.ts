import {
    AuthAction, RECEIVED_FACEBOOK_AUTH, RECEIVED_GOOGLE_AUTH, REQUESTING_FACEBOOK_AUTH,
    REQUESTING_GOOGLE_AUTH, SET_AUTH_STATE, SIGN_OUT
} from "../actions/auth";

export interface AuthState {
    isAuthenticated: Boolean;
    token: string;
    requestingFacebookAuth: Boolean;
    requestingGoogleAuth: Boolean;
    isAuthenticatedByGoogle: Boolean;
    isAuthenticatedByFacebook: Boolean;
}

const defaultState: AuthState = {
    isAuthenticated: false,
    token: "",
    requestingFacebookAuth: false,
    requestingGoogleAuth: false,
    isAuthenticatedByGoogle: false,
    isAuthenticatedByFacebook: false
};

export default function auth(state: AuthState = defaultState, action: AuthAction) {
    switch (action.type) {
        case REQUESTING_FACEBOOK_AUTH:
            return {
                ...state,
                requestingFacebookAuth: true
            };
        case RECEIVED_FACEBOOK_AUTH:
            return {
                ...state,
                isAuthenticated: action.isAuthenticated,
                token: action.token,
                requestingFacebookAuth: false,
                isAuthenticatedByFacebook: false
            };
        case REQUESTING_GOOGLE_AUTH:
            return {
                ...state,
                requestingGoogleAuth: true
            };
        case RECEIVED_GOOGLE_AUTH:
            return {
                ...state,
                isAuthenticated: action.isAuthenticated,
                token: action.token,
                requestingGoogleAuth: false,
                isAuthenticatedByGoogle: true
            };
        case SIGN_OUT:
            return {
                ...state,
                isAuthenticated: false,
                token: ""
            };
        case SET_AUTH_STATE:
            return {
                ...state,
                ...action.authState
            };
        default:
            return state;
    }
}