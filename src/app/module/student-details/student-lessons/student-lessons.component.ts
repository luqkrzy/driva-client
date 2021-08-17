import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../../model/product';
import { ProductLessonsService } from '../product-lessons.service';

@Component({
  selector: 'app-student-lessons',
  templateUrl: './student-lessons.component.html',
  styleUrls: ['./student-lessons.component.scss']
})
export class StudentLessonsComponent implements OnInit {
  displayedColumns: string[] = ['id', 'data', 'start', 'koniec', 'instruktor'];
  product: IProduct;

  constructor(
    private productLessonsService: ProductLessonsService,
  ) {
  }

  ngOnInit(): void {
    this.productLessonsService.product$.subscribe(product => {
      this.product = product;
      console.log(product);
    });
  }
}
