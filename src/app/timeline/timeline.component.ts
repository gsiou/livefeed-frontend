import { Component, OnInit } from '@angular/core';

import { FeedService } from '../services/feed.service';
import { AlertService } from '../services/alert.service';

import { Feed } from '../models/feed';
import { Article } from '../models/article';
import { Alert } from '../models/alert';

import { ArticleComponent } from './article.component';
import { MenuComponent } from './../menu/menu.component';

@Component({
    templateUrl: './timeline.component.html',
})

export class TimelineComponent implements OnInit {

    private showAddFeedForm: boolean = false;
    private showAddAlertForm: boolean = false;
    private showManage: boolean = false;
    private url: string = "";
    private alert: string = "";
    private message: string = "";
    private error: string = "";
    private feeds: Feed[] = [];
    private timeline: Article[] = [];
    private nextTimeline: Article[] = null;
    private alerts: Alert[] = [];
    private loading: boolean = false;
    private filter: string = "";

    constructor(private feedService: FeedService, private alertService: AlertService) {}

    ngOnInit() {
        if(localStorage.getItem('storedTimeline')) {
            this.timeline = this.parseTimeline(localStorage.getItem('storedTimeline'));
            this.loading = true;
            this.fetchFeeds((articles: Article[]) => {
                this.nextTimeline = articles;
                this.loading = false;
            });
        }
        else {
            this.fetchFeeds((articles: Article[]) => {
                this.timeline = articles;
                localStorage.setItem('storedTimeline', JSON.stringify(articles));
            });
        }
        setInterval(() => {
            console.log("Refreshing");
            this.fetchFeeds((articles: Article[]) => { this.nextTimeline = articles });
        }, 5 * 60 * 1000);

        this.fetchAlerts();
    }

    parseTimeline(stringifiedTimeline: string): Article[] {
        // TODO: way too hacky
        let timeline: Article[] = JSON.parse(stringifiedTimeline);
        for(var i = 0; i < timeline.length; i++) {
            timeline[i].pubdate = new Date(timeline[i].pubdate);
        }
        return timeline;
    }

    refreshTimeline() {
        this.timeline = this.nextTimeline;
        localStorage.setItem('storedTimeline', JSON.stringify(this.timeline));
        this.nextTimeline = null;
        console.log("REFRESHING TIMELINE");
    }

    fetchAlerts() {
        this.alertService.fetchAlerts().subscribe(
            (alerts) => {
                console.log(alerts);
            },
            (error) => {
                console.log(error);
            }
        )
    }

    fetchFeeds(callback: any) {
        this.feedService.loadFeeds().subscribe(
            (feeds) => {
                console.log(feeds);
                this.feeds = feeds;
                this.feedService.fetchAll(this.feeds).subscribe(
                    (data) => {
                        let allArticles: Article[] = [];
                        for(var i = 0; i < data.length; i++) {
                            allArticles = allArticles.concat(data[i]);
                        }
                        allArticles.sort(function(a, b){
                            if(a.pubdate < b.pubdate) { return 1; }
                            else if(a.pubdate > b.pubdate) { return -1; }
                            else { return 0; }
                        });
                        callback(allArticles);
                        console.log(this.timeline);
                    },
                    (error) => {
                        console.log(error);
                    }
                );
            },
            (error) => {
                this.error = error;
                this.message = "";
            }
        );
    }

    addFeed() {
        this.feedService.addFeed(this.url).subscribe(
            (success) => {
                if (success === true) {
                    this.error = "";
                    this.message = "Feed added!";
                }
                else {
                    this.error = "Failed to add feed"
                    this.message = "";
                }
                this.fetchFeeds((articles: Article[]) => {this.nextTimeline = articles});
            },
            (error) => {
                this.error = error;
                this.message = "";
            }
        )
    }

    addAlert() {
        console.log(this.alert);
        this.alertService.addAlert(this.alert).subscribe(
            (success) => {
                if(success === true){
                    this.error = "";
                    this.message = "Alert added!";
                }
                else {
                    this.error = "Failed to add alert";
                    this.message = "";
                }
            },
            (error) => {
                this.error = error;
                this.message = "";
            }

        )
    }

    differentTimelines() {
        if(this.timeline.length != this.nextTimeline.length) {
            return true;
        }

        for(var i = 0; i < this.timeline.length; i++) {
            if(this.timeline[i].url != this.nextTimeline[i].url) {
                return true;
            }
        }
        return false;
    }

    onShowNewFeedForm(show: boolean) {
        this.showAddFeedForm = show;
    }

    hideNewFeedForm() {
        this.showAddFeedForm = false;
    }

    onSearch(terms: string) {
        this.filter = terms;
    }

    onToggleManage() {
        this.showManage = !this.showManage;
    }

    applyFilter(article: Article): boolean {
        // TODO: Should be replaced by serious search
        if(article.title.indexOf(this.filter) !== -1) {
            return true;
        }
        if(article.summary.indexOf(this.filter) !== -1) {
            return true;
        }
        return false;
    }

    clearSearch() {
        this.filter = "";
    }

    removeFeed(feed: Feed) {
        console.log(feed);
        this.feedService.removeFeed(feed.url).subscribe(
            (success) => {
                this.error = "";
                this.fetchFeeds((articles: Article[]) => {this.nextTimeline = articles});
            },
            (error) => {
                this.error = error;
                console.log(error); // todo: handle this
            }
        )
    }
}
