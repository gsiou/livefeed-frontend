import { Feed } from './feed';

export class Article {
    title: string;
    summary: string;
    author: string;
    url: string;
    pubdate: Date;
    feedName: String;

    constructor(object: any) {
        this.title = object.title;
        this.summary = object.summary;
        this.author = object.author;
        this.url = object.link;
        this.pubdate = new Date(object.pubdate);
    }

    public setFeedName(feedName: string) {
        this.feedName = feedName;
    }
}
