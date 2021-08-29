import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpResponse } from '@angular/common/http';
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

  getAll(): Observable<IProductType[]> {
    return this.http.get<IProductType[]>(this.url).pipe(
      shareReplay(),
    );
  }

  create(productType: IProductType): Observable<IProductType> {
    return this.http.post<IProductType>(this.url, productType)
      .pipe(shareReplay(1));
  }

  update(id: number, productType: IProductType) {
    return this.http.patch<IProductType>(`${this.url}/${id}`, productType)
      .pipe(shareReplay(1));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete(`${this.url}/${id}`, {observe: 'response'})
      .pipe(shareReplay(1));
  }

  ngOnInit(): void {
    this.productType$ = this.getAll();
  }
}
