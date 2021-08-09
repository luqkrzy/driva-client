import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { StudentService } from '../student.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IStudent, Student } from '../../../model/student';
import { IProduct } from '../../../model/product';
import { MatTabGroup } from '@angular/material/tabs';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.scss'],
})
export class StudentDetailsComponent implements OnInit, AfterViewInit {
  isLoading: boolean = true;
  student: IStudent = new Student();
  products: IProduct[] = [];
  @ViewChild('tabGroup') tabGroup: MatTabGroup;
  // displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  displayedColumns: string[] = ['id', 'data', 'start', 'koniec', 'instruktor'];
  dataSource = ELEMENT_DATA;

  constructor(private breakpointObserver: BreakpointObserver,
    private studentService: StudentService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
  }

  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
    const id = +this.activatedRoute.snapshot.paramMap.get('id')!;
    this.studentService.getStudent(id).subscribe((result: IStudent) => {
      this.student = result;
      this.products = result.products!;
      console.log(this.products);
      console.log(result);
    });
    this.initColumns();
  }

  private initColumns() {
  }
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];
