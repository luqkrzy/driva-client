import { Component, OnInit } from '@angular/core';
import { IStudent, Student } from '../../../model/student';
import { StudentService } from '../../students/student.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-student-info',
  templateUrl: './student-info.component.html',
  styleUrls: ['./student-info.component.scss']
})
export class StudentInfoComponent implements OnInit {
  isLoading: boolean = true;
  student: IStudent = new Student();

  constructor(private studentService: StudentService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    const id = +this.activatedRoute.snapshot.paramMap.get('id')!;
    this.studentService.getStudent(id).subscribe((result: IStudent) => {
      this.student = result;
      this.isLoading = false;
      console.log(result.products);
    });
  }
}
