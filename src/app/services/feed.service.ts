import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import { Injectable, Inject }      from '@angular/core';
import { Observable }              from 'rxjs/Rx';
import { APP_CONFIG, IAppConfig }  from '../app.config';
import { Feed }                    from '../models/feed';
import { Article }                 from '../models/article';
import 'rxjs/add/operator/map';

@Injectable()
export class FeedService {
    constructor(private http: Http, @Inject(APP_CONFIG) private config: IAppConfig) {

    }

    fetchArticles(url: string): Observable<Article[]> {
        let token = JSON.parse(localStorage.getItem('authUser')).token;
        let params: URLSearchParams = new URLSearchParams();
        params.set("token", token);
        params.set("url", url);
        return this.http.get(this.config.apiEndpoint + '/api/articles', { search: params })
        .map((response: Response) => {
            let res = response.json();
            let articles: Article[] = new Array();
            for(var i = 0; i < res.articles.length; i++) {
                let currArticle = new Article(res.articles[i]);
                articles.push(currArticle);
            }
            //return res.articles;
            return articles;
        });
    }

    fetchAll(feeds: Feed[]): Observable<Article[]> {
        let token = JSON.parse(localStorage.getItem('authUser')).token;
        let params: URLSearchParams = new URLSearchParams();
        params.set("token", token);
        let observs: Observable<any>[] = [];
        for(var i = 0; i < feeds.length; i++) {
            let feedIndex: number = i;
            params.set("url", feeds[i].url);
            observs.push(this.http.get(this.config.apiEndpoint + '/api/articles', { search: params }).map((response: Response) => {
                let res = response.json();
                let articles: Article[] = new Array();
                for(var i = 0; i < res.articles.length; i++) {
                    let currArticle = new Article(res.articles[i]);
                    currArticle.setFeedName(feeds[feedIndex].url);
                    articles.push(currArticle);
                }
                return articles;
            }));
        }
        return Observable.forkJoin(observs);
    }

    loadFeeds(): Observable<Feed[]> {
        let token = JSON.parse(localStorage.getItem('authUser')).token;
        let params: URLSearchParams = new URLSearchParams();
        params.set("token", token);
        return this.http.get(this.config.apiEndpoint + '/api/feeds', { search: params })
        .map((response: Response) => {
            let res = response.json();
            return res.feeds;
        });
    }

    addFeed(url: String): Observable<boolean> {
        let token = JSON.parse(localStorage.getItem('authUser')).token;
        return this.http.post(this.config.apiEndpoint + '/api/feed', { url: url, token: token})
        .map((response: Response) => {
            let res = response.json();
            if (res.success === true) {
                return true;
            }
            else {
                return false;
            }
        });
    }


}
