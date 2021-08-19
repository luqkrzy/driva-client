export interface IProduct {
  id: number | null;
  studentId: number;
  studentFullName: string;
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
}

export class Product implements Product {
  id?: number;
  studentId: number;
  studentFullName: string;
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
}

