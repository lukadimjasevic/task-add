import bcrypt from "bcrypt";

const saltRounds = 10;

const helpers = {
    createHash: (async(plaintext: string) => {
        return await bcrypt.hash(plaintext, saltRounds);
    }),
};

export default helpers;
