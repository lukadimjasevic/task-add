declare module "taskadd/user" {
    export interface User {
        avatar: File | null
        email: string | null;
        firstname: string | null;
        lastname: string | null;
        username: string | null;
        verified: boolean | null;
        verificationCodeLastDate: Date | null;
        otpEnabled: boolean | null;
        otpGenerated: boolean | null;
    }
}
