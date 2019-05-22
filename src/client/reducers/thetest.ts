import {
    REQUESTING_QUESTIONS, TheTestAction, RECEIVED_QUESTIONS, REQUESTING_ANSWERS,
    RECEIVED_MOVIE_ANSWERS, RECEIVED_SHOW_ANSWERS, SELECT_ANSWER, NEXT_MOVIE_QUESTION,
    PREVIOUS_MOVIE_QUESTION, NEXT_SHOW_QUESTION, PREVIOUS_SHOW_QUESTION
} from "../actions/thetest";

import { set, size, find, findIndex, slice } from 'lodash';

export interface QuestionOptions {
    answer: string;
    points: number;
}

export interface Question {
    _id: string;
    header: string;
    question: string;
    helptext: string;
    options: QuestionOptions[];
}

export interface Answer {
    questionId: string;
    answer: number;
}

export interface AnswersMap {
    [id: number]: Answer[];
}

export interface TheTestState {
    questions: Question[];
    movieAnswers: AnswersMap;
    showAnswers: AnswersMap;
    requestingQuestions: Boolean;
    requestingAnswers: Boolean;
    activeAnswer: number | null;
    activeQuestion: number;
}

const defaultState: TheTestState = {
    questions: [],
    movieAnswers: {},
    showAnswers: {},
    requestingQuestions: false,
    requestingAnswers: false,
    activeAnswer: null,
    activeQuestion: 0
};

function getNextActiveQuestion(activeQuestion: number, questions: Question[]) {
    return activeQuestion !== questions.length - 1 ? activeQuestion + 1 : questions.length - 1
}

function getPreviousActiveQuestion(activeQuestion: number) {
    return activeQuestion !== 0 ? activeQuestion - 1 : 0;
}

function getActiveAnswer(answers: Answer[], question: Question): number {
    const answer = find(answers, {questionId: question._id});

    return answer ? answer.answer : null;
}

function buildAnswer(answers: Answer[] = [], question: number, answer: number, questions: Question[]) {
    const indexOfAnswer = findIndex(answers, {questionId: questions[question]._id});
    const item = {
        questionId: questions[question]._id,
        answer: answer
    };

    return indexOfAnswer === -1
        ? [ ...answers, item ]
        : [
            ...slice(answers,0, indexOfAnswer),
            item,
            ...slice(answers, indexOfAnswer + 1)
        ];
}

export default function thetest(state: TheTestState = defaultState, action: TheTestAction): TheTestState {
    switch (action.type) {
        case REQUESTING_QUESTIONS:
            return {
                ...state,
                requestingQuestions: true
            };
        case RECEIVED_QUESTIONS:
            return {
                ...state,
                questions: action.questions,
                requestingQuestions: false
            };
        case REQUESTING_ANSWERS:
            return {
                ...state,
                requestingAnswers: true,
            };
        case RECEIVED_MOVIE_ANSWERS:
            return {
                ...state,
                movieAnswers: set(state.movieAnswers, action.itemId, action.answers),
                requestingAnswers: false,
                activeQuestion: size(action.answers) && size(action.answers) - 1,
                activeAnswer: size(action.answers) ? action.answers[size(action.answers) - 1].answer : null
            };
        case RECEIVED_SHOW_ANSWERS:
            return {
                ...state,
                showAnswers: set(state.showAnswers, action.itemId, action.answers),
                requestingAnswers: false,
                activeQuestion: size(action.answers) && size(action.answers) - 1,
                activeAnswer: size(action.answers) ? action.answers[size(action.answers) - 1].answer : null
            };
        case SELECT_ANSWER:
            return {
                ...state,
                activeAnswer: action.activeAnswer
            };
        case NEXT_MOVIE_QUESTION:
            const activeMovieQuestionNext = getNextActiveQuestion(state.activeQuestion, state.questions);

            return {
                ...state,
                activeQuestion: activeMovieQuestionNext,
                activeAnswer: getActiveAnswer(state.movieAnswers[action.itemId], state.questions[activeMovieQuestionNext]),
                movieAnswers: {
                    ...state.movieAnswers,
                    [action.itemId]: buildAnswer(state.movieAnswers[action.itemId], state.activeQuestion, state.activeAnswer, state.questions)
                }
            };
        case PREVIOUS_MOVIE_QUESTION:
            const activeMovieQuestionPrevious = getPreviousActiveQuestion(state.activeQuestion);

            return {
                ...state,
                activeQuestion: activeMovieQuestionPrevious,
                activeAnswer: getActiveAnswer(state.movieAnswers[action.itemId], state.questions[activeMovieQuestionPrevious])
            };
        case NEXT_SHOW_QUESTION:
            const activeShowQuestionNext = getNextActiveQuestion(state.activeQuestion, state.questions);

            return {
                ...state,
                activeQuestion: activeShowQuestionNext,
                activeAnswer: getActiveAnswer(state.showAnswers[action.itemId], state.questions[activeShowQuestionNext]),
                showAnswers: {
                    ...state.showAnswers,
                    [action.itemId]: buildAnswer(state.showAnswers[action.itemId], state.activeQuestion, state.activeAnswer, state.questions)
                }
            };
        case PREVIOUS_SHOW_QUESTION:
            const activeShowQuestionPrevious = getPreviousActiveQuestion(state.activeQuestion);

            return {
                ...state,
                activeQuestion: activeShowQuestionPrevious,
                activeAnswer: getActiveAnswer(state.showAnswers[action.itemId], state.questions[activeShowQuestionPrevious])
            };
        default:
            return state;
    }
}