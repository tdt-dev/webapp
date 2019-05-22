import * as ReactGA from 'react-ga';

export function trackPageView(pageName: string) {
    ReactGA.pageview(pageName);
}
