import nodemailer from "nodemailer";
import config from "../../../config/nodemailer";
import { senderEmail } from "../../protocols/helpers/senderEmail";
import crypto from "node:crypto";

export class SenderEmail implements senderEmail {
  async sender(email: string) {
    const mailSend = this.config();
    const key = crypto.randomUUID();
    await mailSend.sendMail({
      subject: "User account registration.",
      text: `A sua chave de ativação é: ${key}`,
      from: `Eduardo Santana <${config.user}>`,
      to: email,
    });
    return key;
  }

  config() {
    const transport = nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: false,
      auth: {
        user: config.user,
        pass: config.pass,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
    return transport;
  }
}
