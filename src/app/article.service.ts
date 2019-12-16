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
  private maxArticleToGet = 1000;
  private baseUrl = config.host + 'api/article/';

  constructor(private http: HttpClient, private authService: AuthService) { }

  private makeHeader(): any {
    const token = this.authService.getToken();
    return token ? {Authorization: token.token } : {};
  }

  getAllArticles(classname: string = null,
                 index: number = 0, size: number = this.maxArticleToGet): Observable<Response<Article[]>> {
    return this.http.get<Response<Article[]>>(this.baseUrl, {
      params: { classname, index: index.toString(), size: size.toString() }
    });
  }

  getArticleTotal(classname: string = null): Observable<Response<any>> {
    const reqUrl = this.baseUrl + 'total';
    return this.http.get<Response<any>>(reqUrl, {params: {classname}});
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
