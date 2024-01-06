export class BaseSuccessfulResponses {
    constructor() {}

    /**
     * Method defines base response body
     * @param {number} status HTTP status code 
     * @param {string} message custom text to print as a message property
     * @param {object} customFields an optional object of other properties 
     * @returns Returns base response body
     */
    baseResponseBody(status: number, message: string, customFields?: object) {
        return {
            status,
            message,
            ...customFields,
        }
    }
}
