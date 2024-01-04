import { BaseUserService } from "./base-user-service";
import { Op } from "sequelize";
import User from "../../../../database/models/user.model";
import { UserSignup } from "../../interfaces/user.interface";
import { HttpErrorConflict } from "../../helpers/error";


export class UserServiceSignup extends BaseUserService {
    constructor() {
        super();
    }

    async signupUser(data: UserSignup) {
        this.hash.plaintext = data.password;
        await this.hash.create();
        const [user, created] = await User.findOrCreate({
            where: {
                [Op.or]: [{ email: data.email }, { username: data.username }],
            },
            defaults: {
                email: data.email,
                username: data.username,
                password: this.hash.hashValue,
            },
        });
        if (!created) {
            // User already exists
            throw new HttpErrorConflict("User already exists. Please provide valid credentials.");
        }
    }
}
