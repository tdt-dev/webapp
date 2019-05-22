
import {sendSubscriptionForm} from "../services/rest";

export function asyncSendSubscriptionForm(email: string, recaptchaToken: string){
    return () => {
        sendSubscriptionForm(recaptchaToken, email);
    }
}