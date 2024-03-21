import * as express from "express";
import ValidateUrl from "../services/validate-url..service";
import ResponseService from "../shared/response.util";
import IMeterType from "../interfaces/meter-type.interface";
import MeterTypeService from "../services/meter-type.service";

export default class MeterTypeController {
  public path = "/meter-type";
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
      const dataUser: IMeterType = req.body;
      const data = await new MeterTypeService().create(dataUser);
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
      const data: Array<IMeterType> = await new MeterTypeService().getAll();
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
      const data: IMeterType = await new MeterTypeService().getOne(
        +req.params.id
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

  public async update(req: express.Request, res: express.Response) {
    try {
      const dataUser: IMeterType = req.body;
      const data = await new MeterTypeService().update(
        +req.params.id,
        dataUser
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

  public async delete(req: express.Request, res: express.Response) {
    try {
      const data = await new MeterTypeService().delete(+req.params.id);
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
