import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IStudent } from '../../model/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private readonly url = environment.studentsUrl;

  constructor(private http: HttpClient) {
  }

  createStudent(student: IStudent): Observable<IStudent> {
    return this.http.post(this.url, student);
  }
}
