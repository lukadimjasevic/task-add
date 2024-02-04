export interface UserSignup {
    email: string;
    username: string;
    password: string;
}

export interface UserSignin {
    email: string;
    password: string;
}

export interface UserUpdate { 
    avatar?: Blob;
    firstname?: string;
    lastname?: string;
}

export interface UserTest {
    email: string,
    username: string,
    password: string,
    passwordRetype: string,
    firstname: string,
    lastname: string,
    cookie: string,
}
