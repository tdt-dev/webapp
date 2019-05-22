import {sendContactUsForm} from "../services/rest";

export function asyncSendContactUsForm(firstName: string, lastName: string, email: string, message: string, recaptchaToken: string){
    return () => {
        sendContactUsForm(recaptchaToken, firstName, lastName, email, message);
    }
}