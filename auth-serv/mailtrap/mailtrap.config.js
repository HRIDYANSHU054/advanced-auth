import { MailtrapClient } from "mailtrap";
import dotenv from "dotenv";
dotenv.config();

const TOKEN = process.env.MAILTRAP_TOKEN;

export const mtClient = new MailtrapClient({
  token: TOKEN,
});

export const mtSender = {
  email: "hello@demomailtrap.com",
  name: "Jake Resnich",
};
