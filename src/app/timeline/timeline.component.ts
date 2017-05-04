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

    constructor(private feedService: FeedService) {}

    ngOnInit() {
        this.fetchFeeds();
        setInterval(() => {
            console.log("Refreshing");
            this.fetchFeeds();
        }, 5 * 60 * 1000);
    }

    fetchFeeds() {
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
                        this.timeline = allArticles;
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
                this.fetchFeeds();
            },
            (error) => {
                this.error = error;
                this.message = "";
            }
        )
    }
}
