import { AfterViewInit, Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BehaviorService } from './behavior.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit, AfterViewInit {
  subject = new BehaviorSubject(0);
  user: string = '';
  edit: any;
  editUser: string = '';
  data = 'laszlo';
  username: string = '';

  constructor(private behaviorService: BehaviorService) {
  }

  ngOnInit(): void {
    this.behaviorService.user$.subscribe(user => {
      this.user = user;
    });
  }

  ngAfterViewInit(): void {
    // const behSubject = new BehaviorSubject(0);
    // const brhSeries$: Observable<number> = behSubject.asObservable();
    // brhSeries$.subscribe(value => console.log('early sub ' + value));
    // behSubject.next(1);
    // behSubject.next(2);
    // behSubject.next(3);
    // setTimeout(() => {
    //   brhSeries$.subscribe(value => console.log('late sub ' + value));
    //   behSubject.next(4);
    // }, 2000);
  }

  editTheUser() {
    this.behaviorService.editUser(this.editUser);
  }

  log() {
    console.log(this.username);
  }
}
