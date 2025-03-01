import nodemailer from "nodemailer";
import { email_template } from "./mail_template";
import mustache from "mustache";

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST!,
  port: parseInt(process.env.MAIL_PORT!),
  secure: true,
  auth: {
    user: process.env.MAIL_USER!,
    pass: process.env.MAIL_PASSWORD!,
  },
});

async function sendEmail(to: string, subject: string, html: string) {
  try {
    await transporter.sendMail({
      from: process.env.MAIL_USER!,
      to,
      subject,
      html,
    });
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

async function sendNotification(
  to: string,
  message_title: string,
  message_text: string,
) {
  const html = mustache.render(email_template, { message_title, message_text });
  sendEmail(to, message_title, html).then(() => {});
}

export { sendNotification, sendEmail };
