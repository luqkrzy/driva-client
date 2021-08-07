export interface IProduct {
  id?: number;
  productTypeId: number;
  studentId: number;
  hoursLeft: number;
  bookOnline: boolean;
  isPaid: boolean;
  price: number;
}

export class Product implements Product {
  id?: number;
  productTypeId: number;
  studentId: number;
  hoursLeft: number;
  bookOnline: boolean;
  isPaid: boolean;
  price: number;
}

