import { Injectable, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { IGeneralLesson, ILesson } from '../../model/lesson';

@Injectable({
  providedIn: 'root'
})
export class LessonsService implements OnInit {
  private readonly url = environment.lessonsUrl;
  lessonsDataSource = new BehaviorSubject<IGeneralLesson[]>([]);
  lessons$ = this.lessonsDataSource.asObservable();

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.getAllGeneralLessons().subscribe(result => {
      this.lessonsDataSource.next(result);
    });
  }

  getAllLessons(): Observable<ILesson[]> {
    return this.http.get<ILesson[]>(this.url).pipe(
      shareReplay(),
    );
  }

  createLesson(lesson: ILesson): Observable<ILesson> {
    return this.http.post<ILesson>(this.url, lesson);
  }

  deleteLesson(id: number) {
    return this.http.delete(`${this.url}/${id}`, {observe: 'response'})
      .pipe(shareReplay(1));
  }

  updateLesson(lesson: ILesson): Observable<ILesson> {
    return this.http.patch<ILesson>(`${this.url}/${lesson.id}`, lesson);
  }

  createGeneralLesson(lesson: IGeneralLesson): Observable<IGeneralLesson> {
    return this.http.post<IGeneralLesson>(this.url, lesson);
  }

  addNewLesson(lesson: IGeneralLesson) {
    this.createGeneralLesson(lesson).subscribe(result => {
      this.lessonsDataSource.value.push(result);
      //  albo
      // const currentValue = this.lessonsDataSource.value;
      // const updatedValue = [...currentValue, lesson];
      // this.lessonsDataSource.next(updatedValue);
    });
  }

  getAllGeneralLessons(): Observable<IGeneralLesson[]> {
    return this.http.get<IGeneralLesson[]>(this.url).pipe(
      shareReplay(),
    );
  }

  getLesson(id: number): Observable<IGeneralLesson> {
    return this.http.get<IGeneralLesson>(`${this.url}/${id}`)
      .pipe(shareReplay(1));
  }

  getLessonsByProductId(productId: number): Observable<ILesson[]> {
    return this.http.get<ILesson[]>(`${this.url}/product/${productId}`).pipe(
      shareReplay(),
    );
  }
}
