import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { StudentService } from '../module/students/student.service';
import { catchError } from 'rxjs/operators';
import { IStudent } from '../model/student';

@Injectable({
  providedIn: 'root'
})
export class StudentResolver implements Resolve<IStudent> {
  constructor(private studentService: StudentService,
    private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.studentService.getStudent(route.params['id'])
      .pipe(
        catchError(() => {
          this.router.navigate(['/nie-znaleziono']);
          return of(null);
        })
      );
  }
}
