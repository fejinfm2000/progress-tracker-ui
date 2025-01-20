import { Component } from '@angular/core';
import { NewsService } from '../../services/news.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-news',
  standalone: false,

  templateUrl: './news.component.html',
  styleUrl: './news.component.scss'
})
export class NewsComponent {
  news: any[] = [];

  constructor(private newsService: NewsService) { }

  ngOnInit(): void {
    this.newsService.getNews().subscribe(data => {
      this.news = data;
    })
  }
}
