import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { shareReplay } from 'rxjs/operators';
import { IStudent } from '../../model/student';

@Injectable({
  providedIn: 'root'
})
export class StudentListService implements OnInit {
  private readonly url = environment.studentsUrl;
  private studentsBs = new BehaviorSubject<IStudent[]>([]);
  students$ = this.studentsBs.asObservable();

  constructor(private http: HttpClient) {
  }

  getAllStudents(): Observable<IStudent[]> {
    return this.http.get<IStudent[]>(this.url).pipe(
      shareReplay(),
    );
  }

  ngOnInit(): void {
    this.students$ = this.getAllStudents();
  }
}
