import { IProduct } from './product';

export interface IStudent {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  createdBy?: number;
  createdDate?: Date;
  userId?: number;
  products?: IProduct[];
}

export class Student implements IStudent {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  createdBy?: number;
  createdDate?: Date;
  userId?: number;
  products?: IProduct[];

}
