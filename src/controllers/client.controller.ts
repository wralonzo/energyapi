import * as express from "express";
import ValidateUrl from "../services/validate-url..service";
import ResponseService from "../shared/response.util";
import ClientService from "../services/client.service";
import IClient from "../interfaces/client.interface";

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
    this.router.get(this.path + "/:id", this.findOne);
    this.router.put(this.path + "/:id", this.update);
    this.router.delete(this.path + "/:id", this.delete);
  }

  public async create(req: express.Request, res: express.Response) {
    try {
      const dataUser: IClient = req.body;
      console.log(req.body);
      const data = await new ClientService().create(dataUser);
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
}
