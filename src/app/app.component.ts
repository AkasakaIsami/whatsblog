import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'whatsblog';
  username: string;
  searchKeywords = ''

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.username = this.authService.getUsername();
  }

  gotoSearch(): void {
      console.log('Search Keywords: ' + this.searchKeywords);
      this.router.navigateByUrl('/search/' + encodeURIComponent(this.searchKeywords));
  }
  
}
