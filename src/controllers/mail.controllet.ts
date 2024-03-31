import * as express from "express";
import ValidateUrl from "../services/validate-url..service";
import ResponseService from "../shared/response.util";
import IMeterType from "../interfaces/meter-type.interface";
import MeterTypeService from "../services/meter-type.service";
import transporter from "../shared/send-mail.service";

export default class MailController {
  public path = "/mail";
  public router: express.Router = express.Router();
  private readonly validateUrl = new ValidateUrl();

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.use(this.validateUrl.validateInput);
    this.router.post(this.path, this.sendMail);
  }

  public async sendMail(req: express.Request, res: express.Response) {
    try {
      const { nombre, correo, mensaje } = req.body;

      const mailOptions = {
        from: "tucorreo@gmail.com",
        to: "destinatario@gmail.com",
        subject: "Mensaje de contacto",
        text: `Nombre: ${nombre}\nCorreo: ${correo}\nMensaje: ${mensaje}`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error al enviar el correo:", error);
          res.status(500).send("Error al enviar el correo");
        } else {
          console.log("Correo enviado:", info.response);
          res.status(200).send("Correo enviado correctamente");
        }
      });
    } catch (error) {
      return new ResponseService().returnRequest(
        res,
        error,
        error.statusCode,
        error.message
      );
    }
  }
}
