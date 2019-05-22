import {Person, PersonsAction, RECEIVED_PERSONS} from "../actions/persons";
import {reduce} from "lodash";

export interface PersonsMap {
    [id: number]: Person
}

interface PersonsState {
    personsById: PersonsMap;
}

const defaultState: PersonsState = {
    personsById: {}
};

export default function persons(state: PersonsState = defaultState, action: PersonsAction): PersonsState {
    switch (action.type) {

        case RECEIVED_PERSONS:
            return {
                ...state,
                personsById: reduce(action.persons, (r, v, k) => ({...r, [v.id]: v}), state.personsById)
            };
        default:
            return state;
    }
}