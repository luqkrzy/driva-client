import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { ILesson } from '../../model/lesson';

@Injectable({
  providedIn: 'root'
})
export class LessonsService {
  private readonly url = environment.lessonsUrl;

  constructor(private http: HttpClient) {
  }

  createLesson(lesson: ILesson): Observable<ILesson> {
    return this.http.post(this.url, lesson);
  }

  getLesson(id: number): Observable<ILesson> {
    return this.http.get<ILesson>(`${this.url}/${id}`)
      .pipe(shareReplay(1));
  }
}
