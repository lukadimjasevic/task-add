import * as OTPAuth from "otpauth";
import * as base32 from "hi-base32";
import * as crypto from "crypto";


export class OTPSecret extends OTPAuth.Secret {
    constructor() {
        super();
    }

    static generateBase32Secret() {
        const randomBytesBuffer = crypto.randomBytes(10);
        const secret = base32.encode(randomBytesBuffer);
        return secret;
    }
}
