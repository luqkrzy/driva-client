import { Injectable } from '@angular/core';
import { IProduct } from '../../model/product';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SwitchProductService {
  private productSource = new Subject<IProduct>();
  product$ = this.productSource.asObservable();
  private buttonSource = new Subject<boolean>();
  buttons$ = this.buttonSource.asObservable();

  constructor() {
  }

  switchProduct(product: IProduct): void {
    this.productSource.next(product);
  }

  switchButton(state: boolean): void {
    this.buttonSource.next(state);
  }
}
