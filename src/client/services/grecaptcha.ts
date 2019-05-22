import * as Promise from 'bluebird';

declare global {
    interface Window {
        grecaptcha: any;
        recaptchaOnLoadCallback: Function;
        envGoogleReCaptchaSitekey: string;
        isGoogleReCaptchaEnabled: boolean;
    }
}

type ReCaptchaCallback = (token: string) => void;

let disabledReCaptchaIds: Array<ReCaptchaCallback> = [];

export function createReCaptcha(id: string, callback: ReCaptchaCallback): any {
    const grecaptchaParams = {
        'sitekey': window.envGoogleReCaptchaSitekey,
        'callback': (token: string) => {
            (document.elementFromPoint(10, 10) as HTMLElement).click();
            callback(token);
        },
        'size': 'invisible',
        'badge': 'bottomright'
    };

    const renderCaptcha = () => {
        return window.grecaptcha.render(id, grecaptchaParams);
    };

    return new Promise((resolve) => {
        if (window.isGoogleReCaptchaEnabled) {
            if (window.grecaptcha) {
                resolve(renderCaptcha());
            } else {
                window.recaptchaOnLoadCallback = () => {
                    resolve(renderCaptcha());
                }
            }
        } else {
            disabledReCaptchaIds.push(callback);
            resolve(disabledReCaptchaIds.length - 1);
        }
    });

}

export function resetReCaptcha( grecaptchaId: any ) {
    if (window.isGoogleReCaptchaEnabled) {
        window.grecaptcha.reset(grecaptchaId);
    }
}

export function executeReCaptcha( grecaptchaId: any ) {
    if (window.isGoogleReCaptchaEnabled) {
        window.grecaptcha.execute(grecaptchaId);
    } else {
        disabledReCaptchaIds[grecaptchaId]("");
    }
}