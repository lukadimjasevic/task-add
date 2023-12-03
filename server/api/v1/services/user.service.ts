import { Op } from "sequelize";
import User from "../../../database/models/user.model";
import { UserSignup, UserSignin } from "../interfaces/user.interface";
import { SessionUserData } from "../interfaces/types/express-session";
import helpers from "../helpers";

const services = {
    async signupUser(data: UserSignup) {
        const hash = await helpers.hash.createHash(data.password);
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
    },

    async signinUser(data: UserSignin) {
        const user = await User.findOne({ where: { email: data.email }});
        if (!user || !(await helpers.hash.compareHashes(data.password, user.password))) {
            // Email or password is incorrect
            throw Error("Email or password is incorrect");
        }
        const sessionUserData: SessionUserData =  {
            email: user.email,
            username: user.username,
        }
        return sessionUserData;  
    },
    
    async getUser(sessionData: SessionUserData) {
        const user = await User.findOne({ where: { email: sessionData.email }});
        const { id, password, verificationCode, ...userTrimmed } = user!.dataValues;
        return userTrimmed;
    },
};

export default services;
