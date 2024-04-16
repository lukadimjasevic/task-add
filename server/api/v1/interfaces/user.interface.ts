export interface UserSignup {
    email: string;
    username: string;
    password: string;
}

export interface UserSignin {
    email: string;
    password: string;
}

export interface UserGenerateVerification {
    email: string;
    password: string;
}

export interface UserValidateVerification extends UserGenerateVerification {
    code: string;
}

export interface UserUpdate { 
    avatar?: Express.Multer.File;
    firstname?: string;
    lastname?: string;
}

export interface UserUpdatePassword {
    passwordOld: string;
    password: string;
}

export interface UserTest {
    email: string,
    username: string,
    password: string,
    passwordRetype: string,
    firstname: string,
    lastname: string,
    cookie: string,
    verificationCode: string | null;
}
