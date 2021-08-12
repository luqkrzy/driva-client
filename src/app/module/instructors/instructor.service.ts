import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
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
    return this.http.post<iInstructor>(this.url, instructor);
  }

  getInstructor(id: number): Observable<iInstructor> {
    return this.http.get<iInstructor>(`${this.url}/${id}`)
      .pipe(shareReplay(1));
  }

  getAllInstructors(): Observable<iInstructor[]> {
    return this.http.get<iInstructor[]>(this.url).pipe(
      shareReplay(),
    );
  }
}
