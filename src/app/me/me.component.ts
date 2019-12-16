import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Location } from '@angular/common';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.css']
})
export class MeComponent implements OnInit {
  username: string;
  user_id: string;
  token: string;
  group_id: string;
  tokenExpireDate: Date;

  errorMsg: string;
  changePassFormGroup: FormGroup;
  changingPassword = false;

  constructor(private authService: AuthService, private location: Location, private fb: FormBuilder) {
    const token = this.authService.getToken();
    const expireTime = parseInt(localStorage.getItem('token_expire_time'), 10);
    const expireDate = new Date();
    expireDate.setTime(expireTime);

    this.username = authService.getUsername();
    this.user_id = token.id;
    this.group_id = token.group_id;
    this.token = token.token;
    this.tokenExpireDate = expireDate;

    this.changePassFormGroup = this.fb.group({
      oldPassword: ['', [this.passwordValidator]],
      password: ['', [this.passwordValidator]],
      confirm: ['', [this.confirmValidator]]
    });
  }

  ngOnInit() {
  }

  submitChangePassForm(): void {
    // tslint:disable-next-line:forin
    for (const i in this.changePassFormGroup.controls) {
      this.changePassFormGroup.controls[i].markAsDirty();
      this.changePassFormGroup.controls[i].updateValueAndValidity();
    }

    this.changingPassword = true;

    const oldPassword = this.changePassFormGroup.controls.oldPassword.value;
    const newpassword = this.changePassFormGroup.controls.password.value;

    this.changingPassword = false;
    console.error('Unimplemented');
    // this.authService.changePassword(oldPassword, newpassword)
    //   .subscribe(
    //     (tokenRes) => {
    //       console.log('get normal response');
    //     },
    //     (errorMsg) => {
    //       this.errorMsg = errorMsg;
    //       this.changingPassword = false;
    //     }
    //   );
  }

  validateConfirmPassword(): void {
    setTimeout(() => this.changePassFormGroup.controls.confirm.updateValueAndValidity());
  }

  confirmValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return {required: true};
    } else if (control.value !== this.changePassFormGroup.controls.password.value) {
      return {confirm: true, error: true};
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
