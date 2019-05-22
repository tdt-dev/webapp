import "./styles.scss";

import * as React from "react";
import DetailedInfoComponent from "./DetailedInfoComponent/index";
import TheDuVernayTestContainerComponent, {TheDuVernayTestContainerComponentProps} from "./TheDuVernayTestContainerComponent/index";
import HeaderContainer from "GlobalComponents/HeaderContainer";
import FooterContainer from "GlobalComponents/FooterContainer";
import BreadcrumbsComponent from "../../SearchSectionContainer/SearchSection/BreadcrumbsComponent";
import {trackPageView} from "../../../services/googleAnalytics";

interface DetailsSectionProps extends TheDuVernayTestContainerComponentProps {
    init: Function;
    initSecured: Function;
    hasDetails: boolean;
    isMobile?: boolean;
    type: string;
    id: number;
}

class DetailsSection extends React.Component<DetailsSectionProps, {}> {
    componentDidMount() {
        this.props.init(this.props.isUserAuthenticated, this.props.hasDetails);
        window.scrollTo(0, 0);

        trackPageView(`/details/${this.props.type}/${this.props.id}/`);
    }

    render() {
        return (
            <div className="details-section-container">
                <HeaderContainer/>
                { this.props.isMobile ?
                    (<BreadcrumbsComponent
                        type={ this.props.type }
                        title={ this.props.title }
                    />) : null
                }
                <DetailedInfoComponent {...this.props}/>
                <TheDuVernayTestContainerComponent {...this.props}/>
                <FooterContainer/>
                <div className='left-border'/>
            </div>
        );
    }
}

export default DetailsSection;