import IClient from "../interfaces/client.interface";
import ICounter from "../interfaces/counter.interface";
import { CounterTracking } from "../models/Counter";
import ResponseService from "../shared/response.util";
import transporter from "../shared/send-mail.service";
import CustomError from "./custom-error.service";

export default class CounterService {
  constructor() {}

  public async create(body: IClient) {
    try {
      const mailOptions = {
        from: process.env.EMAIL,
        to: body.email,
        subject: "Notificación de facturacion electrónica",
        text: `Nombre: ${body.name}\nCorreo: ${body.email}\nMensaje: ${body.alert}`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          throw new CustomError(409, "Error al enviar el correo");
        } else {
          return true;
        }
      });
    } catch (error) {
      throw error;
    }
  }
}
