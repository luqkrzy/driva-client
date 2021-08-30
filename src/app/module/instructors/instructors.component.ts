import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { InstructorService } from './instructor.service';
import { iInstructor } from '../../model/instructor';
import { AddInstructorComponent } from './add-instructor/add-instructor.component';
import { DeleteDialogComponent } from '../student-details/delete-dialog/delete-dialog.component';
import { UpdateInstructorComponent } from './update-instructor/update-instructor.component';

@Component({
  selector: 'app-instructors',
  templateUrl: './instructors.component.html',
  styleUrls: ['./instructors.component.scss']
})
export class InstructorsComponent implements OnInit, AfterViewInit {
  isLoadingResults = true;
  readonly columns: string[] = ['id', 'firstName', 'lastName', 'email', 'phoneNumber', 'edit'];
  readonly displayedColumns = ['id', 'Imię', 'Nazwisko', 'Email', 'Tel.', ''];
  dataSource = new MatTableDataSource<iInstructor>();
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<any>;
  private dialogConfig: MatDialogConfig = new MatDialogConfig();
  private matSnackBarConfig: MatSnackBarConfig = new MatSnackBarConfig();

  constructor(private instructorService: InstructorService,
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
    this.instructorService.getAllInstructors().subscribe((data: iInstructor[]) => {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.isLoadingResults = false;
      },
      () => {
        this.isLoadingResults = false;
      }
    );
  }

  onClick(row: iInstructor): void {
    this.router.navigateByUrl(`instructors/${row.id}/calendar`);
  }

  openAddInstructorDialog(): void {
    const dialogRef = this.dialog.open(AddInstructorComponent, this.dialogConfig);
    dialogRef.afterClosed().subscribe((instructor: iInstructor) => {
      if (instructor) {
        this.saveInstructor(instructor);
      }
    });
  }

  updateInstructor(instructor: iInstructor) {
    this.dialogConfig.data = instructor;
    const dialogRef = this.dialog.open(UpdateInstructorComponent, this.dialogConfig);
    dialogRef.afterClosed().subscribe((data: iInstructor) => {
      if (data) {
        this.instructorService.updateInstructor(data.id as number, data).subscribe((instructor: iInstructor) => {
          if (instructor.id) {
            this.dataSource.data.filter(i => i.id === data.id).map(i => {
              i.firstName = data.firstName;
              i.lastName = data.lastName;
              i.email = data.email;
              i.phoneNumber = data.phoneNumber;
            });
            this.snackBar.open("Zaktualizowano", 'OK', this.matSnackBarConfig);
          }
        });
      }
    });
  }

  deleteInstructor(id: number) {
    this.dialogConfig.data = id;
    const dialogRef = this.dialog.open(DeleteDialogComponent, this.dialogConfig);
    dialogRef.afterClosed().subscribe((id: number) => {
      if (id) {
        this.instructorService.deleteInstructor(id).subscribe(resp => {
          if (resp.status === 204) {
            this.dataSource.data = this.dataSource.data.filter(p => p.id !== id);
            this.snackBar.open('Usunięto', 'OK', this.matSnackBarConfig);
          }
        });
      }
    });
  }

  private saveInstructor(instructor: iInstructor): void {
    this.instructorService.createInstructor(instructor).subscribe((result: iInstructor) => {
        this.snackBar.open('Dodano do bazy', 'OK', this.matSnackBarConfig);
        this.dataSource.data.push(result);
        this.dataSource.data = this.dataSource.data;
      },
      () => {
        this.isLoadingResults = false;
      }
    );
  }
}
