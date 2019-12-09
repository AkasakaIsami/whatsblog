import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Article } from '../model/article';
import { Comment } from '../model/comment';
import { ArticleService } from '../article.service';
import { Response } from '../model/response';
import { Location } from '@angular/common';
import * as marked from 'marked';
import * as hljs from 'highlight.js'

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  article: Article;
  comments: Comment[];
  myComment = ''
  editable = false;
  textHtml = 'Loading...';
  submitting = false;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private articleService: ArticleService
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    marked.setOptions({
      highlight: function (code) {
        return hljs.highlightAuto(code).value;
      },
      gfm: true,
      headerPrefix: 'marked-',
      headerIds: true,
    });

    this.getArticle(id);
    this.getComments(id);
    this.viewArticle(id);
  }

  getArticle(id: string): void {
    this.articleService.getArticleById(id).subscribe(
      (res: Response<Article>) => {
        this.article = res.data;
        this.textHtml = marked(this.article.text);
      }
    )
  }

  likeArticle(): void {
    if (this.article) {
      this.articleService.likeArticle(this.article.id).subscribe(
        res => console.log('success like, current: ' + res.data.like_number)
      )
    }
  }

  viewArticle(id: string): void {
    this.articleService.viewArticle(id).subscribe(
      res => console.log('success view, current: ' + res.data.view_number)
    )
  }

  getComments(id: string):void {
    this.articleService.getCommentsByArticleId(id).subscribe(
      res => this.comments = res.data
    )
  }

  goBack(): void {
    this.location.back();
  }

  makeEditable(): void {
    this.editable = true;
  }


  save(): void {
    this.articleService.postArticle(this.article).subscribe(
      res => {
        this.textHtml = marked(this.article.text);
        this.editable = false;
      }
    )
  }

  UTCSecond2Date(time: number): Date {
    const date = new Date();
    date.setTime(time * 1000);
    return date;
  }

  handleSubmitComment(): void {
    this.submitting = true;
    const content = this.myComment;
    this.myComment = '';
    this.articleService.postComment(this.article.id, content).subscribe(
      res => {
        this.articleService.getCommentsByArticleId(this.article.id).subscribe(
          res => {
            this.comments = res.data;
            this.submitting = false;
          }
        )
      } 
    )
  }
}
