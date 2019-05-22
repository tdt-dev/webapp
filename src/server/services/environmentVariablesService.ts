import * as fs from 'fs';

export class EnvironmentVariablesService {
    // Google Analytics Id
    private gaId: string;
    private facebookClientId: string;
    private sslFullChain: string;
    private sslPrivKey: string;
    private googleReCaptchaSitekey: string;
    private googleReCaptchaEnabled: string;

    constructor() {
        function getVariable(name: string) {
            if (process.env[`${name}_FILE`]) {
                return fs.readFileSync(process.env[`${name}_FILE`], 'utf8').toString().trim();
            } else {
                return process.env[name];
            }
        }

        this.gaId = getVariable('GA_ID');
        this.facebookClientId = getVariable('FACEBOOK_CLIENT_ID');
        this.sslFullChain = getVariable('SSL_FULL_CHAIN');
        this.sslPrivKey = getVariable('SSL_PRIV_KEY');
        this.googleReCaptchaSitekey = getVariable('GOOGLE_RECAPTCHA_SITEKEY');
        this.googleReCaptchaEnabled = getVariable('GOOGLE_RECAPTCHA_ENABLED');
    }

    public getGaId(): string {
        return this.gaId;
    }

    public getFacebookClientId(): string {
        return this.facebookClientId;
    }

    public getSslFullChain(): string {
        return this.sslFullChain;
    }

    public getSslPrivKey(): string {
        return this.sslPrivKey;
    }

    public getGoogleReCaptchaSitekey(): string {
        return this.googleReCaptchaSitekey;
    }

    public isGoogleReCaptchaEnabled(): boolean {
        return !!(+this.googleReCaptchaEnabled);
    }
}
