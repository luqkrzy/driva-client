import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../../model/product';
import { SwitchProductService } from '../switch-product.service';
import { LessonsService } from '../../lessons/lessons.service';
import { IGeneralLesson } from '../../../model/lesson';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-student-lessons',
  templateUrl: './student-lessons.component.html',
  styleUrls: ['./student-lessons.component.scss']
})
export class StudentLessonsComponent implements OnInit {
  isLoading: boolean = true;
  columns = ['lessonId', 'date', 'timeStart', 'hoursCount', 'instructorFistName', 'instructorLastName', 'instructorEmail', 'instructorPhoneNumber', 'edit'];
  displayedColumns = ['id', 'data', 'start', 'l. godz', 'i. imię', 'i. naz.', 'i email', 'i. tel.', '',];
  product: IProduct;
  lessons = new MatTableDataSource<IGeneralLesson>();
  constructor(
    private switchProductService: SwitchProductService,
    private lessonsService: LessonsService) {
  }

  ngOnInit(): void {
    this.isLoading = false;
    this.switchProduct();
  }

  onRowClicked(row: IGeneralLesson) {
    console.log(row);
  }

  private switchProduct(): void {
    this.isLoading = true;
    this.switchProductService.product$.subscribe(product => {
      this.product = product;
      if (product.id) {
        this.getLessons(product.id!);
      }
    });
    this.isLoading = false;
  }

  private getLessons(id: number): void {
    this.lessonsService.getLessonsByProductId(id).subscribe(data => {
      this.lessons.data = data;
      this.isLoading = false;
    });
  }

  addLessonDialog() {
    console.log('add');
  }

  editLesson(lesson: IGeneralLesson) {
    console.log('edit lesson');
  }

  deleteLesson(lesson: IGeneralLesson) {
  }
}
