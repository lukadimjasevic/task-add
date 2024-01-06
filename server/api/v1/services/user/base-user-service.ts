import { Hash } from "../../helpers/hash";
import User from "../../../../database/models/user.model";
import { UserSignup } from "../../interfaces/user.interface";
import { SessionUser } from "../../helpers/session";
import { Request, Response, NextFunction } from "express";


export interface TrimObjectData {
    [key: string]: any;
}


export class BaseUserService {
    req: Request;
    res: Response;
    next: NextFunction;
    hash: Hash = new Hash();
    sessionUser: SessionUser = new SessionUser();

    constructor(req: Request, res: Response, next: NextFunction) {
        this.req = req;
        this.res = res;
        this.next = next;
    }

    /*---------------------------- Check Methods -----------------------------*/
    
    /**
     * Method checks if a given field is in User's model attributes.
     * @param {string} field field name associated with User's model attributes
     * @returns {boolean} Returns true if a given field is a valid attribute of 
     * User's model attributes. Otherwise, it returns false.  
     */
    checkFieldInAttributes(field: string): boolean {
        const attributes = Object.keys(User.getAttributes());
        return attributes.includes(field);
    }

    /*--------------------------- Database Methods ---------------------------*/

    /**
     * Method creates a new User model record.
     * @param {UserSignup} data object of UserSignup interface
     * @returns Returns an instance of User model. If a user already exists or 
     * there is a problem with the field's validation rules, it returns null.
     */
    async create(data: UserSignup): Promise<User | null> {
        const findUser = await this.find("email", data.email);
        if (findUser) {
            return null;
        }
        try {
            const user = await User.create({
                email: data.email,
                username: data.username,
                password: await this.hash.create(data.password),
            });
            return user;
        } catch (error: any) {
            console.log(new Error(error.message));
            return null;
        }
    }

    /**
     * Method finds a User model record.
     * @param {string} field field name associated with User's model attributes
     * @param {string} value value of the param field
     * @returns Returns an instance of User model if the given params satisfied
     * query. Otherwise, it returns null. Also, if the param field is unknown,
     * it returns null
     */
    async find(field: string, value: string): Promise<User | null> {
        if (!this.checkFieldInAttributes(field)) {
            console.log(new Error(`Field User.${field} does not exist.`));
            return null;
        }
        const user = await User.findOne({
            where: { [field]: value }
        });
        return user;
    }

    /*--------------------------- Business Methods ---------------------------*/

    /**
     * Method removes keys from the object.
     * @param {TrimObjectData} object an object to trim
     * @param {string[]} keys a list of object keys to remove 
     * @returns Returns a new trimmed object.
     * @example
     * // Set an object
     * const user = { id: 1, name: "John", password: "john123" };
     * 
     * // Get a trimmed object
     * const trimmedUser = trimObject(user, ["id", "password"]);
     * console.log(trimmedUser);
     * // Logs:
     * // { name: "John" }
     */
    trimObject(object: TrimObjectData, keys: string[] = ["id", "password", "verificationCode"]): TrimObjectData {
        const trimmedData = object;
        keys.forEach(element => {
            if (element in trimmedData) {
                delete trimmedData[element];
            }
        });
        return trimmedData;
    }
}
