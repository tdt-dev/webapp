import AboutUsSection from "./AboutUsSection/index";
import {connect, MapDispatchToProps, MapStateToProps} from "react-redux";
import {asyncSendContactUsForm} from "../../actions/aboutus";

export type DoContactUs = "ContactUs" | null;

interface AboutUsSectionContainerProps {
    match: {
        params: {
            doContactUs: DoContactUs;
        }
    };
}

const mapStateToProps: MapStateToProps<{}, {}, any> = (state, ownProps: AboutUsSectionContainerProps) => {
    return {
        isMobile: state.browser.lessThan.large,
        doContactUs: ownProps.match.params.doContactUs
    }
};

const mapDispatchToProps: MapDispatchToProps<{}, {}> = (dispatch) => {
    return {
        sendContactUsForm: (firstName: string, lastName: string, email: string, message: string, recaptchaToken: string) => {
            dispatch(asyncSendContactUsForm(firstName, lastName, email, message, recaptchaToken));
        }
    };
};

const AboutUsSectionContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(AboutUsSection);

export default AboutUsSectionContainer;