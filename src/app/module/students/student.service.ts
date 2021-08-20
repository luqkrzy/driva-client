import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpResponse } from '@angular/common/http';
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

  updateStudent(id: number, student: IStudent): Observable<IStudent> {
    return this.http.patch<IStudent>(`${this.url}/${id}`, student)
      .pipe(shareReplay(1));
  }

  doesEmailExist(email: string): Observable<Boolean> {
    return this.http.get<Boolean>(`${this.url}/exist/${email}`);
  }

  deleteStudent(id: number): Observable<HttpResponse<any>> {
    return this.http.delete(`${this.url}/${id}`, {observe: 'response'})
      .pipe(shareReplay(1));
  }
}
