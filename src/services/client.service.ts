import IClient from "../interfaces/client.interface";
import { Client } from "../models/Client";
import CustomError from "./custom-error.service";

export default class ClientService {
  constructor() {}

  public async create(body: IClient): Promise<Client> {
    try {
      const data = await Client.save(body as Client);
      return data;
    } catch (error) {
      throw error;
    }
  }

  public async getAll() {
    try {
      const data = await Client.find();
      return data;
    } catch (error) {}
  }

  public async getOne(id: number) {
    try {
      const data = await Client.findOne({
        where: { id },
      });
      if (data) return data;
      throw new CustomError(409, "No existe el cliente");
    } catch (error) {
      throw error;
    }
  }

  public async update(id: number, data: IClient) {
    try {
      await this.getOne(id);
      const dataReturn = await Client.update({ id }, data as Client);
      if (dataReturn.affected > 0) return { updated: true };
      throw new CustomError(409, "No se actualizo el cliente");
    } catch (error) {
      throw error;
    }
  }

  public async delete(id: number) {
    try {
      const deleted = await this.getOne(id);
      await deleted.softRemove({
        data: { dateDeleted: new Date() },
      });
      if ((await deleted.softRemove()).dateDeleted) return { deleted: true };
      throw new CustomError(409, "No se actualizo el cliente");
    } catch (error) {
      throw error;
    }
  }
}
