import "./styles.scss";

import * as React from "react";
import {EventHandler} from "react";
import {createReCaptcha, executeReCaptcha, resetReCaptcha} from "../../../../../services/grecaptcha";

export interface QuestionOptions {
    answer: string;
    points: number;
}

export interface TheDuVernayTestComponentProps {
    questionId: string;
    header: string;
    title: string;
    question: string;
    helptext: string;
    options: QuestionOptions[];
    isBackButtonDisabled: boolean;
    isNextButtonDisabled: boolean;
    totalQuestions: number;
    currentQuestion: number;
    selectedAnswer: number;
    backButtonHandler: EventHandler<any>;
    nextButtonHandler: Function;
    answerHandler: Function;
    signOutHandler: Function;
    isAuthenticatedByGoogle: boolean;
    scrollToContainerTop: () => void;
}

const calculateProgressBar = (current: number, total: number) => {
    return (current + 1) * (100 / total);
};

class TheDuVernayTestComponent extends React.Component<TheDuVernayTestComponentProps, {}> {
    private grecaptchaId: any;

    constructor(props: TheDuVernayTestComponentProps) {
        super(props);
    }

    private finalHandler(token: string) {
        resetReCaptcha(this.grecaptchaId);
        this.nextHandler(token);
    }

    private nextHandler(token?: string) {
        this.props.nextButtonHandler(this.props.questionId, this.props.selectedAnswer, token);
        this.props.scrollToContainerTop();
    }

    private backHandler(event: EventHandler<any>) {
        this.props.backButtonHandler(event);
        this.props.scrollToContainerTop();
    }

    private signOut() {
        this.props.signOutHandler(this.props.isAuthenticatedByGoogle);
        this.props.scrollToContainerTop();
    }

    private static isItFinalQuestion(current: number, total: number) {
        return current + 1 === total
    }

    componentDidMount() {
        createReCaptcha('recaptcha-container', this.finalHandler.bind(this))
            .then((id: any) => this.grecaptchaId = id);
    }

    render() {
        const getButtonClass = (i: number) => {
            return this.props.selectedAnswer === i ? 'active' : '';
        };

        const optionsHtml = this.props.options ? this.props.options.map((v: any, i: any) => (
            <div className='answer-option' key={i}>
                <button className={ getButtonClass(i) } onClick={() => this.props.answerHandler(i)}>{ v.answer }</button>
            </div>
        )) : null;

        return (
            <div
                id="take-the-test"
                className="the-duvernay-test-component-container grid-container"
            >
                <div id='recaptcha-container'/>
                <div className='sign-out'>
                    <button title='Sign Out' onClick={this.signOut.bind(this)}>
                        <i className='fa fa-sign-out'/>
                    </button>
                </div>
                <div className='grid-x'>
                    <div className='large-12 cell'>
                        <div className='question-header'>
                            { this.props.header }
                        </div>
                        <div className='title'>
                            <span className='static-part'>The DuVernay Test</span>
                            <span>&nbsp;/&nbsp;</span>
                            <span>{ this.props.title }</span>
                        </div>
                        <div className='question'>
                            { this.props.question }
                        </div>
                        <div className='clarification'>
                            { this.props.helptext }
                        </div>
                        <div className='options'>
                            { optionsHtml }
                        </div>
                        <div className='navigation'>
                            <button
                                className='back-button'
                                onClick={this.backHandler.bind(this)}
                                disabled={this.props.isBackButtonDisabled}
                            >
                                Back
                            </button>
                            <button
                                className='next-button'
                                onClick={
                                    () => {
                                        TheDuVernayTestComponent.isItFinalQuestion(this.props.currentQuestion, this.props.totalQuestions) ?
                                            executeReCaptcha(this.grecaptchaId) :
                                            this.nextHandler()
                                    }
                                }
                                disabled={this.props.isNextButtonDisabled}
                            >
                                {
                                    TheDuVernayTestComponent.isItFinalQuestion(this.props.currentQuestion, this.props.totalQuestions) ?
                                        'Finish' :
                                        'Next'
                                }
                            </button>
                        </div>
                    </div>
                </div>
                <div className='progress-bar' style={{width: `${calculateProgressBar(this.props.currentQuestion, this.props.totalQuestions)}%`}}>
                    <span className='progress-label'>{this.props.currentQuestion + 1} of {this.props.totalQuestions}</span>
                </div>
            </div>
        );
    }
}

export default TheDuVernayTestComponent;