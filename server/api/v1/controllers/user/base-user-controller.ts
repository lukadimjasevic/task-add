import { SessionUser } from "../../helpers/session";


export class BaseUserController {
    sessionUser: SessionUser = new SessionUser();

    constructor() {}
    
    // Implement common validation methods, error handling, etc.
}
