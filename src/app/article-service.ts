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

  getAllArticles(): Observable<Response<Article[]>> {
    return this.http.get<Response<Article[]>>(this.base_url);
  }

  getArticleById(article_id: string): Observable<Response<Article>> {
    return this.http.get<Response<Article>>(this.base_url + article_id);
  }
}
