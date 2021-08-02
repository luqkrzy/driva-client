import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Student } from './student';
import { StudentListService } from './student-list.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-students',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.scss']
})
export class StudentsListComponent implements OnInit, AfterViewInit {
  isLoadingResults = true;
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'phoneNumber'];
  dataSource: MatTableDataSource<Student>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort = new MatSort();
  @ViewChild(MatTable) table: MatTable<any>;

  constructor(private studentService: StudentListService, private router: Router) {
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource<Student>();
    // this.studentService.students$.subscribe(
    //   (data: Student[]) => {
    //     this.dataSource.data = data;
    //     this.dataSource.paginator = this.paginator;
    //     this.dataSource.sort = this.sort;
    //     this.isLoadingResults = false;
    //   }, (error: HttpErrorResponse) => {
    //     console.log(error);
    //   });
  }

  applyFilter(filterValue: any) {
    let value = filterValue.target.value;
    this.dataSource.filter = value.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngAfterViewInit(): void {
    // this.studentService.students$.subscribe(
    //   (data: Student[]) => {
    //     this.dataSource.data = data;
    //     this.dataSource.paginator = this.paginator;
    //     this.dataSource.sort = this.sort;
    //     this.isLoadingResults = false;
    //   }, (error: HttpErrorResponse) => {
    //     console.log(error);
    //   });
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
