import { Component, OnInit, Input } from '@angular/core';
import { Article }                     from '../models/article';
@Component({
  templateUrl: './article.component.html',
  selector: 'articleview',
})

export class ArticleComponent implements OnInit{
  @Input() article: Article;
  smallSummary: String;
  showFull: boolean;

  ngOnInit() {
    this.showFull = false;
    this.smallSummary = this.article.summary.substring(0, 300);
  }

  toggleFull() {
    this.showFull = !this.showFull;
  }


}
