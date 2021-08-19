import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../../model/product';
import { SwitchProductService } from '../switch-product.service';
import { LessonsService } from '../../lessons/lessons.service';
import { ILesson } from '../../../model/lesson';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { AddLessonComponent } from '../add-lesson/add-lesson.component';

@Component({
  selector: 'app-student-lessons',
  templateUrl: './student-lessons.component.html',
  styleUrls: ['./student-lessons.component.scss']
})
export class StudentLessonsComponent implements OnInit {
  isLoading: boolean = true;
  columns = ['id', 'date', 'timeStart', 'hoursCount', 'instructorFistName', 'instructorLastName', 'instructorEmail', 'instructorPhoneNumber', 'edit'];
  displayedColumns = ['id', 'data', 'start', 'l. godz', 'i. imię', 'i. naz.', 'i. email', 'i. tel.', '',];
  product: IProduct;
  lessons = new MatTableDataSource<ILesson>();
  switchAddButton: boolean = true;
  private dialogConfig: MatDialogConfig = new MatDialogConfig();
  private matSnackBarConfig: MatSnackBarConfig = new MatSnackBarConfig();

  constructor(
    private switchProductService: SwitchProductService,
    private lessonsService: LessonsService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,) {
  }

  ngOnInit(): void {
    this.isLoading = false;
    this.switchButton();
    this.switchProduct();
    this.dialogConfig.width = '500px';
    this.matSnackBarConfig.duration = 5000;
  }

  onRowClicked(row: ILesson) {
    console.log(row);
  }

  addLessonDialog() {
    if (this.product.id != null) {
      this.dialogConfig.data = this.product.id;
      const dialogRef = this.dialog.open(AddLessonComponent, this.dialogConfig);
      dialogRef.afterClosed().subscribe((lesson: ILesson) => {
        if (lesson) {
          this.lessonsService.createLesson(lesson).subscribe((result: ILesson) => {
            console.log(result);
            this.lessons.data.push(result);
            this.lessons.data = this.lessons.data;
            this.snackBar.open('Dodano do bazy', 'OK', this.matSnackBarConfig);
          });
        }
      });
    }
  }

  private getLessons(id: number): void {
    this.lessonsService.getLessonsByProductId(id).subscribe(data => {
      this.lessons.data = data;
      this.isLoading = false;
    });
  }

  private switchProduct(): void {
    this.switchProductService.product$.subscribe(product => {
      this.product = product;
      if (product.id) {
        this.getLessons(product.id);
        this.switchProductService.switchButton(false);
      }
    });
    this.isLoading = false;
  }

  editLesson(lesson: ILesson) {
    console.log('edit lesson');
  }

  deleteLesson(lesson: ILesson) {
  }

  private switchButton() {
    this.switchProductService.buttons$.subscribe(data => {
      this.switchAddButton = data;
    });
  }
}
