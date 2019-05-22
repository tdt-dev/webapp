import {AuthState} from "../reducers/auth";

const AUTH_OBJECT_KEY = "tdt_auth";

export function saveAuthObjectToStorage(authObject: AuthState) {
    localStorage.setItem(AUTH_OBJECT_KEY, JSON.stringify(authObject));
}

export function getAuthObjectFromStorage(): AuthState {
    return JSON.parse(localStorage.getItem(AUTH_OBJECT_KEY));
}

export function removeAuthObjectFromStorage() {
    localStorage.removeItem(AUTH_OBJECT_KEY);
}