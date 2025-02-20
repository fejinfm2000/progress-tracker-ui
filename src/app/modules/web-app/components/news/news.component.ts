import { Component, OnDestroy } from '@angular/core';
import { NewsService } from '../../services/news.service';
import { DatePipe } from '@angular/common';
import { INews, INewsData } from '../../models/news';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-news',
  standalone: false,

  templateUrl: './news.component.html',
  styleUrl: './news.component.scss'
})
export class NewsComponent implements OnDestroy {
  news: INewsData[] = [];
  unSubscribe$ = new Subject();

  constructor(private newsService: NewsService) { }

  ngOnInit(): void {
    this.newsService.getNews().pipe(takeUntil(this.unSubscribe$)).subscribe(data => {
      this.news = data.data as INewsData[];
    })
  }

  ngOnDestroy(): void {
    this.unSubscribe$.next(null);
    this.unSubscribe$.complete();
  }
}
