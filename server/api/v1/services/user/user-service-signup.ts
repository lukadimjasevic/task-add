import { BaseUserService } from "./base-user-service";
import User from "../../../../database/models/user.model";
import { UserSignup } from "../../interfaces/user.interface";
import { HttpErrorConflict } from "../../helpers/error";


export class UserServiceSignup extends BaseUserService {
    constructor() {
        super();
    }

    async signupUser(data: UserSignup): Promise<User> {
        const user = await this.create(data);
        if (!user) {
            throw new HttpErrorConflict("User already exists. Please provide valid credentials.");
        }
        return user;
    }
}
