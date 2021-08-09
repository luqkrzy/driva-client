import { Component, Input, OnInit } from '@angular/core';
import { IProduct } from '../../../../model/product';

@Component({
  selector: 'app-student-products',
  templateUrl: './student-products.component.html',
  styleUrls: ['./student-products.component.scss']
})
export class StudentProductsComponent implements OnInit {
  @Input() products: IProduct[];
  displayedColumns: string[] = ['id', 'data', 'start', 'koniec', 'instruktor'];

  constructor() {
  }

  ngOnInit(): void {
  }
}
