import * as OTPAuth from "otpauth";
import * as QRCode from "qrcode";

export class OTPAuthTOTP extends OTPAuth.TOTP {
    issuer = "TaskAdd";
    algorithm = "SHA1";
    digits = 6;

    constructor({
        issuer,
        label,
        issuerInLabel,
        secret,
        algorithm,
        digits,
        period,
    }: {
        issuer?: string | undefined;
        label?: string | undefined;
        issuerInLabel?: boolean | undefined;
        secret?: string | OTPAuth.Secret | undefined;
        algorithm?: string | undefined;
        digits?: number | undefined;
        period?: number | undefined;
    } = {}) {
        super({
            issuer,
            label,
            issuerInLabel,
            secret,
            algorithm,
            digits,
            period,
        });
    }

    async generateQRCode(): Promise<string> {
        return new Promise((resolve, reject) => {
            QRCode.toDataURL(this.toString(), (error, qrCodeUrl) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(qrCodeUrl);
                }
            });
        });
    }
}
