import bcrypt from "bcrypt";


export class Hash {
    #saltRounds: number = 10;

    constructor() {}

    get saltRounds() {
        return this.#saltRounds;
    }

    set saltRounds(value: number) {
        this.#saltRounds = value;
    }

    async create(plaintext: string): Promise<string> {
        return await bcrypt.hash(plaintext, this.#saltRounds);
    }

    async compare(plaintext: string, hashValue: string): Promise<boolean> {
        return await bcrypt.compare(plaintext, hashValue);
    }
}
