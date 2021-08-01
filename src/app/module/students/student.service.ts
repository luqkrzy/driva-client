import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Student } from './student';
import { environment } from '../../../environments/environment';
import { shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StudentService implements OnInit {
  private readonly url = environment.studentsUrl;
  private studentsBs = new BehaviorSubject<Student[]>([]);
  students$ = this.studentsBs.asObservable();

  constructor(private http: HttpClient) {
  }

  getAllStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.url).pipe(
      shareReplay()
    );
  }

  ngOnInit(): void {
    this.students$ = this.getAllStudents();
  }
}
