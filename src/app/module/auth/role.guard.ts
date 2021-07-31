import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const role: string[] = this.authService.getRole();
    const roles: string[] = route.data.role;
    const hasRole: boolean = roles.some(r => role.indexOf(r) >= 0);
    if (hasRole) {
      return true;
    }
    this.router.navigate(['/']);
    return false;
  }
}
