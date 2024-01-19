import { Request, Response, NextFunction } from "express";

export interface TrimData {
    [key: string]: any;
}


export class BaseService {
    req: Request;
    res: Response;
    next: NextFunction;

    constructor(req: Request, res: Response, next: NextFunction) {
        this.req = req;
        this.res = res;
        this.next = next;
    }

    /**
     * Method removes keys from a list of objects.
     * @param {TrimData} data a list of objects to trim
     * @param {string[]} keys a list of object keys to remove 
     * @returns Returns a list of trimmed objects.
     */
    trimData(data: TrimData, keys: string[]): TrimData {
        const trimmedData = data;
        keys.forEach((key) => {
            if (key in trimmedData) {
                delete trimmedData[key];
            }
        });
        return trimmedData;
    }
}
