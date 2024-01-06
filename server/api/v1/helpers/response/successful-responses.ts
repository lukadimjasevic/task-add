import { BaseSuccessfulResponses } from "./base-successful-responses";
import { Response } from "express";


export class SuccessfulResponses extends BaseSuccessfulResponses {
    res: Response;

    constructor(res: Response) {
        super();
        this.res = res;
    }

    /*--------------------------- Response Methods ---------------------------*/

    /**
     * Method sends response status 200 to client
     * @param {string} message custom text to print as a message property
     * @param {object} customFields an optional object of other properties
     * @returns Returns status code 200 with appropriate JSON response
     */
    responseOK(message: string, customFields?: object) {
        const statusCode = 200;
        const responseBody = super.baseResponseBody(statusCode, message, customFields);
        return this.res.status(statusCode).json(responseBody);
    }

    /**
     * Method sends response status 201 to client
     * @param {string} message custom text to print as a message property 
     * @param {object} customFields an optional object of other properties
     * @returns Returns status code 201 with appropriate JSON response
     */
    responseCreated(message: string, customFields?: object) {
        const statusCode = 201;
        const responseBody = super.baseResponseBody(statusCode, message, customFields);
        return this.res.status(statusCode).json(responseBody);
    }  

    /**
     * Method sends response status 204 to client
     * @param {string} message custom text to print as a message property 
     * @param {object} customFields an optional object of other properties
     * @returns Returns status code 204 with appropriate JSON response
     */
    responseNoContent(message: string, customFields?: object) {
        const statusCode = 204;
        const responseBody = super.baseResponseBody(statusCode, message, customFields);
        return this.res.status(statusCode).json(responseBody);
    }
}
