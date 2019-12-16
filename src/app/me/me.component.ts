import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Location } from '@angular/common';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {AppComponent} from '../app.component';

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

  changePassErrMsg: string;
  changePassFormGroup: FormGroup;
  changingPassword = false;

  changeNameErrMsg: string;
  changeNameFormGroup: FormGroup;
  changingUsername = false;

  constructor(private authService: AuthService, private location: Location, private router: Router,
              private fb: FormBuilder) {
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

    this.changeNameFormGroup = this.fb.group({
      username: ['', [this.usernameValidator]]
    })
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

  submitChangeNameForm(): void {
    // tslint:disable-next-line:forin
    for (const i in this.changeNameFormGroup.controls) {
      this.changeNameFormGroup.controls[i].markAsDirty();
      this.changeNameFormGroup.controls[i].updateValueAndValidity();
    }

    this.changingUsername = true;

    const usename = this.changeNameFormGroup.controls.username.value;

    this.changingUsername = false;
    console.error('Unimplemented');
    // this.authService.changeUsername(username)
    //   .subscribe(
    //     (tokenRes) => {
    //       console.log('get normal response');
    //     },
    //     (errorMsg) => {
    //       this.errorMsg = errorMsg;
    //       this.changingUsername = false;
    //     }
    //   );
  }

  validateConfirmPassword(): void {
    setTimeout(() => this.changePassFormGroup.controls.confirm.updateValueAndValidity());
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

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('');
  }
}
