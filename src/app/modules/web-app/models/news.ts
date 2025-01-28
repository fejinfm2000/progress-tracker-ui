export interface INews {
    pagination: IPagination;
    data: INewsData[];
}
export interface INewsData {
    author: string;
    title: string;
    description: string;
    source: string;
    url: string;
    image: string;
    category: string;
    language: string;
    country: string;
    published_at: string;

}
export interface IPagination {
    limit: number;
    offset: number;
    count: number;
    total: number;

}