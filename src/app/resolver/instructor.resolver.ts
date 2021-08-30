import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { iInstructor } from '../model/instructor';
import { InstructorService } from '../module/instructors/instructor.service';

@Injectable({
  providedIn: 'root'
})
export class InstructorResolver implements Resolve<iInstructor> {
  constructor(private instructorService: InstructorService,
    private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.instructorService.getInstructor(route.params['id'])
      .pipe(
        catchError(() => {
          this.router.navigate(['/nie-znaleziono']);
          return of(null);
        })
      );
  }
}
