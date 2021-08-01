import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from '../../module/auth/auth.service';
import { lvl1, lvl2, lvl3 } from '../../module/auth/roles';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  lvl3: string[] = lvl3;
  lvl2: string[] = lvl2;
  lvl1: string[] = lvl1;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(map(result => result.matches),
      shareReplay());

  constructor(private breakpointObserver: BreakpointObserver, public authService: AuthService) {
  }

  logout() {
    this.authService.logOut();
  }

  hasAuthority(roles: string[]): boolean {
    const role = this.authService.getRole();
    return roles.some(r => role.indexOf(r) >= 0);
  }

  ngOnInit(): void {
  }
}
