import bcrypt from "bcrypt";


export class Hash {
    #saltRounds: number = 10;
    #plaintext: string;
    #hashValue: string;

    constructor() {}

    get saltRounds() {
        return this.#saltRounds;
    }

    set saltRounds(value: number) {
        this.#saltRounds = value;
    }

    get plaintext() {
        return this.#plaintext;
    }

    set plaintext(value: string) {
        if (!this.#plaintext) {
            this.#plaintext = value;
        }
    }

    get hashValue() {
        return this.#hashValue;
    }

    set hashValue(value: string) {
        this.#hashValue = value;
    }

    async create(): Promise<void> {
        this.#hashValue = await bcrypt.hash(this.#plaintext, this.#saltRounds);
    }

    async compare(plaintext: string): Promise<boolean> {
        if (!this.#hashValue) await this.create();
        return await bcrypt.compare(plaintext, this.#hashValue);
    }
}
