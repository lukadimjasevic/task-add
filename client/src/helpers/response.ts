import { toasts } from "@stores/toast";
import type { Response, ResponseError } from "taskadd/response";
import type { Toast } from "taskadd/toast";

const displayErrors = (errors: ResponseError[]): string => {
    let msg = "";
    errors.forEach((error: ResponseError) => {
        msg += error.msg + ". ";
    });
    return msg;
}

const handleResponse = (response: Response, toastTitle: Toast["title"], success: () => void) => {
    if (response.errorName) {
        if (response.errors) {
            toasts.error(`${toastTitle} failed`, displayErrors(response.errors));
            return;
        }
        toasts.error(`${toastTitle} failed`, response.message);
        return;
    }
    toasts.success(toastTitle, response.message);
    success();
    return;
}

export const response = {
    displayErrors,
    handleResponse,
}
