import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Article } from '../model/article';

@Component({
  selector: 'app-article-editor',
  templateUrl: './article-editor.component.html',
  styleUrls: ['./article-editor.component.css']
})
export class ArticleEditorComponent implements OnInit {
  @Input() article: Article;
  @ViewChild('inputElement', { static: false }) inputElement: ElementRef;
  inputVisible = false;
  inputValue = '';

  constructor() { }

  ngOnInit() {
  }

  handleLabelClose(removedTag: {}): void {
    this.article.labels = this.article.labels.filter(tag => tag !== removedTag);
  }

  showInput(): void {
    this.inputVisible = true;
    setTimeout(() => {
      this.inputElement.nativeElement.focus();
    }, 10);
  }

  handleInputConfirm(): void {
    if (this.article.labels == null) {
      this.article.labels = [];
    }
    if (this.inputValue && this.article.labels.indexOf(this.inputValue) === -1) {
      this.article.labels = [...this.article.labels, this.inputValue];
    }
    this.inputValue = '';
    this.inputVisible = false;
  }
}
