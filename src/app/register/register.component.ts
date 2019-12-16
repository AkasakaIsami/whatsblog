import {Component} from '@angular/core';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  errorMsg: string;
  validateForm: FormGroup;
  registering = false;


  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder, private location: Location) {
    this.validateForm = this.fb.group({
      username: ['', [this.usernameValidator]],
      password: ['', [this.passwordValidator]]
    });
  }

  submitForm(): void {
    this.registering = true;

    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    const username = this.validateForm.controls.username.value;
    const password = this.validateForm.controls.password.value;

    this.authService.register(username, password).subscribe(
      (regiserRes) => {
        this.registering = false;
        this.authService.saveUsername(username);
        this.authService.saveToken(regiserRes.data, 12);
        this.location.back();
      },
      (errorMsg) => {
        this.errorMsg = errorMsg;
        this.registering = false;
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
