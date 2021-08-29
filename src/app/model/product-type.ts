export interface IProductType {
  id: number;
  name: string;
  description: string;
  productCategory: string;
  basePrice: number;
  lessonsHours: number;
}

export class ProductType implements IProductType {
  id: number;
  name: string;
  description: string;
  productCategory: string;
  basePrice: number;
  lessonsHours: number;
}
