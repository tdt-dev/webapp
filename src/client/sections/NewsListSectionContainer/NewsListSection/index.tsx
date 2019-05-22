import "./styles.scss"

import * as React from "react";
import HeaderContainer from "GlobalComponents/HeaderContainer";
import BreadcrumbsComponent from "../../SearchSectionContainer/SearchSection/BreadcrumbsComponent/index";
import {News} from "../../../reducers/news";

import { map } from "lodash"
import FooterContainer from "GlobalComponents/FooterContainer";
import {trackPageView} from "../../../services/googleAnalytics";
import NewsItemComponent from "../../HomeSectionContainer/HomeSection/RecentNewsComponent/NewsItemComponent";

export interface NewsListSectionProps {
    news: News[],
    requestingNews: boolean,
    init: Function
}

class NewsListSection extends React.Component<NewsListSectionProps> {
    componentDidMount() {
        this.props.init();
        window.scrollTo(0, 0);

        trackPageView(`/news/`);
    }

    render() {
        const newsHtml = map(this.props.news, (i) =>
            (
                <div className="cell">
                    <NewsItemComponent
                        key={`news${i._id}`}
                        title={i.title}
                        description={i.description}
                        link={i.link}
                        author={i.author}
                        date={i.date}
                        imageUrl={i.image_url}
                        isMobile={false}
                        publication={i.publication}
                    />
                </div>
            )
        );

        return (
            <div className='news-list-container'>
                <HeaderContainer/>
                <BreadcrumbsComponent type='News' title='Latest'/>
                <div className='grid-container'>
                    <div className='grid-x grid-margin-x items'>
                        { newsHtml }
                    </div>
                </div>
                <FooterContainer/>
                <div className='left-border'/>
            </div>
        );
    }
}

export default NewsListSection