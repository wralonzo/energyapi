import IMeterType from "../interfaces/meter-type.interface";
import IUser from "../interfaces/user.interface";
import { MeterType } from "../models/MeterType";
import CustomError from "./custom-error.service";

export default class MeterTypeService {
  constructor() {}

  public async create(body: IMeterType): Promise<MeterType> {
    try {
      const data = await MeterType.save(body as MeterType);
      return data;
    } catch (error) {
      throw error;
    }
  }

  public async getAll() {
    try {
      const data = await MeterType.find({
        order: {
          dataCreated: "DESC",
        },
      });
      return data;
    } catch (error) {}
  }

  public async getOne(id: number) {
    try {
      const data = await MeterType.findOne({
        where: { id },
      });
      if (data) return data;
      throw new CustomError(409, "No existe el tipo de medida");
    } catch (error) {
      throw error;
    }
  }

  public async update(id: number, data: IUser) {
    try {
      await this.getOne(id);
      const dataReturn = await MeterType.update({ id }, data as MeterType);
      if (dataReturn.affected > 0) return { updated: true };
      throw new CustomError(409, "No se actualizo el tipo de medida");
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
      throw new CustomError(409, "No se actualizo el tipo de medida");
    } catch (error) {
      throw error;
    }
  }
}
