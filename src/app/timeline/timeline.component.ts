import { Component, OnInit } from '@angular/core';

import { FeedService } from '../services/feed.service';

import { Feed } from '../models/feed';
import { Article } from '../models/article';

@Component({
    templateUrl: './timeline.component.html',
})

export class TimelineComponent implements OnInit {

    private showAddForm: boolean = false;
    private url: string = "";

    private message: string = "";
    private error: string = "";
    private feeds: Feed[] = [];
    private timeline: Article[] = [];
    private nextTimeline: Article[] = null;

    constructor(private feedService: FeedService) {}

    ngOnInit() {
        if(localStorage.getItem('storedTimeline')) {
            this.timeline = JSON.parse(localStorage.getItem('storedTimeline'));
            this.fetchFeeds((articles: Article[]) => { this.nextTimeline = articles });
        }
        else {
            this.fetchFeeds((articles: Article[]) => { this.timeline = articles });
        }
        setInterval(() => {
            console.log("Refreshing");
            this.fetchFeeds((articles: Article[]) => { this.nextTimeline = articles });
        }, 5 * 60 * 1000);
    }

    refreshTimeline() {
        this.timeline = this.nextTimeline;
        localStorage.setItem('storedTimeline', JSON.stringify(this.timeline));
        this.nextTimeline = null;
        console.log("REFRESHING TIMELINE");
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
}
