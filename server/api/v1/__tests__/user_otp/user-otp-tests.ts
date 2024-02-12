import request from "supertest";
import { BaseTests } from "../base-tests";
import { UserTest } from "../../interfaces/user.interface";
import User from "../../../../database/models/user.model";
import UserOtp from "../../../../database/models/user_otp.model";
import * as OTPAuth from "otpauth";


export class UserOtpTests extends BaseTests {
    constructor(user: UserTest) {
        super();
        this.user = user;
    }

    run() {
        describe("User 2FA", () => {
            this.testEnable2FA();
            this.testVerify2FA();
            this.testRead();
        });
    }

    testEnable2FA() {
        describe(`POST ${this.routesUserOtp.enable} -> ENABLE 2FA`, () => {
            it("should return status 400 if the user isn't verified", async() => {
                const user = await User.unscoped().findOne({ where: { email: this.user.email }});
                user!.verified = false;
                await user!.save();
                const response = await request(this.server.app)
                    .post(this.routesUserOtp.enable)
                    .set("Cookie", this.user.cookie);
                expect(response.statusCode).toEqual(400);
                user!.verified = true;
                await user!.save();           
            });
            it("should return status 201 if 2FA is enabled", async() => {
                const response = await request(this.server.app)
                    .post(this.routesUserOtp.enable)
                    .set("Cookie", this.user.cookie);
                expect(response.statusCode).toEqual(201);                   
            });
            it("should return status 409 if 2FA is already enabled", async() => {
                const response = await request(this.server.app)
                    .post(this.routesUserOtp.enable)
                    .set("Cookie", this.user.cookie);
                expect(response.statusCode).toEqual(409);                   
            });
        });
    }
    
    testVerify2FA() {
        describe(`POST ${this.routesUserOtp.verify} -> VERIFY 2FA`, () => {
            it("should return status 400 if the token isn't a string", async() => {
                const response = await request(this.server.app)
                    .post(this.routesUserOtp.verify)
                    .set("Cookie", this.user.cookie)
                    .send({
                        token: null,
                    });
                expect(response.statusCode).toEqual(400);                   
            });
            it("should return status 400 if the token isn't a 6-digit token", async() => {
                const response = await request(this.server.app)
                    .post(this.routesUserOtp.verify)
                    .set("Cookie", this.user.cookie)
                    .send({
                        token: "1234567",
                    });
                expect(response.statusCode).toEqual(400);                   
            });
            it("should return status 409 if the authentication is failed", async() => {
                const response = await request(this.server.app)
                    .post(this.routesUserOtp.verify)
                    .set("Cookie", this.user.cookie)
                    .send({
                        token: "aaaaaa",
                    });
                expect(response.statusCode).toEqual(401);                   
            });
            it("should return status 200 if the authentication is successful", async() => {
                const user = await User.unscoped().findOne({ where: { email: this.user.email }});
                const userOtp = await UserOtp.unscoped().findOne({ where: { userId: user!.id }});
                const totp = new OTPAuth.TOTP({
                    issuer: "TaskAdd",
                    label: user!.email,
                    algorithm: "SHA1",
                    digits: 6,
                    secret: userOtp!.secret,
                });
                const response = await request(this.server.app)
                    .post(this.routesUserOtp.verify)
                    .set("Cookie", this.user.cookie)
                    .send({
                        token: totp.generate(),
                    });
                expect(response.statusCode).toEqual(200);                   
            });
        });
    }

    testRead() {
        describe(`GET ${this.routesUserOtp.read} -> GET QR CODE`, () => {
            it("should return status code 200 if the QR code is fetched", async() => {
                const response = await request(this.server.app)
                    .get(this.routesUserOtp.read)
                    .set("Cookie", this.user.cookie);
                expect(response.statusCode).toEqual(200);
            });
        });
    }

    testDisable2Fa() {
        describe(`DELETE ${this.routesUserOtp.delete} -> DISABLE 2FA`, () => {
            it("should return status code 200 if 2FA is disabled", async() => {
                const response = await request(this.server.app)
                    .delete(this.routesUserOtp.delete)
                    .set("Cookie", this.user.cookie);
                expect(response.statusCode).toEqual(200);
            });
        });
    }
}
