import bcrypt from "bcrypt";

const saltRounds = 10;

const helpers = {
    async createHash(plaintext: string) {
        return await bcrypt.hash(plaintext, saltRounds);
    },
    
    async compareHashes(plaintext: string, hash: string) {
        return await bcrypt.compare(plaintext, hash);
    },
};

export default helpers;
