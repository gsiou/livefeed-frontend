import { Component, OnInit, Input } from '@angular/core';
import { Article }                     from '../models/article';
@Component({
    templateUrl: './article.component.html',
    selector: 'articleview',
})

export class ArticleComponent implements OnInit{
    @Input() article: Article;

    ngOnInit() {

    }


}
