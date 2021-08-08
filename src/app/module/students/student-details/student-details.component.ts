import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.scss']
})
export class StudentDetailsComponent implements OnInit {
  colsNo: Observable<number>;

  constructor(private breakpointObserver: BreakpointObserver) {
  }

  ngOnInit(): void {
    this.initColumns();
  }

  private initColumns() {
    this.colsNo = this.breakpointObserver.observe(Breakpoints.Large).pipe(
      map(({matches}) => {
        if (matches) {
          return 2;
        } else
          return 1;
      }));
  }
}
