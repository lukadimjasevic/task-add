declare module "taskadd/user-otp" {
    export interface UserOTP {
        qrcode: string | null;
        token: string | null;
    }
}
