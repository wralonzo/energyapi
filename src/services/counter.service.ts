import ICounter from "../interfaces/counter.interface";
import { CounterTracking } from "../models/Counter";
import CustomError from "./custom-error.service";

export default class CounterService {
  constructor() {}

  public async create(body: ICounter): Promise<ICounter> {
    try {
      const data = await CounterTracking.save(body as CounterTracking);
      return data;
    } catch (error) {
      throw error;
    }
  }

  public async getAll() {
    try {
      const data = await CounterTracking.find({
        order: {
          dataCreated: "DESC",
        },
      });
      return data;
    } catch (error) {}
  }

  public async getOne(id: number) {
    try {
      const data = await CounterTracking.findOne({
        where: { id },
      });
      if (data) return data;
      throw new CustomError(409, "No existe el contador");
    } catch (error) {
      throw error;
    }
  }

  public async getAllClient(id: number) {
    try {
      const data = await CounterTracking.findOne({
        where: { idClient: id },
      });
      return data;
    } catch (error) {
      throw error;
    }
  }

  public async update(id: number, data: ICounter) {
    try {
      await this.getOne(id);
      const dataReturn = await CounterTracking.update({ id }, data as ICounter);
      if (dataReturn.affected > 0) return { updated: true };
      throw new CustomError(409, "No se actualizo el contador");
    } catch (error) {
      throw error;
    }
  }

  public async updateAll(idClient: number) {
    try {
      const dataReturn = await CounterTracking.update(
        { idClient },
        {
          status: 0,
        }
      );
      return { updated: true };
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
      throw new CustomError(409, "No se actualizo el contador");
    } catch (error) {
      throw error;
    }
  }

  public async deleteAll(id: number) {
    try {
      await CounterTracking.update(
        {
          idClient: id,
        },
        {
          dateDeleted: new Date(),
        }
      );
    } catch (error) {
      throw error;
    }
  }
}
