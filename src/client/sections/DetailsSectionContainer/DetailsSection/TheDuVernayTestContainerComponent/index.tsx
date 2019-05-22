import "./styles.scss";

import * as React from "react";
import LoginFormComponent, { LoginFormComponentProps } from "./LoginFormComponent/index";
import TheDuVernayTestComponent, { TheDuVernayTestComponentProps } from "./TheDuVernayTestComponent/index";
import FinalStepComponent from "./FinalStepComponent/index";
import {DetailedInfoComponentProps} from "../DetailedInfoComponent/index";
import {FinalStepComponentProps} from "./FinalStepComponent";

export interface TheDuVernayTestContainerComponentProps
                    extends TheDuVernayTestComponentProps, LoginFormComponentProps,
                            DetailedInfoComponentProps, FinalStepComponentProps {
    _id: string;
    isUserAuthenticated: Boolean;
    isTestFinished: Boolean;
}

class TheDuVernayTestContainerComponent extends React.Component<TheDuVernayTestContainerComponentProps, {}> {
    private containerRef: HTMLDivElement;

    public scrollToContainerTop() {
        this.containerRef && this.containerRef.scrollIntoView(true);
    }

    private getActiveElement() {
        if ( this.props.isUserAuthenticated ) {
            if ( !this.props.isTestFinished ) {
                return (
                    <TheDuVernayTestComponent
                        key={this.props.id}
                        questionId={this.props._id}
                        title={this.props.title}
                        header={this.props.header}
                        question={this.props.question}
                        helptext={this.props.helptext}
                        options={this.props.options}
                        selectedAnswer={this.props.selectedAnswer}
                        isBackButtonDisabled={this.props.isBackButtonDisabled}
                        isNextButtonDisabled={this.props.isNextButtonDisabled}
                        totalQuestions={this.props.totalQuestions}
                        currentQuestion={this.props.currentQuestion}
                        backButtonHandler={this.props.backButtonHandler}
                        nextButtonHandler={this.props.nextButtonHandler}
                        answerHandler={this.props.answerHandler}
                        signOutHandler={this.props.signOutHandler}
                        isAuthenticatedByGoogle={this.props.isAuthenticatedByGoogle}
                        scrollToContainerTop={this.scrollToContainerTop.bind(this)}
                    />);
            } else {
                return (
                    <FinalStepComponent
                        key={this.props.id}
                        title={this.props.title}
                        usersRating={this.props.usersRating}
                        isUserAuthenticated={this.props.isUserAuthenticated}
                        initFinalStep={this.props.initFinalStep}
                        backdropImage={this.props.backdropImage}
                        sendReviewAndOpenReviewsPage={this.props.sendReviewAndOpenReviewsPage}
                        didUserLeftComment={this.props.didUserLeftComment}
                        ratingObject={this.props.ratingObject}
                        signOutHandler={this.props.signOutHandler}
                        isAuthenticatedByGoogle={this.props.isAuthenticatedByGoogle}
                    />);
            }
        } else {
            return (
                <LoginFormComponent
                    loginFacebook={this.props.loginFacebook}
                    loginGoogle={this.props.loginGoogle}
                    applySessionFromStorage={this.props.applySessionFromStorage}
                />
            );
        }
    }

    render() {
        return [
            (<div ref={ (r) => { this.containerRef = r } }/>),
            (<div className="the-duvernay-test-container-component">
                { this.getActiveElement() }
            </div>)
        ];
    }
}

export default TheDuVernayTestContainerComponent;