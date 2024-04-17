import { toasts } from "@stores/toast";
import type { Response } from "taskadd/response";
import type { Toast } from "taskadd/toast";

const displayErrors = (errors: any[]): string => {
    let msg = "";
    errors.forEach((error) => {
        if (error.msg) {
            msg += error.msg + ". ";
        }
    });
    return msg;
}

const handleResponse = (response: Response, toastTitle: Toast["title"], onSuccess: () => void) => {
    if (response.errorName) {
        if (Array.isArray(response.details)) {
            toasts.error(`${toastTitle} failed`, displayErrors(response.details));
            return;
        }
        toasts.error(`${toastTitle} failed`, response.message);
        return;
    }
    toasts.success(toastTitle, response.message);
    onSuccess();
    return;
}

export const response = {
    displayErrors,
    handleResponse,
}
