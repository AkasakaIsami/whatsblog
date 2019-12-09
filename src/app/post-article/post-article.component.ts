import { Component, OnInit } from '@angular/core';
import { Article } from '../model/article';
import { Location } from '@angular/common';
import { ArticleService } from '../article.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-post-article',
  templateUrl: './post-article.component.html',
  styleUrls: ['./post-article.component.css']
})
export class PostArticleComponent implements OnInit {
  article = new Article();
  constructor(private router: Router, private articleService: ArticleService, private location: Location) {
  }

  ngOnInit() {
  }

  post(): void {
    this.articleService.postArticle(this.article).subscribe(
      res => {
        this.router.navigateByUrl('/article/' + res.data.id);
      }
    )
  }
}
