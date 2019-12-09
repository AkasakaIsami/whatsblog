export class Article {
    id: string;
    title: string = '';
    text: string = '';
    view_number: number = 0;
    like_number: number = 0;
    comment_number: number = 0;
    classname: string;
    labels: string[] = [];
}
