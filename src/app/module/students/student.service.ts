import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IStudent } from '../../model/student';
import { shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private readonly url = environment.studentsUrl;

  constructor(private http: HttpClient) {
  }

  createStudent(student: IStudent): Observable<IStudent> {
    return this.http.post<IStudent>(this.url, student);
  }

  getStudent(id: number): Observable<IStudent> {
    return this.http.get<IStudent>(`${this.url}/${id}`)
      .pipe(shareReplay(1));
  }
}
