import { Request } from "express";
import session, { SessionData } from "express-session";
import Session  from "../../../database/models/session.model";
import db from "../../../database";
import { SessionUserData } from "../interfaces/types/express-session";
import { HttpErrorInternalServerError } from "./error";

const helpers = {
    save(req: Request, data: SessionUserData) {
        req.session.user = data;
        req.session.save((error) => {
            if (error) {
                console.log(error);
                throw new HttpErrorInternalServerError();
            }
        });
    },
    destroy(req: Request) {
        req.session.user = null;
        req.session.destroy((error) => {
            if (error) {
                console.log(error);
                throw new HttpErrorInternalServerError();
            }
        });
    },
};

export class SequelizeSessionStore extends session.Store {
    options: any;
    constructor(options?: any) {
        super(options);
        this.options = { db, ...options || {} };
    }

    get(sid: string, callback: (err: any, session?: SessionData | null) => void): void {
        Session
            .findOne({where: { id: sid }})
            .then((session) => {
                if (!session) {
                    return callback(null, null);
                }
                callback(null, session.data);
            })
            .catch((error) => {
                if (error) {
                    callback(error, null);
                }
            });
    }

    set(sid: string, session: session.SessionData, callback?: ((err?: any) => void) | undefined): void {   
        const defaults = { id: sid, data: session };
        Session
            .findOrCreate({ where: { id: sid }, defaults })
            .then(([session, created]) => {
                if (!created) {
                    session.data = defaults.data;
                    session.save().then(() => { return session });
                }
                return session;
            })
            .catch((error) => {
                if (callback) {
                    callback(error);
                }
            });
    }

    destroy(sid: string, callback?: ((err?: any) => void) | undefined): void {
        Session
            .destroy({ where: { id: sid }})
            .then((result) => {
                return;
            })
            .catch((error) => {
                if (callback) {
                    callback(error);
                }
            });
        return;
    }
}    

export default helpers;
