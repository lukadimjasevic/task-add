import { BaseUserService } from "./base-user-service";
import { SessionUserData } from "../../interfaces/types/express-session";
import { HttpErrorInternalServerError } from "../../helpers/error";


export class UserServiceGet extends BaseUserService {
    constructor() {
        super();
    }

    async getUser(sessionData: SessionUserData) {
        const user = await this.find("email", sessionData.email);
        if (!user) {
            throw new HttpErrorInternalServerError();
        }
        return this.trimObject(user.dataValues);
    }
}
