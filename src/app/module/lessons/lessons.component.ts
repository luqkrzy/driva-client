import { Component, OnInit } from '@angular/core';
import { ILesson } from '../../model/lesson';
import { Subscription } from 'rxjs';
import { LessonsService } from './lessons.service';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.scss']
})
export class LessonsComponent implements OnInit {
  lessons: ILesson[];
  subscription: Subscription;
  displayedColumns = ['lessonId',
                      'productId',
                      'date',
                      'timeStart',
                      'hoursCount',
                      'studentId',
                      'studentFistName',
                      'studentLastName',
                      'studentEmail',
                      'studentPhoneNumber',
                      'instructorId',
                      'instructorFistName',
                      'instructorLastName',
                      'instructorEmail',
                      'instructorPhoneNumber'];

  constructor(private lessonsService: LessonsService) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onRowClicked(row: HTMLElement) {
    console.log(row);
  }
}
