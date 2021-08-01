import { Product } from '../products/Product';

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
