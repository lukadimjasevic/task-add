import bcrypt from "bcrypt";


export class Hash {
    static saltRounds: number = 10;

    constructor() {}

    get saltRounds() {
        return this.saltRounds;
    }

    set saltRounds(value: number) {
        this.saltRounds = value;
    }

    static async create(plaintext: string): Promise<string> {
        return await bcrypt.hash(plaintext, this.saltRounds);
    }

    static async compare(plaintext: string, hashValue: string): Promise<boolean> {
        return await bcrypt.compare(plaintext, hashValue);
    }
}
