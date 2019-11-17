import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Article } from '../model/article';
import { ArticleService } from '../article-service';
import { Response } from '../model/response';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  article: Article;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private articleService: ArticleService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.getArticle(id);
  }

  private getArticle(id: string): void {
    this.articleService.getArticleById(id).subscribe(
      (res: Response<Article>) => {
        this.article = res.data;
      }
    )
  }

  private getText(): string {
    let text = '正文 ';
    for (let i = 0; i < 10; i++) {
      text += text;
    }
    return text;
  }

}
