import {Action} from "redux";

export const RECEIVED_PERSONS = 'RECEIVED_PERSONS';

export interface Person {
    profile_image: string;
    id: number;
    name: string;
}

export interface PersonsAction extends Action {
    persons?: Person[];
}

export function receivedPersons(persons: Person[]) {
    return {
        type: RECEIVED_PERSONS,
        persons
    }
}