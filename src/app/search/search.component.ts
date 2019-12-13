import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from '../article.service';
import { Article } from '../model/article';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  keywords: string;
  result: Article[];

  constructor(private route: ActivatedRoute,
    private articleService: ArticleService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.keywords = params.get('keywords');
      this.articleService.searchArticle(this.keywords).subscribe(
        res => this.result = res.data
      )
    })
  }

}
