import { Request, Response } from "express";
import services from "../services/user.service";

const controllers = {
    signupUser: (async(req: Request, res: Response) => {
        const data = req.body;
        try {
            await services.signupUser(data);
            return res.status(200).json({ status: 200, message: "Successfully created a new account" });
        } catch (error: any) {
            return res.status(400).json({ status: 400, message: error.message });
        }
    }),
    
    signinUser: ((req: Request, res: Response) => {
        return res.send("Sign In");
    }),

    signoutUser: ((req: Request, res: Response) => {
        return res.send("Sign Out");
    }),
    
    getUser: ((req: Request, res: Response) => {
        return res.send("Get User");
    }),
    
    updateUser: ((req: Request, res: Response) => {
        return res.send("Update User");
    }),
    
    deleteUser: ((req: Request, res: Response) => {
        return res.send("Delete User");
    }),    
};

export default controllers;
