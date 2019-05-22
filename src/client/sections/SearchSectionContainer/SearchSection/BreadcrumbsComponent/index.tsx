import "./styles.scss"

import * as React from "react"

interface BreadcrumbsComponentProps {
    type: string;
    title: string;
}

interface BreadcrumbsComponentState {
    isDropdownActive: boolean;
}

class BreadcrumbsComponent extends React.Component<BreadcrumbsComponentProps, BreadcrumbsComponentState> {
    constructor(props: BreadcrumbsComponentProps) {
        super(props);
        if (this.props.children) {
            this.state = {
                isDropdownActive: false
            };
        }
    }

    triggerDropdown() {
        this.setState({
            isDropdownActive: !this.state.isDropdownActive
        });
    }

    deActivateDropdown() {
        this.setState({
            isDropdownActive: false
        });
    }

    componentWillReceiveProps() {
        this.deActivateDropdown()
    }

    render() {
        const breadcrumbsHtml = (
            <div className='tdt-breadcrumbs'>
                <b>{ this.props.type }</b> / { this.props.title }
            </div>
        );

        const breadcrumbsWithMenuHtml = this.props.children ? (
            <div
                className='tdt-breadcrumbs clickable'
                onClick={this.triggerDropdown.bind(this)}
                onBlur={this.deActivateDropdown.bind(this)}
                tabIndex={0}
            >
                <b>{ this.props.type }</b> / { this.props.title } <i className="fa fa-sort-desc" aria-hidden="true"/>
                { this.state.isDropdownActive && (
                    <div className='breadcrumbs-dropdown'>
                        { this.props.children }
                    </div>
                )}
            </div>
        ) : null;

        return (
            <div className='breadcrumbs-container'>
                <div className='grid-container'>
                    <div className="grid-x grid-margin-x">
                        <div className="cell small-12">
                            { this.props.children ? breadcrumbsWithMenuHtml : breadcrumbsHtml }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default BreadcrumbsComponent;