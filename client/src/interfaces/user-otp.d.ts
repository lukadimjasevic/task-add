declare module "taskadd/user-otp" {
    export interface UserOTP {
        qrcode: string | null;
        token: string | null;
    }

    export interface UserOTPVerifyDTO {
        email: string;
        password: string;
        token: string;
    }
}
