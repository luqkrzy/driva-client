export interface Product {
  id: number;
  productTypeId: number;
  studentId: number;
  hoursLeft: number;
  bookOnline: boolean;
  isPaid: boolean;
  price: number;
}

export interface Student {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  createdBy?: number;
  createdDate?: Date;
  userId: number;
  products?: Product[];
}
