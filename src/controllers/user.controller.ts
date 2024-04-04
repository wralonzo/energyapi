import * as express from "express";
import ValidateUrl from "../services/validate-url..service";
import UserService from "../services/user.service";
import ResponseService from "../shared/response.util";
import IUser from "../interfaces/user.interface";
import ClientService from "../services/client.service";
import CounterService from "../services/counter.service";

class UserController {
  public path = "/user";
  public router: express.Router = express.Router();
  private readonly validateUrl = new ValidateUrl();

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.use(this.validateUrl.validateInput);
    this.router.post(this.path + "/login", this.login);
    this.router.post(this.path, this.createUser);
    this.router.get(this.path, this.getAllUsers);
    this.router.get(this.path + "/:id", this.getUser);
    this.router.put(this.path + "/:id", this.updateUser);
    this.router.delete(this.path + "/:id", this.deleteUser);
  }

  public async login(req: express.Request, res: express.Response) {
    try {
      const user = req.body;
      const data = await new UserService().login(user.user, user.password);
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

  public async createUser(req: express.Request, res: express.Response) {
    try {
      const dataUser: IUser = req.body;
      const data = await new UserService().createUser(dataUser);
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

  public async getAllUsers(req: express.Request, res: express.Response) {
    try {
      const data: Array<IUser> = await new UserService().getAllUsers();
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

  public async getUser(req: express.Request, res: express.Response) {
    try {
      const data: IUser = await new UserService().getUser(+req.params.id);
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

  public async updateUser(req: express.Request, res: express.Response) {
    try {
      const dataUser: IUser = req.body;
      const data = await new UserService().updateUser(+req.params.id, dataUser);
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

  public async deleteUser(req: express.Request, res: express.Response) {
    try {
      const dataClient = await new ClientService().getOneByUser(+req.params.id);
      console.log(dataClient);
      if (dataClient) {
        new CounterService().deleteAll(dataClient.id);
        new ClientService().delete(dataClient.id);
      }
      const data = await new UserService().deleteUser(+req.params.id);
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

export default UserController;
