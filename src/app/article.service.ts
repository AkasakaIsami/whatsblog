import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article } from './model/article';
import { Response } from './model/response';
import { Comment } from './model/comment';
import { config } from './config';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private base_url = config.host + 'api/article/';

  constructor(private http: HttpClient) { }

  getAllArticles(classname: string=null): Observable<Response<Article[]>> {
    const reqUrl = classname ? this.base_url +'?classname=' + classname : this.base_url;
    return this.http.get<Response<Article[]>>(reqUrl);
  }

  getArticleById(article_id: string): Observable<Response<Article>> {
    return this.http.get<Response<Article>>(this.base_url + article_id);
  }

  postArticle(article: Article): Observable<Response<Object>> {
    return this.http.post<Response<Object>>(this.base_url, article);
  }

  likeArticle(article_id: string): Observable<Response<any>> {
    return this.http.post<Response<Article>>(this.base_url + article_id + '/like', {});
  }

  viewArticle(article_id: string): Observable<Response<any>> {
    return this.http.post<Response<Article>>(this.base_url + article_id + '/view', {});
  }

  getCommentsByArticleId(article_id: string): Observable<Response<Comment[]>> {
    return this.http.get<Response<Comment[]>>(this.base_url + article_id + '/comment');
  }

  postComment(article_id: string, text: string): Observable<Response<any>> {
    return this.http.post<Response<any>>(this.base_url + article_id + '/comment', { 'text': text });
  }
}
