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
