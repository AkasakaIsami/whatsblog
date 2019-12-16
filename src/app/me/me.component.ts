import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Location } from '@angular/common';

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

  constructor(private authService: AuthService, private location: Location) {
    const token = this.authService.getToken();
    const expireTime = parseInt(localStorage.getItem('token_expire_time'), 10);
    const expireDate = new Date();
    expireDate.setTime(expireTime);

    this.username = authService.getUsername();
    this.user_id = token.id;
    this.group_id = token.group_id;
    this.token = token.token;
    this.tokenExpireDate = expireDate;
  }

  ngOnInit() {
  }

}
