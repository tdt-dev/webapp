import * as React from 'react';

import './styles.scss';
import {
    Link
} from 'react-router-dom'
import * as Waypoint from 'react-waypoint';

// TODO figure out what's going on with TS when the properties are mandatory (as they should be)
interface HeaderComponentProps {
    onChangeSearchRequest?: React.ChangeEventHandler<HTMLInputElement>;
    onClickSearchButton?: Function;
    searchValue?: string;
    isLargeDesktop?: boolean;
    isSmallDesktop?: boolean;
    isMobile?: boolean;
    pathname?: string;
}

interface HeaderComponentState {
    isSearchActive: boolean;
    isFloating: boolean;
}

class HeaderComponent extends React.Component<HeaderComponentProps, HeaderComponentState> {
    constructor(props: HeaderComponentProps) {
        super(props);
        this.state = {
            isSearchActive: false,
            isFloating: false
        };
    }

    private showSearchBar() {
        this.setState({
           isSearchActive: true
        });
    }

    private hideSearchBar() {
        this.setState({
           isSearchActive: false
        });
    }

    fixedHeader() {
        if (this.state.isFloating) {
            this.setState({
                isFloating: false
            });
        }
    }

    floatingHeader() {
        if (!this.state.isFloating) {
            this.setState({
                isFloating: true
            });
        }
    }

    render() {
        const HOME = "/";
        const MOVIES = "/movies/";
        const SHOWS = "/shows/";
        const NEWS = "/news/";
        const ABOUT = "/about/";

        const generateNavigationElement = (path: string, label: string | JSX.Element, currentPath: string) => {
            return path === currentPath ? (<span className='active'>{label}</span>) : label ;
        };

        const FixedWaypoint = (Waypoint as any).default;

        const fullLogo = (<span>The D<span className='logo-u'>u</span>Vernay Test</span>);
        const shortLogo = (<span>TDT</span>);

        const logo = this.props.isLargeDesktop ? shortLogo : fullLogo;

        const desktopHeader = (
            <div>
                <FixedWaypoint onEnter={this.fixedHeader.bind(this)}/>
                <FixedWaypoint onLeave={this.floatingHeader.bind(this)}>
                    <header className={'desktop-header-styles' + (this.state.isFloating ? ' floating-header' : '')}>
                        <div className='menu-centered'>
                            <ul className={['menu', this.props.isSmallDesktop ? 'small-desktop' : ''].join(' ')}>
                                <li>
                                    <Link to={ HOME }>
                                        <span className='logo'>
                                            { generateNavigationElement(HOME, logo, this.props.pathname) }
                                        </span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to={ MOVIES }>
                                        { generateNavigationElement(MOVIES, 'Movies', this.props.pathname) }
                                    </Link>
                                </li>
                                <li>
                                    <Link to={ SHOWS }>
                                        { generateNavigationElement(SHOWS, 'Shows', this.props.pathname) }
                                    </Link>
                                </li>
                                <li>
                                    <Link to={ NEWS }>
                                        { generateNavigationElement(NEWS, 'News', this.props.pathname) }
                                    </Link>
                                </li>
                                <li>
                                    <Link to={ ABOUT }>
                                        { generateNavigationElement(ABOUT, 'About', this.props.pathname) }
                                    </Link>
                                </li>
                                <li>
                                    <input
                                        className='search-input'
                                        type='text'
                                        value={this.props.searchValue}
                                        onChange={this.props.onChangeSearchRequest}
                                        onKeyPress={(e: any) => e.key === 'Enter' && this.props.onClickSearchButton(this.props.searchValue)}
                                    />
                                    <button className='search-button' onClick={() => this.props.onClickSearchButton(this.props.searchValue)}>
                                        <i className="fa fa-search" aria-hidden="true"/>
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </header>
                </FixedWaypoint>
            </div>
        );


        const navigationBar = [
            <Link key={'l1'} to="/"><span className='nav-link home-section'/></Link>,
            <Link key={'l2'} to="/movies/"><span className='nav-link movies-section'/></Link>,
            <Link key={'l3'} to="/shows/"><span className='nav-link shows-section'/></Link>,
            <Link key={'l4'} to="/news/"><span className='nav-link news-section'/></Link>,
            <button key={'b1'} onClick={this.showSearchBar.bind(this)}><span className='nav-link search-section'/></button>
        ];

        const searchBar = (
            <div className='search-bar'>
                <form action=".">
                    <input
                        type='search'
                        value={this.props.searchValue}
                        onChange={this.props.onChangeSearchRequest}
                        onKeyPress={(e: any) => e.key === 'Enter' && this.props.onClickSearchButton(this.props.searchValue)}
                    />
                </form>
                <button onClick={() => this.props.onClickSearchButton(this.props.searchValue)}>
                    <i className="fa fa-search" aria-hidden="true"/>
                </button>
                <button onClick={this.hideSearchBar.bind(this)}><i className="fa fa-times" aria-hidden="true"/></button>
            </div>
        );

        const mobileHeader = (
            <header className='mobile-header-styles'>
                { this.state.isSearchActive ? searchBar : navigationBar }
            </header>
        );

        return this.props.isMobile ? mobileHeader : desktopHeader;
    }
}

export default HeaderComponent;