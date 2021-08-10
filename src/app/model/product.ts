import { ILesson } from './lesson';

export interface IProduct {
  id?: number;
  studentId: number;
  hoursLeft: number;
  bookOnline: boolean;
  isPaid: boolean;
  price: number;
  productTypeId: number;
  productTypeName: string;
  productTypeDescription: string;
  productTypeCategory: string;
  productTypeBasePrice: number;
  productTypeLessonsHours: number;
  lessons: ILesson[];
}

export class Product implements Product {
  id?: number;
  studentId: number;
  hoursLeft: number;
  bookOnline: boolean;
  isPaid: boolean;
  price: number;
  productTypeId: number;
  productTypeName: string;
  productTypeDescription: string;
  productTypeCategory: string;
  productTypeBasePrice: number;
  productTypeLessonsHours: number;
  lessons: ILesson[];
}

