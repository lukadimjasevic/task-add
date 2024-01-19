import { BaseService } from "../base-service";
import { Hash } from "../../helpers/hash";
import User from "../../../../database/models/user.model";
import { UserSignup } from "../../interfaces/user.interface";
import { SessionUser } from "../../helpers/session";
import { Request, Response, NextFunction } from "express";
import { HttpErrorBadRequest, HttpErrorConflict, HttpErrorNotFound } from "../../helpers/error";
import { Op } from "sequelize";
import { TrimData } from "../base-service";


export class UserBaseService extends BaseService {
    hash: Hash = new Hash();
    sessionUser: SessionUser = new SessionUser();

    constructor(req: Request, res: Response, next: NextFunction) {
        super(req, res, next);
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
        const isIncludes = attributes.includes(field);
        if (!isIncludes) {
            throw new Error(`Field User.${field} does not exist.`);
        }
        return isIncludes;
    }

    /*--------------------------- Database Methods ---------------------------*/

    /**
     * Method creates a new User model record.
     * @param {UserSignup} data object of UserSignup interface
     * @returns Returns an instance of User model.
     */
    async create(data: UserSignup): Promise<User> {
        const users = await User.findAll({
            where: {
                [Op.or]: [
                    { email: data.email },
                    { username: data.username},
                ],
            },
        });
        if (users.length) {
            throw new HttpErrorConflict("User already exists. Please provide valid credentials.");
        }
        const user = await User.create({
            email: data.email,
            username: data.username,
            password: await this.hash.create(data.password),
        });
        return user;
    }

    /**
     * Wrapper method that finds the first record which satisfies the query.
     * @param {string} field field name associated with User's model attributes
     * @param {any} value value of the param field
     * @returns Returns an instance of User model.
     */
    async findOne(field: string, value: any): Promise<User> {
        this.checkFieldInAttributes(field)
        const user = await User.findOne({
            where: { [field]: value }
        });
        if (!user) {
            throw new HttpErrorNotFound("User doesn't exist. Please provide valid credentials.");
        }
        return user;
    }

    /**
     * Wrapper method that updates the first record which satisfies the query.
     * @param {string} field field name associated with User's model attributes 
     * @param {any} value value of the param field
     * @param {number} id indicates which record to update
     */
    async updateOne(field: string, value: any, id: number): Promise<void> {
        this.checkFieldInAttributes(field);
        try {
            await User.update({ [field]: value }, { where: { id }});
        } catch (error: any) {
            if (error.name === "SequelizeUniqueConstraintError") {
                throw new HttpErrorBadRequest(`Field ${field} must be unique`);
            }
            throw error;
        }
    }

    /**
     * Wrapper method that deletes the first record which satisfies the query.
     * @param id indicates which record to delete
     */
    async deleteOne(id: number): Promise<void> {
        await User.destroy({ where: { id }});
        return;
    }

    /*--------------------------- Business Methods ---------------------------*/

    trimData(data: TrimData, keys: string[] = ["id", "password", "verificationCode"]): TrimData {
        return super.trimData(data, keys);
    }

    destroySession() {
        this.sessionUser.destroy(this.req);
    }
}
