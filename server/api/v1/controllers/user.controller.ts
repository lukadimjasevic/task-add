import { Request, Response } from "express";
import services from "../services/user.service";
import helpers from "../helpers";

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
    
    signinUser: (async(req: Request, res: Response) => {
        try {
            const sessionUserData = await services.signinUser(req.body);
            helpers.session.save(req, sessionUserData);
            return res.status(200).json({ status: 200, message: "Successfully signed in" });
        } catch (error: any) {
            return res.status(400).json({ status: 400,  message: error.message });
        }
    }),

    signoutUser: ((req: Request, res: Response) => {
        try {
            helpers.session.destroy(req);
            return res.status(200).json({ status: 200, message: "Successfully signed out" });
        } catch (error: any) {
            return res.status(400).json({ status: 400,  message: error.message });
        }
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
