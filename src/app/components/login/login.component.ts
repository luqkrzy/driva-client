import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  login: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder) {
  }

  get username(): AbstractControl {
    return this.login.get('username') as AbstractControl;
  }

  get password(): AbstractControl {
    return this.login.get('password') as AbstractControl;
  }

  ngOnInit(): void {
    this.login = this.fb.group({
      username: ['', [Validators.required,
                      Validators.minLength(3),
                      Validators.pattern('^[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ]*')]],
      password: ['', Validators.required]

    });
  }

  onSubmit(login: FormGroup) {
    console.log(login.value);
  }

}
