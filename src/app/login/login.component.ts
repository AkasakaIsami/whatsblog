import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errorMsg: string;
  validateForm: FormGroup;
  logging = false;


  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder, private location: Location) {
    this.validateForm = this.fb.group({
      username: ['', [this.usernameValidator]],
      password: ['', [this.passwordValidator]]
    });
  }

  ngOnInit(): void {

  }

  submitForm(): void {
    // tslint:disable-next-line:forin
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    this.logging = true;

    const username = this.validateForm.controls.username.value;
    const password = this.validateForm.controls.password.value;
    this.authService.login(username, password)
      .subscribe(
        (tokenRes) => {
          console.log(tokenRes);
          this.authService.saveUsername(username);
          this.authService.saveToken(tokenRes.data, 12);
          this.location.back();
        },
        (errorMsg) => {
          this.errorMsg = errorMsg;
          this.logging = false;
        }
      );
  }

  usernameValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return {required: true};
    } else if (control.value.toString().length < 4) {
      return {short: true};
    } else if (control.value.toString().length > 20) {
      return {long: true};
    } else if (!/^[a-zA-Z]+[0-9]*$/.test(control.value.toString())) {
      return {invalid: true};
    }
    return {};
  };

  passwordValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return {required: true};
    } else if (control.value.toString().length < 5) {
      return {short: true};
    } else if (control.value.toString().length > 20) {
      return {long: true};
    } else if (/^[0-9]+$/.test(control.value.toString())) {
      return {onlyNumber: true};
    }
    return {};
  };
}
