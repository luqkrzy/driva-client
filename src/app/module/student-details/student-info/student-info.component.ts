import { Component, OnInit } from '@angular/core';
import { IStudent, Student } from '../../../model/student';
import { StudentService } from '../../students/student.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { UpdateStudentAccountComponent } from '../update-student-account/update-student-account.component';

@Component({
  selector: 'app-student-info',
  templateUrl: './student-info.component.html',
  styleUrls: ['./student-info.component.scss']
})
export class StudentInfoComponent implements OnInit {
  isLoading: boolean = true;
  student: IStudent = new Student();
  private dialogConfig: MatDialogConfig = new MatDialogConfig();
  private matSnackBarConfig: MatSnackBarConfig = new MatSnackBarConfig();

  constructor(private studentService: StudentService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,) {
  }

  ngOnInit(): void {
    const id = +this.activatedRoute.snapshot.paramMap.get('id')!;
    this.studentService.getStudent(id).subscribe((result: IStudent) => {
      this.student = result;
      this.isLoading = false;
    });
    this.dialogConfig.width = '500px';
    this.matSnackBarConfig.duration = 5000;
  }

  onEdit() {
    this.dialogConfig.data = this.student;
    const dialogRef = this.dialog.open(UpdateStudentAccountComponent, this.dialogConfig);
    dialogRef.afterClosed().subscribe((data: IStudent) => {
      if (data) {
        this.studentService.updateStudent(data.id as number, data).subscribe(student => {
          this.student = student;
          this.snackBar.open("Zaktualizowano", 'OK', this.matSnackBarConfig);
        });
      }
    });
  }
}
