import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private newsUrl1 = 'https://cors-anywhere.herokuapp.com/https://newsapi.org/v2/top-headlines?access_key=6f2984d27b6577e16fe4bbd5a2acc3c0';
  private newsUrl = `http://api.mediastack.com/v1/news?access_key=6f2984d27b6577e16fe4bbd5a2acc3c0`;
  private newsData = [
    {
      author: 'Newsbytes.PH',
      title: 'Senate tackles e-governance bill seeking interoperability, CIO in every agency',
      description:
        'The Senate tackled on Wednesday, Jan. 15, the proposed "E-Governance Act," which seeks to require all government agencies to digitalize through a single integrated network and legal framework.',
      url: 'https://newsbytes.ph/2025/01/17/senate-tackles-e-governance-bill-seeking-interoperability-cio-in-every-agency/?utm_source=rss&utm_medium=rss&utm_campaign=senate-tackles-e-governance-bill-seeking-interoperability-cio-in-every-agency',
      source: 'newsbytes',
      image: null,
      category: 'general',
      language: 'en',
      country: 'ph',
      published_at: '2025-01-17T04:43:56+00:00',
    },
  ];
  constructor(private http: HttpClient) { }

  getNews(): Observable<any> {
    // return this.http.get(this.newsUrl);
    return of(this.newsData);
  }
}
