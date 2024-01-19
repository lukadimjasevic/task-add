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
