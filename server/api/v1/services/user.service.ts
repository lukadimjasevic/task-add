import { Op } from "sequelize";
import User from "../../../database/models/user.model";
import { UserSignup } from "../interfaces/user.interface";
import helpers from "../helpers/hash.helper";

const services = {
    signupUser: (async(data: UserSignup) => {
        const hash = await helpers.createHash(data.password);
        const [user, created] = await User.findOrCreate({
            where: {
                [Op.or]: [{ email: data.email }, { username: data.username }],
            },
            defaults: {
                email: data.email,
                username: data.username,
                password: hash,
            },
        });
        if (!created) {
            // User already exists
            throw Error("User already exists");
        }
    }),
};

export default services;
