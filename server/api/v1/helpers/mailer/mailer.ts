import dotenv from "dotenv";
import nodemailer from "nodemailer";
import { MailOptions } from "nodemailer/lib/json-transport";

dotenv.config();

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT!),
    secure: process.env.SMTP_SECURE === "true" ? true : false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
});

export class Mailer {
    static async sendMail(mailOptions: MailOptions) {
        await transporter.sendMail({ from: `TaskAdd ${process.env.SMTP_USER}`, ...mailOptions });
    }
}
