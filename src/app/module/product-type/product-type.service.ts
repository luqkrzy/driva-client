import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { IStudent } from '../../model/student';
import { BehaviorSubject, Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { IProductType } from '../../model/product-type';

@Injectable({
  providedIn: 'root'
})
export class ProductTypeService {
  private readonly url = environment.productTypeUrl;
  private productTypeBs = new BehaviorSubject<IStudent[]>([]);
  productType$ = this.productTypeBs.asObservable();

  constructor(private http: HttpClient) {
  }

  getAllProductTypes(): Observable<IProductType[]> {
    return this.http.get<IProductType[]>(this.url).pipe(
      shareReplay(),
    );
  }

  ngOnInit(): void {
    this.productType$ = this.getAllProductTypes();
  }
}
