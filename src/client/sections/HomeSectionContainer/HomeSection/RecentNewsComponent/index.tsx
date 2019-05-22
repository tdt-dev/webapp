import './styles.scss'

import * as React from 'react';
import SubscriptionBannerComponent from "./SubscriptionBannerComponent/index";
import NewsItemComponent from "./NewsItemComponent/index";
import {News} from "../../../../reducers/news";
import {Link} from "react-router-dom";

interface RecentNewsComponentProps {
    news: News[];
    sendSubscriptionForm: Function;
    isMobile: boolean;
}

class RecentNewsComponent extends React.Component<RecentNewsComponentProps, {}> {
    render() {
        return (
            <div className='recent-news-container'>
                <div className='grid-container full'>
                    <div className='grid-x grid-padding-x'>
                        <div className='large-8 cell'>
                            <Link to={"/news/"}>
                                <h2>News</h2>
                            </Link>
                            {
                                this.props.news.map((v) => {
                                    return (<NewsItemComponent
                                        key={ v._id }
                                        title={ v.title }
                                        description={ v.description }
                                        imageUrl={ v.image_url }
                                        link={ v.link }
                                        isMobile={ this.props.isMobile }
                                        author={ v.author }
                                        publication={ v.publication }
                                        date={ v.date }
                                    />);
                                })
                            }
                            <div className={'show-more cell small-12'}>
                                <Link to={"/news/"}>Show More</Link>
                            </div>
                        </div>
                        {
                            this.props.isMobile ? null : (
                                <div className='large-4 cell news-subscription-form'>
                                    <SubscriptionBannerComponent sendSubscriptionForm={this.props.sendSubscriptionForm}/>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default RecentNewsComponent;