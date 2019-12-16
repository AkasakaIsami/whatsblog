import { Component, OnInit } from '@angular/core';
import { Article } from '../model/article';
import { ArticleService } from '../article.service';
import { Response } from '../model/response';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {

  articles: Article[] = [];
  currentClassname = '';
  classnames: string[] = [];
  pageSize = 5;
  articleTotal = 5;

  constructor(private articleService: ArticleService, private route: ActivatedRoute) {
    this.currentClassname = this.route.snapshot.queryParamMap.get('classname');
  }

  ngOnInit() {
    this.articleService.getClassnames().subscribe(
      res => {
        this.classnames.push(...res.data);
        console.log(this.classnames);
        if (this.classnames.indexOf(this.currentClassname) < 0) {
          this.currentClassname = '';
        }
        this.loadData(1);
      }
    );
  }


  loadData(page: number): void {
    console.log(`loadData(${page}) is invoked`);
    this.articleService.getArticleTotal(this.currentClassname).subscribe(
      res => {
        this.articleTotal = res.data.total;
        this.articleService.getAllArticles(this.currentClassname).subscribe(
          (articleRes: Response<Article[]>) => {
            this.articles = articleRes.data.slice(page * this.pageSize - this.pageSize, page * this.pageSize);
            console.log(this.articles);
          }
        );
      }
    );
  }

}
