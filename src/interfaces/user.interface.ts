export default interface IUser {
  id?: number;
  name?: string;
  surname?: string;
  role?: string;
  password?: string;
  user?: string;
  email?: string;
  phone?: string;
  dataCreated?: Date;
  dateUpdated?: Date;
  dateDeleted?: Date;
  lastAccess?: Date;
}
