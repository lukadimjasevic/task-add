import { BaseUserService } from "./base-user-service";
import { UserSignin } from "../../interfaces/user.interface";
import { SessionUserData } from "../../interfaces/types/express-session";
import { HttpErrorNotFound, HttpErrorUnauthorized } from "../../helpers/error";


export class UserServiceSignin extends BaseUserService {
    constructor() {
        super();
    }

    async signinUser(data: UserSignin): Promise<SessionUserData> {
        const user = await this.find("email", data.email);
        if (!user) {
            throw new HttpErrorNotFound("User doesn't exist. Please provide valid credentials.")
        }
        const hashMatch = await this.hash.compare(data.password, user.password);
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
