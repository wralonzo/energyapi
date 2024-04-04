import IUser from "../interfaces/user.interface";
import { User } from "../models/User";
import CustomError from "./custom-error.service";

class UserService {
  constructor() {}

  public async login(userad: string, password: string) {
    try {
      const user = await User.findOne({
        relations: {
          clientFk: true,
        },
        where: { user: userad },
      });
      if (user && user.password === password) {
        const dataClient: any = user.clientFk;

        return {
          ...user,
          idClient: dataClient.length > 0 ? user.clientFk.id : null,
          nameClient: dataClient.length > 0 ? dataClient[0].name : null,
          counter: dataClient.length > 0 ? dataClient[0].numeroMedidor : null,
          test: "test",
        };
      }

      throw new CustomError(409, "No existe el usuario");
    } catch (error) {
      throw error;
    }
  }

  public async createUser(body: IUser): Promise<User> {
    try {
      const data = await User.save(body as User);
      return data;
    } catch (error) {
      throw error;
    }
  }

  public async getAllUsers() {
    try {
      const data = await User.find({
        order: {
          dataCreated: "DESC",
        },
      });
      return data;
    } catch (error) {
      throw error;
    }
  }

  public async getUser(id: number) {
    try {
      const user = await User.findOne({
        where: { id },
      });
      if (user) return user;
      throw new CustomError(409, "No existe el usuario");
    } catch (error) {
      throw error;
    }
  }

  public async updateUser(id: number, data: IUser) {
    try {
      await this.getUser(id);
      const dataReturn = await User.update({ id }, data as User);
      if (dataReturn.affected > 0) return { updated: true };
      throw new CustomError(409, "No se actualizo el usuario");
    } catch (error) {
      throw error;
    }
  }

  public async deleteUser(id: number) {
    try {
      const deleted = await this.getUser(id);
      const dataReturn = await deleted.softRemove({
        data: { dateDeleted: new Date() },
      });
      if ((await deleted.softRemove()).dateDeleted) return { deleted: true };
      throw new CustomError(409, "No se actualizo el usuario");
    } catch (error) {
      throw error;
    }
  }
}
export default UserService;
