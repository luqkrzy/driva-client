import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Student } from './student';
import { StudentService } from './student.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit, AfterViewInit {
  isLoadingResults = true;
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'phoneNumber'];
  dataSource: MatTableDataSource<Student>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort = new MatSort();
  @ViewChild(MatTable) table: MatTable<any>;

  constructor(private studentService: StudentService, private router: Router) {
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource<Student>();
  }

  applyFilter(filterValue: any) {
    let value = filterValue.target.value;
    this.dataSource.filter = value.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngAfterViewInit(): void {
    this.studentService.getAllStudents().subscribe((data: Student[]) => {
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
