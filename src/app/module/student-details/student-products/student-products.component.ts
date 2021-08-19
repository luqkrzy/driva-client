import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../../model/product';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from '../../products/product.service';
import { ActivatedRoute } from '@angular/router';
import { SwitchProductService } from '../switch-product.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { UpdateProductComponent } from '../update-product/update-product.component';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { AddProductComponent } from '../add-product/add-product.component';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-student-products',
  templateUrl: './student-products.component.html',
  styleUrls: ['./student-products.component.scss']
})
export class StudentProductsComponent implements OnInit {
  isLoading: boolean = true;
  displayedColumns: string[] = ['id', 'productTypeCategory', 'productTypeName', 'hoursLeft', 'bookOnline', 'isPaid', 'price', 'productTypeBasePrice', 'edit'];
  products = new MatTableDataSource<IProduct>();
  product: IProduct;
  private studentId: number;
  private dialogConfig: MatDialogConfig = new MatDialogConfig();
  private matSnackBarConfig: MatSnackBarConfig = new MatSnackBarConfig();

  constructor(private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private switchProductService: SwitchProductService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,) {
  }

  ngOnInit(): void {
    this.studentId = +this.activatedRoute.snapshot.paramMap.get('id')!;
    this.productService.getProductByStudentId(this.studentId).subscribe(data => {
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
    this.dialogConfig.data = this.studentId;
    const dialogRef = this.dialog.open(AddProductComponent, this.dialogConfig);
    dialogRef.afterClosed().subscribe((data: IProduct) => {
      if (data) {
        this.productService.createProduct(data).subscribe((product: IProduct) => {
          if (product) {
            this.products.data.push(product);
            this.products.data = this.products.data;
            this.snackBar.open('Dodano do bazy', 'OK', this.matSnackBarConfig);
          }
        });
      }
    });
  }

  editProduct(product: IProduct): void {
    this.dialogConfig.data = product;
    const dialogRef = this.dialog.open(UpdateProductComponent, this.dialogConfig);
    dialogRef.afterClosed().subscribe((data: IProduct) => {
      if (data) {
        this.productService.updateProduct(data).subscribe(resp => {
          if (resp.id) {
            this.products.data.filter(p => p.id === data.id).map(p => {
              p.productTypeName = data.productTypeName;
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

  deleteProduct(id: number) {
    this.dialogConfig.data = id;
    const dialogRef = this.dialog.open(DeleteDialogComponent, this.dialogConfig);
    dialogRef.afterClosed().subscribe(id => {
      if (id) {
        this.productService.deleteProduct(id).subscribe((resp: HttpResponse<any>) => {
          if (resp.status === 204) {
            this.products.data = this.products.data.filter(p => p.id !== id);
            this.snackBar.open('Usunięto', 'OK', this.matSnackBarConfig);
            this.product.id = null;
            this.switchProductService.switchProduct(this.product);
            if (this.products.data.length === 0) {
              this.switchProductService.switchButton(true);
            }
          }
        });
      }
    });
  }
}


