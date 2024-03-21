export default interface IClient {
  id?: number;
  name?: string;
  email?: string;
  phone?: string;
  clientType?: string;
  idMeterType?: number;
  idUser?: number;
  coments?: string;
  location?: string;
  alert?: string;
  dataCreated?: Date;
  dateUpdated?: Date;
  dateDeleted?: Date;
}
