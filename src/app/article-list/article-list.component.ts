import { Component, OnInit } from '@angular/core';
import { Article } from '../model/article';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {

  articles: Article[] = [];

  constructor() {

  }

  ngOnInit() {
    this.loadData(1);
  }

  loadData(page: number): void {
    console.log(`loadData${page} is invoked`);
    this.articles = new Array(5).fill({}).map((_, index) => {
      return {
        id: `id${page * 5 + index}`,
        title: `文章标题 ${page * 5 + index}`,
        text: '这里是文章内容的一个摘要'
      };
    });
    console.log(this.articles);
  }

}
