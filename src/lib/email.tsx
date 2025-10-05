import { render } from "@react-email/components"
import nodemailer from "nodemailer"
import { Email } from "@/components/sign-in-email-otp"
import SMTPTransport from "nodemailer/lib/smtp-transport"

// TODO: add environment variables for user passward and email from

const emailTransporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
})

export const sendEmailWithOTP = async (
  to: string,
  subject: string,
  otp: string
) => {
  const html = await render(<Email otp={otp} />)

  const options: SMTPTransport.MailOptions = {
    from: process.env.GMAIL,
    to,
    subject,
    html,
  }

  await emailTransporter.sendMail(options)
}
