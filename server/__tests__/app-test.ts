import { db, server } from "../server";
import { UserTests } from "./user";


describe("App e2e-test", () => {
    beforeAll((done) => {
        db.truncate({ cascade: true, restartIdentity: true }).then(() => {
            db.authenticate()
                .then(() => {
                    console.log("Database connection has been established successfully");
                    server.start();
                    done();
                })
                .catch((error: any) => {
                    console.log(error);
                    done();
                });
        });
    });

    afterAll((done) => {
        db.close().then(() => {
            done();
        });
    });

    new UserTests().run();
});
