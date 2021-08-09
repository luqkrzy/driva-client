import { IProductType } from './product-type';
import { ILesson } from './lesson';

export interface IProduct {
  id?: number;
  productTypeId: number;
  studentId: number;
  hoursLeft: number;
  bookOnline: boolean;
  isPaid: boolean;
  price: number;
  productType: IProductType;
  lessons: ILesson[];
}

export class Product implements Product {
  id?: number;
  productTypeId: number;
  studentId: number;
  hoursLeft: number;
  bookOnline: boolean;
  isPaid: boolean;
  price: number;
  productType?: IProductType;
  lessons: ILesson[];
}

