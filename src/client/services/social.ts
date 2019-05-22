import { map } from 'lodash';

declare global {
    interface Window {
        envFacebookClientId: string;
    }
}

export function generateFacebookSharingUrl(pageUrl: string, title: string, description: string, image: string) {
    const actionProperties = JSON.stringify({
        object: {
            'og:url': pageUrl,
            'og:title': title,
            'og:description': description,
            'og:image': image,
        },
    });

    const params = {
        'app_id': encodeURIComponent(window.envFacebookClientId),
        'display': 'popup',
        'method': 'share_open_graph',
        'action_type': encodeURIComponent('og.shares'),
        'action_properties': encodeURIComponent(actionProperties),
        'redirect_uri': encodeURIComponent(window.location.href)
    };

    const FACEBOOK_SHARE_URL = 'https://www.facebook.com/dialog/share';

    const paramsAsString = map(params, (v, k) => `${k}=${v}`);

    return `${FACEBOOK_SHARE_URL}?${paramsAsString.join('&')}`;
}

export function generateTwitterSharingUrl(pageUrl: string, description: string) {
    const encodedPageUrl = encodeURIComponent(pageUrl);

    const TWITTER_SHARE_URL = 'https://twitter.com/share';

    const params = {
        'url': encodedPageUrl,
        'text': description,
        'via': 'DuVernayTestOrg'
    };

    const paramsAsString = map(params, (v, k) => `${k}=${v}`);

    return `${TWITTER_SHARE_URL}?${paramsAsString.join('&')}`;
}