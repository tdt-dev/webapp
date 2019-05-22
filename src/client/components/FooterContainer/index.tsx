import {connect, MapDispatchToProps, MapStateToProps} from "react-redux";
import FooterComponent from "GlobalComponents/FooterContainer/FooterComponent/index";
import {asyncSendSubscriptionForm} from "../../actions/subscribe";

const mapStateToProps: MapStateToProps<{}, {}, any> = (state) => {
    return {
        isMobile: state.browser.lessThan.large
    }
};

const mapDispatchToProps: MapDispatchToProps<{}, {}> = (dispatch) => {
    return {
        sendSubscriptionForm: (email: string, recaptchaToken: string) => dispatch(asyncSendSubscriptionForm(email, recaptchaToken))
    }
};

const FooterContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(FooterComponent);

export default FooterContainer;