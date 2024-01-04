import { BaseUserService } from "./base-user-service";
import User from "../../../../database/models/user.model";
import { SessionUserData } from "../../interfaces/types/express-session";
import { HttpErrorInternalServerError } from "../../helpers/error";


export class UserServiceGet extends BaseUserService {
    constructor() {
        super();
    }

    async getUser(sessionData: SessionUserData) {
        const user = await User.findOne({ where: { email: sessionData.email }});
        if (!user) {
            throw new HttpErrorInternalServerError();
        }
        const { id, password, verificationCode, ...userTrimmed } = user!.dataValues;
        return userTrimmed;
    }
}
