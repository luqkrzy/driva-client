import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../../model/product';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from '../../products/product.service';
import { ActivatedRoute } from '@angular/router';
import { SwitchProductService } from '../switch-product.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { UpdateProductComponent } from '../update-product/update-product.component';

@Component({
  selector: 'app-student-products',
  templateUrl: './student-products.component.html',
  styleUrls: ['./student-products.component.scss']
})
export class StudentProductsComponent implements OnInit {
  isLoading: boolean = true;
  displayedColumns: string[] = ['id', 'productTypeCategory', 'productTypeName', 'hoursLeft', 'bookOnline', 'isPaid', 'price', 'productTypeBasePrice', 'edit'];
  columnsHeader: string[] = ['id', 'kat.', 'produkt', 'liczba godzin', 'online', 'zapłacono', 'cena', 'c. baz'];
  products = new MatTableDataSource<IProduct>();
  product: IProduct;
  private dialogConfig: MatDialogConfig = new MatDialogConfig();
  private matSnackBarConfig: MatSnackBarConfig = new MatSnackBarConfig();

  constructor(private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private switchProductService: SwitchProductService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,) {
  }

  ngOnInit(): void {
    const id = +this.activatedRoute.snapshot.paramMap.get('id')!;
    this.productService.getProductByStudentId(id).subscribe(data => {
      this.products.data = data;
      this.isLoading = false;
    });
    this.switchProductService.product$.subscribe(product => {
      this.product = product;
    });
    this.dialogConfig.width = '500px';
    this.matSnackBarConfig.duration = 5000;
  }

  onClick(product: IProduct) {
    this.switchProductService.switchProduct(product);
  }

  addProduct() {
    console.log('add product');
  }

  editProduct(product: IProduct): void {
    this.dialogConfig.data = product;
    const dialogRef = this.dialog.open(UpdateProductComponent, this.dialogConfig);
    dialogRef.afterClosed().subscribe((data: IProduct) => {
      if (data.id != null) {
        this.productService.updateProduct(data).subscribe(resp => {
          if (resp.id) {
            this.products.data.filter(p => p.id === data.id).map(p => {
              p.productTypeId = data.productTypeId;
              p.hoursLeft = data.hoursLeft;
              p.bookOnline = data.bookOnline;
              p.isPaid = data.isPaid;
              p.price = data.price;
            });
            this.snackBar.open('Zaktualizowano', 'OK', this.matSnackBarConfig);
          }
        });
      }
    });
  }
}


