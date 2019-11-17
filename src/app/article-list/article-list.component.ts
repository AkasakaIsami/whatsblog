import { Component, OnInit } from '@angular/core';
import { Article } from '../model/article';
import { ArticleService } from '../article-service';
import { Response } from '../model/response'

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {

  articles: Article[] = [];
  pageSize = 5

  constructor(private articleService: ArticleService) { }

  ngOnInit() {
    this.loadData(1);
  }

  loadData(page: number):void {
    console.log(`loadData(${page}) is invoked`);
    this.articleService.getAllArticles().subscribe(
      (res: Response<Article[]>) => {
        this.articles = res.data.slice(page * this.pageSize - this.pageSize, page * this.pageSize);
        console.log(this.articles);
      }
    );
  }

}
