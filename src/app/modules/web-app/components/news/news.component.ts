import { Component } from '@angular/core';
import { NewsService } from '../../services/news.service';
import { DatePipe } from '@angular/common';
import { INews, INewsData } from '../../models/news';

@Component({
  selector: 'app-news',
  standalone: false,

  templateUrl: './news.component.html',
  styleUrl: './news.component.scss'
})
export class NewsComponent {
  news: INewsData[] = [];

  constructor(private newsService: NewsService) { }

  ngOnInit(): void {
    this.newsService.getNews().subscribe(data => {
      this.news = data.data as INewsData[];
    })
  }
}
