import { SessionUser } from "../../helpers/session";
import { Request, Response, NextFunction } from "express";


export class BaseUserController {
    req: Request;
    res: Response;
    next: NextFunction;

    constructor(req: Request, res: Response, next: NextFunction) {
        this.req = req;
        this.res = res;
        this.next = next;
    }
    
    // Implement common validation methods, error handling, etc.

    /*--------------------------- Response Methods ---------------------------*/

    /**
     * Method sends response status 200 to client
     * @param {string} message custom text to print as a message property
     * @param {object} customFields an optional object of other properties
     * @returns Returns status code 200 with appropriate JSON response
     */
    responseOK(message: string, customFields?: object) {
        const statusCode = 200;
        const responseFields = {
            status: statusCode,
            message: message,
            ...customFields,
        };
        return this.res.status(statusCode).json(responseFields);
    }

    /**
     * Method sends response status 201 to client
     * @param {string} message custom text to print as a message property 
     * @param {object} customFields an optional object of other properties
     * @returns Returns status code 201 with appropriate JSON response
     */
    responseCreated(message: string, customFields?: object) {
        const statusCode = 201;
        const responseFields = {
            status: statusCode,
            message: message,
            ...customFields,
        };
        return this.res.status(statusCode).json(responseFields);
    }  

    /**
     * Method sends response status 204 to client
     * @param {string} message custom text to print as a message property 
     * @param {object} customFields an optional object of other properties
     * @returns Returns status code 204 with appropriate JSON response
     */
    responseNoContent(message: string, customFields?: object) {
        const statusCode = 204;
        const responseFields = {
            status: statusCode,
            message: message,
            ...customFields,
        };
        return this.res.status(statusCode).json(responseFields);
    }  
}
