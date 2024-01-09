import { body } from "express-validator";

const validations = {
    signupRules: [
        body("email")
            .notEmpty().withMessage("Email is required")
            .isEmail().withMessage("Email is not valid"),
        body("username")
            .notEmpty().withMessage("Username is required")
            .isString().withMessage("Username must be a string")
            .isLength({ min: 4, max: 16 }).withMessage("Username must be between 4 and 16 characters"),
        body("password")
            .notEmpty().withMessage("Password is required")
            .isString().withMessage("Password must be a string")
            .isLength({ min: 8 }).withMessage("Password must be minimum of 8 characters"),
        body("passwordRetype")
            .notEmpty().withMessage("Retype password is required")
            .custom((value, { req }) => value === req.body.password).withMessage("The passwords do not match"),
    ],
    signinRules: [
        body("email")
            .notEmpty().withMessage("Email is required")
            .isEmail().withMessage("Email is not valid"),
        body("password")
            .notEmpty().withMessage("Password is required")
            .isString().withMessage("Password must be a string"),
    ],
    updateRules: [
        body("avatar"),
        body("firstname")
            .isString().withMessage("Firstname must be a string")
            .isLength({ max: 32 }).withMessage("Firstname must be a maximum of 32 characters")
            .optional({ nullable: true }),
        body("lastname")
            .isString().withMessage("Lastname must be a string")
            .isLength({ max: 32 }).withMessage("Lastname must be a maximum of 32 characters")
            .optional({ nullable: true }),
    ],
};

export default validations;
