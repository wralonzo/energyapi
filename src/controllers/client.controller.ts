import * as express from "express";
import ValidateUrl from "../services/validate-url..service";
import ResponseService from "../shared/response.util";
import ClientService from "../services/client.service";
import IClient from "../interfaces/client.interface";
import ICounter from "../interfaces/counter.interface";
import CounterService from "../services/counter.service";
import IUser from "../interfaces/user.interface";
import UserService from "../services/user.service";
import EmailService from "../services/mail.service";
import { join } from "path";
import { mkdirSync } from "fs";
import PdfPrinter from "pdfmake";
import { fonts, tableFormat } from "../constants/pdf";
import { checkIfFileOrDirectoryExists } from "../constants/validatepath";
import * as fs from "fs";
import PdfFonts from "pdfmake/build/vfs_fonts";

export default class ClientController {
  public path = "/client";
  public router: express.Router = express.Router();
  private readonly validateUrl = new ValidateUrl();

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.use(this.validateUrl.validateInput);
    this.router.post(this.path, this.create);
    this.router.get(this.path, this.find);
    this.router.get(this.path + "/counter/:id", this.findOneCounter);
    this.router.delete(this.path + "/counter/:id", this.deleteCounter);
    this.router.delete(this.path + "/pdf/:id", this.deleteCounter);
    this.router.post(this.path + "/counter", this.createCounter);
    this.router.get(this.path + "/:id", this.findOne);
    this.router.put(this.path + "/:id", this.update);
    this.router.delete(this.path + "/:id", this.delete);
  }

  public async create(req: express.Request, res: express.Response) {
    try {
      const dataClient: IClient = req.body;
      const dataUser: IUser = {
        name: dataClient.name,
        role: "Cliente",
        password: `client${dataClient.phone}`,
        user: `client${dataClient.phone}`,
        email: dataClient.email,
        phone: dataClient.phone,
      };
      const saveUser = await new UserService().createUser(dataUser);
      dataClient.idUser = saveUser.id;
      const data = await new ClientService().create(dataClient);
      return new ResponseService().returnRequest(res, data);
    } catch (error) {
      return new ResponseService().returnRequest(
        res,
        error,
        error.statusCode,
        error.message
      );
    }
  }

  public async createCounter(req: express.Request, res: express.Response) {
    try {
      const dataUpdate: ICounter = req.body;
      console.log(dataUpdate);
      const clientData = await new ClientService().getOne(dataUpdate.idClient);
      await new CounterService().updateAll(dataUpdate.idClient);
      const data = await new CounterService().create(dataUpdate);

      const printer = new PdfPrinter(fonts);

      const docDefinition: any = tableFormat(data, clientData.name);

      const PATH_ORIGIN = join(__dirname, "../../static/pdf");
      if (!checkIfFileOrDirectoryExists(PATH_ORIGIN)) {
        mkdirSync(PATH_ORIGIN);
      }
      const FILE_NAME = new Date().toISOString() + ".pdf";
      const PATH = `${PATH_ORIGIN}/${FILE_NAME}`;
      console.log(JSON.stringify(docDefinition));

      const pdfDoc = printer.createPdfKitDocument(docDefinition, {});
      pdfDoc.pipe(fs.createWriteStream(PATH));
      pdfDoc.end();
      await new EmailService().sendMail(
        clientData.alert,
        clientData.email,
        data.id.toString(),
        dataUpdate.price.toString(),
        PATH
      );
      return new ResponseService().returnRequest(res, data);
    } catch (error) {
      // throw error;
      return new ResponseService().returnRequest(
        res,
        error,
        error.statusCode,
        error.message
      );
    }
  }
  public async find(req: express.Request, res: express.Response) {
    try {
      const data: Array<IClient> = await new ClientService().getAll();
      return new ResponseService().returnRequest(res, data);
    } catch (error) {
      return new ResponseService().returnRequest(
        res,
        error,
        error.statusCode,
        error.message
      );
    }
  }

  public async findOneCounter(req: express.Request, res: express.Response) {
    try {
      const medidor: string = req.params.id;
      const data: IClient = await new ClientService().getOneCounterData(
        medidor
      );
      return new ResponseService().returnRequest(res, data);
    } catch (error) {
      return new ResponseService().returnRequest(
        res,
        error,
        error.statusCode,
        error.message
      );
    }
  }

  public async findOne(req: express.Request, res: express.Response) {
    try {
      const data: IClient = await new ClientService().getOne(+req.params.id);
      return new ResponseService().returnRequest(res, data);
    } catch (error) {
      return new ResponseService().returnRequest(
        res,
        error,
        error.statusCode,
        error.message
      );
    }
  }

  public async update(req: express.Request, res: express.Response) {
    try {
      const dataUser: IClient = req.body;
      const data = await new ClientService().update(+req.params.id, dataUser);
      return new ResponseService().returnRequest(res, data);
    } catch (error) {
      return new ResponseService().returnRequest(
        res,
        error,
        error.statusCode,
        error.message
      );
    }
  }

  public async delete(req: express.Request, res: express.Response) {
    try {
      const data = await new ClientService().delete(+req.params.id);
      return new ResponseService().returnRequest(res, data);
    } catch (error) {
      return new ResponseService().returnRequest(
        res,
        error,
        error.statusCode,
        error.message
      );
    }
  }

  public async deleteCounter(req: express.Request, res: express.Response) {
    try {
      const medidor: string = req.params.id;
      const data = await new CounterService().delete(+medidor);
      return new ResponseService().returnRequest(res, data);
    } catch (error) {
      return new ResponseService().returnRequest(
        res,
        error,
        error.statusCode,
        error.message
      );
    }
  }

  // public async getPdf(req: express.Request, res: express.Response) {
  //   try {
  //     const printer = new PdfPrinter(fonts);
  //     const docDefinition = tableFormat([]);
  //     const PATH_ORIGIN = join(__dirname, "../../../static/pdf");
  //     if (!checkIfFileOrDirectoryExists(PATH_ORIGIN)) {
  //       mkdirSync(PATH_ORIGIN);
  //     }
  //     const FILE_NAME = new Date().toISOString() + ".pdf";
  //     const PATH = `${PATH_ORIGIN}/${FILE_NAME}`;

  //     const pdfDoc = printer.createPdfKitDocument(docDefinition, {});
  //     pdfDoc.pipe(fs.createWriteStream(PATH));
  //     pdfDoc.end();
  //     return res.sendFile(PATH);
  //   } catch (error) {
  //     throw error;
  //   }
  // }
}
