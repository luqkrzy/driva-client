import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { IProduct } from '../../model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly url = environment.productUrl;

  constructor(private http: HttpClient) {
  }

  createProduct(student: IProduct): Observable<IProduct> {
    return this.http.post<IProduct>(this.url, student);
  }

  getProduct(id: number): Observable<IProduct> {
    return this.http.get<IProduct>(`${this.url}/${id}`)
      .pipe(shareReplay(1));
  }

  deleteProduct(id: number) {
    return this.http.delete(`${this.url}/${id}`, {observe: 'response'})
      .pipe(shareReplay(1));
  }

  getProductByStudentId(id: number): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${this.url}/student/${id}`)
      .pipe(shareReplay(1));
  }

  updateProduct(product: IProduct): Observable<IProduct> {
    return this.http.patch<IProduct>(`${this.url}/${product.id}`, product);
  }

  getAllProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.url).pipe(
      shareReplay(),
    );
  }
}
