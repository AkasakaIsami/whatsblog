import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article } from './model/article';
import { Response } from './model/response';
import { Comment } from './model/comment';
import { config } from './config';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private baseUrl = config.host + 'api/article/';

  constructor(private http: HttpClient, private authService: AuthService) { }

  makeHeader(): any {
    const token = this.authService.getToken();
    return token ? {Authorization: token.token } : {};
  }

  getAllArticles(classname: string = null): Observable<Response<Article[]>> {
    const reqUrl = classname ? this.baseUrl + '?classname=' + classname : this.baseUrl;
    return this.http.get<Response<Article[]>>(reqUrl);
  }

  getArticleTotal(classname: string = null): Observable<Response<any>> {
    const reqUrl = classname ? this.baseUrl + 'total?classname=' + classname : this.baseUrl + 'total';
    return this.http.get<Response<any>>(reqUrl);
  }

  getArticleById(articleId: string): Observable<Response<Article>> {
    return this.http.get<Response<Article>>(this.baseUrl + articleId);
  }

  postArticle(article: Article): Observable<Response<any>> {
    return this.http.post<Response<any>>(this.baseUrl, article, { headers: this.makeHeader() });
  }

  deleteArticle(articleId: string): Observable<Response<any>> {
    return this.http.delete<Response<any>>(this.baseUrl + articleId);
  }

  likeArticle(articleId: string): Observable<Response<any>> {
    return this.http.post<Response<Article>>(this.baseUrl + articleId + '/like', {});
  }

  viewArticle(articleId: string): Observable<Response<any>> {
    return this.http.post<Response<Article>>(this.baseUrl + articleId + '/view', {});
  }

  searchArticle(keywords: string): Observable<Response<Article[]>> {
    return this.http.get<Response<Article[]>>(this.baseUrl + 'search', {
      params: {
        keyword: keywords
      }
    });
  }

  getCommentsByArticleId(articleId: string): Observable<Response<Comment[]>> {
    return this.http.get<Response<Comment[]>>(this.baseUrl + articleId + '/comment');
  }

  postComment(articleId: string, text: string): Observable<Response<any>> {
    return this.http.post<Response<any>>(this.baseUrl + articleId + '/comment', {
      text,
      user_id: this.authService.getToken().id
    }, { headers: this.makeHeader() });
  }

  getClassnames(): Observable<Response<string[]>> {
    return this.http.get<Response<string[]>>(this.baseUrl + 'classname');
  }
}
