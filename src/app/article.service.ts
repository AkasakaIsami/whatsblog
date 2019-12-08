import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article } from './model/article';
import { Response } from './model/response';
import { config } from './config'

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
}
