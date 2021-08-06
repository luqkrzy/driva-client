import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ProductType } from './product-type';
import { ProductTypeService } from './product-type.service';



@Component({
  selector: 'app-product-type',
  templateUrl: './product-type.component.html',
  styleUrls: ['./product-type.component.scss']
})
export class ProductTypeComponent implements OnInit {
  isLoadingResults = true;
  displayedColumns: string[] = ['id', 'basePrice', 'name', 'lessonsHours', 'description', 'productCategory'];
  dataSource: MatTableDataSource<ProductType>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort = new MatSort();
  @ViewChild(MatTable) table: MatTable<any>;

  constructor(private productTypeService: ProductTypeService, private router: Router) { 

  }

  getProductTypes() {
    this.productTypeService.getAllProductTypes().subscribe(productType => {
      console.log(productType)
    })
  }

  applyFilter(filterValue: any) {
    let value = filterValue.target.value;
    this.dataSource.filter = value.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<ProductType>();
    this.getProductTypes();
  }

  ngAfterViewInit(): void {

    this.productTypeService.getAllProductTypes().subscribe((data: ProductType[]) => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.isLoadingResults = false;
    }, (error: HttpErrorResponse) => {
      console.log(error);
    });
  }

  onClick(row: HTMLElement) {
    console.log(row);
    this.router.navigateByUrl('home');
  }


}