import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../../model/product';
import { SwitchProductService } from '../switch-product.service';
import { LessonsService } from '../../lessons/lessons.service';
import { ILesson } from '../../../model/lesson';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { AddLessonComponent } from '../add-lesson/add-lesson.component';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { HttpResponse } from '@angular/common/http';
import { UpdateLessonComponent } from '../update-lesson/update-lesson.component';

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

  updateLesson(lesson: ILesson) {
    this.dialogConfig.data = lesson;
    const dialogRef = this.dialog.open(UpdateLessonComponent, this.dialogConfig);
    dialogRef.afterClosed().subscribe((updatedLesson: ILesson) => {
      if (updatedLesson) {
        this.lessonsService.updateLesson(updatedLesson).subscribe((lesson: ILesson) => {
          if (lesson.id) {
            this.lessons.data.filter(l => l.id === lesson.id).map(l => {
              l.id = lesson.id;
              l.date = lesson.date;
              l.timeStart = lesson.timeStart;
              l.hoursCount = lesson.hoursCount;
              l.instructorFistName = lesson.instructorFistName;
              l.instructorLastName = lesson.instructorLastName;
              l.instructorEmail = lesson.instructorEmail;
              l.instructorPhone = lesson.instructorPhone;
            });
          }
          this.snackBar.open('Zaktualizowano', 'OK', this.matSnackBarConfig);
        });
      }
    });
  }

  deleteLesson(id: number) {
    this.dialogConfig.data = id;
    const dialogRef = this.dialog.open(DeleteDialogComponent, this.dialogConfig);
    dialogRef.afterClosed().subscribe((id: number) => {
      if (id) {
        this.lessonsService.deleteLesson(id).subscribe((resp: HttpResponse<any>) => {
          if (resp.status === 204) {
            this.lessons.data = this.lessons.data.filter(p => p.id !== id);
            this.snackBar.open('Usunięto', 'OK', this.matSnackBarConfig);
          }
        });
      }
    });
  }

  private switchButton() {
    this.switchProductService.buttons$.subscribe(data => {
      this.switchAddButton = data;
    });
  }
}
