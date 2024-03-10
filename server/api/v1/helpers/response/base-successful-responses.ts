export class BaseSuccessfulResponses {
    constructor() {}

    /**
     * Method defines base response body
     * @param {number} statusCode HTTP status code 
     * @param {string} message custom text to print as a message property
     * @param {object} customFields an optional object of other properties 
     * @returns Returns base response body
     */
    baseResponseBody(statusCode: number, message: string, customFields?: object) {
        return {
            statusCode,
            message,
            ...customFields,
        };
    }
}
