export class Article {
    title: string;
    summary: string;
    author: string;
    url: string;
    pubdate: Date;

    constructor(object: any) {
        this.title = object.title;
        this.summary = object.summary;
        this.author = object.author;
        this.url = object.link;
        this.pubdate = new Date(object.pubdate);
    }
}
