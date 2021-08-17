import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../../model/product';
import { SwitchProductService } from '../switch-product.service';
import { LessonsService } from '../../lessons/lessons.service';
import { IGeneralLesson } from '../../../model/lesson';

@Component({
  selector: 'app-student-lessons',
  templateUrl: './student-lessons.component.html',
  styleUrls: ['./student-lessons.component.scss']
})
export class StudentLessonsComponent implements OnInit {
  isLoading: boolean = true;
  displayedColumns: string[] = ['id', 'data', 'start', 'koniec', 'instruktor'];
  product: IProduct;
  lessons: IGeneralLesson[] = [];

  constructor(
    private switchProductService: SwitchProductService,
    private lessonsService: LessonsService) {
  }

  ngOnInit(): void {
    this.switchProduct();
  }

  private switchProduct(): void {
    this.switchProductService.product$.subscribe(product => {
      this.product = product;
      if (product.id) {
        this.getLessons(product.id!);
      }
      this.isLoading = false;
    });
  }

  private getLessons(id: number): void {
    this.lessonsService.getLessonsByProductId(id).subscribe(data => {
      this.lessons = data;
      this.isLoading = false;
    });
  }
}
