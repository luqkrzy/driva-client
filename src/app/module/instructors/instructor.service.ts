import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { iInstructor } from '../../model/instructor';

@Injectable({
  providedIn: 'root'
})
export class InstructorService {
  private readonly url = environment.instructorUrl;

  constructor(private http: HttpClient) {
  }

  createInstructor(instructor: iInstructor): Observable<iInstructor> {
    return this.http.post<iInstructor>(this.url, instructor)
      .pipe(shareReplay(1));
  }

  getInstructor(id: number): Observable<iInstructor> {
    return this.http.get<iInstructor>(`${this.url}/${id}`)
      .pipe(shareReplay(1));
  }

  updateInstructor(id: number, instructor: iInstructor): Observable<iInstructor> {
    return this.http.patch<iInstructor>(`${this.url}/${id}`, instructor)
      .pipe(shareReplay(1));
  }

  getAllInstructors(): Observable<iInstructor[]> {
    return this.http.get<iInstructor[]>(this.url).pipe(
      shareReplay(),
    );
  }

  doesEmailExist(email: string): Observable<Boolean> {
    return this.http.get<Boolean>(`${this.url}/exist/${email}`);
  }

  deleteInstructor(id: number): Observable<HttpResponse<any>> {
    return this.http.delete(`${this.url}/${id}`, {observe: 'response'})
      .pipe(shareReplay(1));
  }
}
