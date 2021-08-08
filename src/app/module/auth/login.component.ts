import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SubSink } from 'subsink';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { User } from '../../model/user';
import { Constant } from '../../shared/constant';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private subscriptions = new SubSink();
  login: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    if (this.authService.isUserLoggedIn()) {
      this.router.navigateByUrl('/');
    }
    this.initLoginForm();
  }

  get username(): AbstractControl {
    return this.login.get('username') as AbstractControl;
  }

  private initLoginForm() {
    this.login = this.fb.group({
      username: ['', [Validators.required,
                      Validators.minLength(3),
                      Validators.pattern(Constant.USERNAME_REGEX)]],
      password: ['', Validators.required]
    });
  }

  get password(): AbstractControl {
    return this.login.get('password') as AbstractControl;
  }

  onSubmit(login: FormGroup) {
    this.subscriptions.add(
      this.authService.login(login.value).subscribe(response => {
          this.authService.addTokenToCache(response.headers.get('Jwt-Token') as string);
          this.authService.addUserToCache(response.body as User);
          this.router.navigateByUrl('');
        },
        // (error: HttpErrorResponse) => {
        // console.log(error);
        // if (error.status === 401) {
        // this.password.setErrors({badCredentials: error.error.message});
        // }
        // }
      ));
  }
}
