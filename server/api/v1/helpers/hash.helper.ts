import bcrypt from "bcrypt";

const saltRounds = 10;

const helpers = {
    createHash: (async(plaintext: string) => {
        return await bcrypt.hash(plaintext, saltRounds);
    }),
    compareHashes: (async(plaintext: string, hash: string) => {
        return await bcrypt.compare(plaintext, hash);
    }),
};

export default helpers;
