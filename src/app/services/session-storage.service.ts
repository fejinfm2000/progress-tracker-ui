import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {
  constructor(@Inject(PLATFORM_ID) private platformId: object) { }

  setItem(key: string, value: any): void {
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.setItem(key, JSON.stringify(value));
    }
  }

  getItem(key: string): any {
    if (isPlatformBrowser(this.platformId)) {
      const item = sessionStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    }
    return null;
  }

  removeItem(key: string): void {
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.removeItem(key);
    }
  }

  clear(): void {
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.clear();
    }
  }
}
