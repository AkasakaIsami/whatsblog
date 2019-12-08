import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../model/article';
import { EditorConfig } from '../editor/model/editor-config';

@Component({
  selector: 'app-article-editor',
  templateUrl: './article-editor.component.html',
  styleUrls: ['./article-editor.component.css']
})
export class ArticleEditorComponent implements OnInit {
  @Input() article: Article;
  
  conf = new EditorConfig();

  constructor() { }

  ngOnInit() {}

  syncModel(markdown): void {
    this.article.text = markdown;
  }
}
