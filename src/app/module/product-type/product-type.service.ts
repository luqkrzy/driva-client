import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProductType } from './product-type';
import { environment } from '../../../environments/environment';
import { shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductTypeService {

  private readonly url = environment.productTypeUrl;
  private productTypeBs = new BehaviorSubject<ProductType[]>([]);
  product$ = this.productTypeBs.asObservable();

  constructor(private http: HttpClient) {
  }

  getAllProductTypes(): Observable<ProductType[]> {
    return this.http.get<ProductType[]>(this.url).pipe(
      shareReplay()
    );
  }

  ngOnInit(): void {
    this.product$ = this.getAllProductTypes();
  }
}
