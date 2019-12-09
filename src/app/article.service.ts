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
  private base_url = config.host + 'api/article/';

  constructor(private http: HttpClient, private authService: AuthService) { }

  makeHeader(): any {
    const token = this.authService.getToken();
    return token ? {'Authorization': token.token } : {} 
  }

  getAllArticles(classname: string=null): Observable<Response<Article[]>> {
    const reqUrl = classname ? this.base_url +'?classname=' + classname : this.base_url;
    return this.http.get<Response<Article[]>>(reqUrl);
  }

  getArticleTotal(classname: string=null): Observable<Response<any>> {
    const reqUrl = classname ? this.base_url +'total?classname=' + classname : this.base_url + 'total';
    return this.http.get<Response<any>>(reqUrl);
  }

  getArticleById(article_id: string): Observable<Response<Article>> {
    return this.http.get<Response<Article>>(this.base_url + article_id);
  }

  postArticle(article: Article): Observable<Response<any>> {
    return this.http.post<Response<any>>(this.base_url, article, { headers: this.makeHeader() });
  }

  deleteArticle(article_id: string): Observable<Response<any>> {
    return this.http.delete<Response<any>>(this.base_url + article_id);
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
    return this.http.post<Response<any>>(this.base_url + article_id + '/comment', { 
      'text': text,
      'user_id': this.authService.getToken().id
    }, { headers: this.makeHeader() });
  }

  getClassnames(): Observable<Response<string[]>> {
    return this.http.get<Response<string[]>>(this.base_url + 'classname');
  }
}
