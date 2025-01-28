import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { INews } from '../models/news';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  url = 'https://progress-tracker-api-3ca5.onrender.com/api/tracker';
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

  getNews(): Observable<INews> {
    return this.http.get<INews>(`${this.url}/getTodayNews`);
  }
}
