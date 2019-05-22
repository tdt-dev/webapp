import {connect, MapDispatchToProps, MapStateToProps} from "react-redux";

import HeaderComponent from "./HeaderComponent/index";
import {changeSearchRequest} from "../../actions/search";
import {push} from "react-router-redux";

const mapStateToProps: MapStateToProps<{}, {}, any> = (state) => {
    return {
        searchValue: state.search.searchRequest,
        isLargeDesktop: state.browser.lessThan.infinity,
        isSmallDesktop: state.browser.lessThan.extraLarge,
        isMobile: state.browser.lessThan.large,
        pathname: state.router.location.pathname
    };
};

const mapDispatchToProps: MapDispatchToProps<{}, {}> = (dispatch) => {
    return {
        onChangeSearchRequest: (e: any) => dispatch(changeSearchRequest(e.target.value)),
        onClickSearchButton: (request: string) => request.length && dispatch(push(`/search/${request}/`))
    };
};

const HeaderContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(HeaderComponent);

export default HeaderContainer;