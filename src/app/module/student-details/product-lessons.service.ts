import { Injectable } from '@angular/core';
import { IProduct, Product } from '../../model/product';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductLessonsService {
  private dataSource = new BehaviorSubject<IProduct>(new Product());
  product$ = this.dataSource.asObservable();

  constructor() {
  }

  switchProduct(product: IProduct): void {
    this.dataSource.next(product);
  }
}
