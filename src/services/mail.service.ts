import Mail from "nodemailer/lib/mailer";
import transporter from "../shared/send-mail.service";
import CustomError from "./custom-error.service";
import dotenv from "dotenv";
export default class EmailService {
  constructor() {
    dotenv.config();
  }

  public async sendMail(
    alert: string,
    email: string,
    factura: string,
    amount: string,
    path: string
  ) {
    try {
      const mailOptions: Mail.Options = {
        from: process.env.EMAIL,
        to: email,
        subject: "Factura " + factura,
        text: alert,
        html: `<h3> ${alert} <br></h3><h3>Factura ${factura}</h3><strong>Monto ${amount}</strong>`,
        attachments: [
          {
            filename: "Factura.pdf",
            path: path,
          },
        ],
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          throw new CustomError(409, "Error al enviar el correo");
        } else {
          return info.response;
        }
      });
    } catch (error) {
      return null;
    }
  }
}
