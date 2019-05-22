import {connect, MapDispatchToProps, MapStateToProps} from "react-redux"
import NewsListSection, {NewsListSectionProps} from "./NewsListSection/index"

import { values } from "lodash"
import {asyncRequestNews} from "../../actions/news";

const mapStateToProps: MapStateToProps<{}, NewsListSectionProps, any> = (state) => {
    return {
        news: values(state.news.items),
        requestingNews: state.news.requestingNews
    }
};

const mapDispatchToProps: MapDispatchToProps<{}, NewsListSectionProps> = (dispatch) => {
    return {
        init: () => dispatch(asyncRequestNews()),
    };
};

const NewsListSectionContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(NewsListSection);

export default NewsListSectionContainer