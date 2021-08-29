import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { IProductType } from '../../model/product-type';
import { Router } from '@angular/router';
import { ProductTypeService } from './product-type.service';
import { DeleteDialogComponent } from '../student-details/delete-dialog/delete-dialog.component';
import { AddProductTypeComponent } from './add-product-type/add-product-type.component';
import { UpdateProductTypeComponent } from './update-product-type/update-product-type.component';

@Component({
  selector: 'app-product-type',
  templateUrl: './product-type.component.html',
  styleUrls: ['./product-type.component.scss']
})
export class ProductTypeComponent implements OnInit, AfterViewInit {
  isLoadingResults = true;
  readonly columns: string[] = ['id', 'productCategory', 'name', 'description', 'basePrice', 'lessonsHours', 'edit'];
  readonly displayedColumns = ['id', 'Kat.', 'Nazwa', 'opis', 'c. baz.', 'l. godzin', ''];
  dataSource = new MatTableDataSource<IProductType>();
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<any>;
  private dialogConfig: MatDialogConfig = new MatDialogConfig();
  private matSnackBarConfig: MatSnackBarConfig = new MatSnackBarConfig();

  constructor(
    private productTypeService: ProductTypeService,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) {
  }

  ngOnInit(): void {
    this.dialogConfig.width = '800px';
    this.matSnackBarConfig.duration = 5000;
  }

  applyFilter(filterValue: any): void {
    let value = filterValue.target.value;
    this.dataSource.filter = value.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngAfterViewInit(): void {
    this.productTypeService.getAll().subscribe((data: IProductType[]) => {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.isLoadingResults = false;
      },
      () => {
        this.isLoadingResults = false;
      }
    );
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddProductTypeComponent, this.dialogConfig);
    dialogRef.afterClosed().subscribe((productType: IProductType) => {
      if (productType) {
        this.save(productType);
      }
    });
  }

  update(productType: IProductType) {
    this.dialogConfig.data = productType;
    const dialogRef = this.dialog.open(UpdateProductTypeComponent, this.dialogConfig);
    dialogRef.afterClosed().subscribe((data: IProductType) => {
      if (data) {
        this.productTypeService.update(data.id as number, data).subscribe((result: IProductType) => {
          if (result.id) {
            this.dataSource.data.filter(i => i.id === data.id).map(i => {
              i.name = data.name;
              i.productCategory = data.productCategory;
              i.description = data.description;
              i.lessonsHours = data.lessonsHours;
              i.basePrice = data.basePrice;
            });
            this.snackBar.open("Zaktualizowano", 'OK', this.matSnackBarConfig);
          }
        });
      }
    });
  }

  delete(id: number) {
    this.dialogConfig.data = id;
    const dialogRef = this.dialog.open(DeleteDialogComponent, this.dialogConfig);
    dialogRef.afterClosed().subscribe((id: number) => {
      if (id) {
        this.productTypeService.delete(id).subscribe(resp => {
          if (resp.status === 204) {
            this.dataSource.data = this.dataSource.data.filter(p => p.id !== id);
            this.snackBar.open('Usunięto', 'OK', this.matSnackBarConfig);
          }
        }, () => {
          this.snackBar.open('Rekordu nie można usunąć, gdyż powiązane są z nim inne zasoby', 'OK', this.matSnackBarConfig);
        });
      }
    });
  }

  private save(productType: IProductType): void {
    this.productTypeService.create(productType).subscribe((result: IProductType) => {
        this.snackBar.open('Dodano do bazy', 'OK', this.matSnackBarConfig);
        this.dataSource.data.push(result);
        this.dataSource.data = this.dataSource.data;
      },
      () => {
        this.isLoadingResults = false;
      }
    );
  }
}
