import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../../model/product';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from '../../products/product.service';
import { ActivatedRoute } from '@angular/router';
import { SwitchProductService } from '../switch-product.service';

@Component({
  selector: 'app-student-products',
  templateUrl: './student-products.component.html',
  styleUrls: ['./student-products.component.scss']
})
export class StudentProductsComponent implements OnInit {
  isLoading: boolean = true;
  displayedColumns: string[] = ['id', 'productTypeCategory', 'productTypeName', 'hoursLeft', 'bookOnline', 'isPaid', 'price', 'productTypeBasePrice', 'edit'];
  columnsHeader: string[] = ['id', 'kat.', 'produkt', 'liczba godzin', 'online', 'zapłacono', 'cena', 'c. baz'];
  dataSource = new MatTableDataSource<IProduct>();
  product: IProduct;

  constructor(private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private productLessonsService: SwitchProductService) {
  }

  ngOnInit(): void {
    const id = +this.activatedRoute.snapshot.paramMap.get('id')!;
    this.productService.getProductByStudentId(id).subscribe(data => {
      this.dataSource.data = data;
      this.isLoading = false;
    });
    this.productLessonsService.product$.subscribe(product => {
      this.product = product;
    });
  }

  onClick(product: IProduct) {
    this.productLessonsService.switchProduct(product);
  }

  addProduct() {
    console.log('add product');
  }

  editProduct(id: number) {
    console.log(id);
  }
}


