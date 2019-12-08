import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Article } from '../model/article';
import { ArticleService } from '../article.service';
import { Response } from '../model/response';
import { Location } from '@angular/common';
import { EditorConfig } from '../editor/model/editor-config';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  article: Article;
  editable = false;
  conf = new EditorConfig();
  textHtml = 'Loading...';

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private articleService: ArticleService
  ) {
    this.conf.saveHTMLToTextarea = false;
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.getArticle(id);
  }

  getArticle(id: string): void {
    this.articleService.getArticleById(id).subscribe(
      (res: Response<Article>) => {
        this.article = res.data;
        console.log(this.article);
      }
    )
  }

  loadHtml(markdown): void {
    // TODO: 这里有bug！刷新后异常。解决方式：指令手动添加textArea，确保里面有一个textArea！
    this.textHtml = document.getElementsByClassName('editormd-preview').item(0).innerHTML;
    console.log(this.textHtml);
  }

  goBack(): void {
    this.location.back();
  }

  makeEditable(): void {
    this.editable = true;
  }


  save(): void {
    this.articleService.postArticle(this.article).subscribe(
      res => this.editable = false
    )
  }
}
