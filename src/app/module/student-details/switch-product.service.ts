import { Injectable } from '@angular/core';
import { IProduct } from '../../model/product';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SwitchProductService {
  private dataSource = new Subject<IProduct>();
  product$ = this.dataSource.asObservable();

  constructor() {
  }

  switchProduct(product: IProduct): void {
    this.dataSource.next(product);
  }
}
