import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { StudentListService } from './student-list.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { AddStudentComponent } from './add-student/add-student.component';
import { StudentService } from './student.service';
import { HttpErrorResponse } from '@angular/common/http';
import { IStudent } from '../../model/student';

@Component({
  selector: 'app-students',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.scss']
})
export class StudentsListComponent implements OnInit, AfterViewInit {
  isLoadingResults = true;
  readonly displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'phoneNumber'];
  dataSource = new MatTableDataSource<IStudent>();
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<any>;
  private dialogConfig: MatDialogConfig = new MatDialogConfig();
  private matSnackBarConfig: MatSnackBarConfig = new MatSnackBarConfig();

  constructor(private studentListService: StudentListService,
    private studentService: StudentService,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,) {
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
    this.studentListService.getAllStudents().subscribe((data: IStudent[]) => {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.isLoadingResults = false;
      },
      (error: HttpErrorResponse) => {
        this.isLoadingResults = false;
      }
    );
  }

  onClick(row: IStudent): void {
    this.router.navigateByUrl('students/' + row.id);
  }

  openAddStudentDialog(): void {
    const dialogRef = this.dialog.open(AddStudentComponent, this.dialogConfig);
    dialogRef.afterClosed().subscribe((student: IStudent) => {
      if (student) {
        this.saveStudent(student);
      }
    });
  }

  private saveStudent(student: IStudent): void {
    this.studentService.createStudent(student).subscribe((result: IStudent) => {
        this.snackBar.open('Dodano do bazy', 'OK', this.matSnackBarConfig);
        this.dataSource.data.push(result);
        this.dataSource.data = this.dataSource.data;
        this.router.navigateByUrl('students/' + result.id);
      },
      (error: HttpErrorResponse) => {
        this.isLoadingResults = false;
      }
    );
  }
}
