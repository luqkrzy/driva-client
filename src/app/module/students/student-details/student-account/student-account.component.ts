import { Component, Input, OnInit } from '@angular/core';
import { IStudent } from '../../../../model/student';

@Component({
  selector: 'app-student-account',
  templateUrl: './student-account.component.html',
  styleUrls: ['./student-account.component.scss']
})
export class StudentAccountComponent implements OnInit {
  @Input() student: IStudent;

  constructor() {
  }

  ngOnInit(): void {
  }
}
