import { BaseUserService } from "./base-user-service";
import User from "../../../../database/models/user.model";
import { UserSignin } from "../../interfaces/user.interface";
import { SessionUserData } from "../../interfaces/types/express-session";
import { HttpErrorNotFound, HttpErrorUnauthorized } from "../../helpers/error";


export class UserServiceSignin extends BaseUserService {
    constructor() {
        super();
    }

    async signinUser(data: UserSignin) {
        const user = await User.findOne({ where: { email: data.email }});
        if (!user) {
            throw new HttpErrorNotFound("User doesn't exist. Please provide valid credentials.")
        }
        this.hash.hashValue = user.password;
        const hashMatch = await this.hash.compare(data.password);
        if (!hashMatch) {
            // Email or password is incorrect
            throw new HttpErrorUnauthorized("Email or password is incorrect. Please provide valid credentials.");
        }
        const sessionUserData: SessionUserData =  {
            email: user.email,
            username: user.username,
        }
        return sessionUserData;  
    }
}
