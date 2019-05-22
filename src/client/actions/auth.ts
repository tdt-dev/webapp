import {Action} from "redux";
import {Dispatch} from "react-redux";
import {facebookLogin, googleLogin} from "../services/rest";
import {getAuthObjectFromStorage, removeAuthObjectFromStorage, saveAuthObjectToStorage} from "../services/localStorage";
import {AuthState} from "../reducers/auth";

export const REQUESTING_FACEBOOK_AUTH = 'REQUESTING_FACEBOOK_AUTH';
export const RECEIVED_FACEBOOK_AUTH = 'RECEIVED_FACEBOOK_AUTH';
export const REQUESTING_GOOGLE_AUTH = 'REQUESTING_GOOGLE_AUTH';
export const RECEIVED_GOOGLE_AUTH = 'RECEIVED_GOOGLE_AUTH';
export const SIGN_OUT = 'SIGN_OUT';
export const SET_AUTH_STATE = 'SET_AUTH_STATE';

export const SUCCESS = 'Succeed';

export interface AuthAction extends Action {
    token: string;
    isAuthenticated: Boolean;
    authState?: AuthState;
}

function requestingFacebookAuth() {
    return {
        type: REQUESTING_FACEBOOK_AUTH
    }
}

function receivedFacebookAuth(token: string, isAuthenticated: Boolean) {
    return {
        type: RECEIVED_FACEBOOK_AUTH,
        isAuthenticated,
        token
    }
}

function requestingGoogleAuth() {
    return {
        type: REQUESTING_GOOGLE_AUTH
    }
}

function receivedGoogleAuth(token: string, isAuthenticated: Boolean) {
    return {
        type: RECEIVED_GOOGLE_AUTH,
        isAuthenticated,
        token
    }
}

function signOut() {
    return {
        type: SIGN_OUT
    }
}

function setAuthState(authState: AuthState) {
    return {
        type: SET_AUTH_STATE,
        authState
    }
}

export function applySessionFromStorage() {
    return (dispatch: Dispatch<AuthAction>) => {
        const storedAuthState = getAuthObjectFromStorage();

        dispatch(setAuthState(storedAuthState));

        return storedAuthState && storedAuthState.isAuthenticated;
    }
}

export function signOutAndClearSessionStorage() {
    return (dispatch: Dispatch<AuthAction>) => {
        removeAuthObjectFromStorage();
        return dispatch(signOut());
    }
}

export function asyncFacebookLogin(facebookToken: string, name: string, email: string, userId: string){
    return (dispatch: Dispatch<AuthAction>) => {
        dispatch(requestingFacebookAuth());
        return facebookLogin(facebookToken, name, email, userId)
            .then((auth) => {
                dispatch(receivedFacebookAuth(auth.token, auth.status === SUCCESS));
            })
    }
}

export function asyncGoogleLogin(googleToken: string, name: string){
    return (dispatch: Dispatch<AuthAction>) => {
        dispatch(requestingGoogleAuth());
        return googleLogin(googleToken, name)
            .then((auth) => {
                dispatch(receivedGoogleAuth(auth.token, auth.status === SUCCESS));
            })
    }
}

export function asyncSaveSessionToLocalStorage() {
    return (dispatch: Dispatch<AuthAction>, getState: Function) => {
        const auth = getState().auth;
        saveAuthObjectToStorage(auth);
    }
}