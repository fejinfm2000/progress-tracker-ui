import { Component, OnDestroy, OnInit } from '@angular/core';
import { VisitorService } from '../../service/visitor.service';
import { IVisitor } from '../../models/visitor';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-web-about',
  standalone: false,

  templateUrl: './web-about.component.html',
  styleUrl: './web-about.component.scss'
})
export class WebAboutComponent implements OnInit, OnDestroy {
  allVisitors: IVisitor[] = [];
  filteredVisitors: IVisitor[] = [];
  unSubscribe$ = new Subject();
  isViewable: boolean = false;
  showAll: boolean = false;
  displayLimit: number = 3;
  constructor(private visitorService: VisitorService) { }

  ngOnInit(): void {
  }

  viewVisitors() {
    this.visitorService.getUsers().pipe(takeUntil(this.unSubscribe$)).subscribe(data => {
      this.allVisitors = data;
      this.isViewable = !this.isViewable;
      this.showAll = false
      this.updateVisibleCards();
    });
  }

  updateVisibleCards() {
    this.filteredVisitors = this.showAll ? this.allVisitors : this.allVisitors.slice(0, this.displayLimit); // 3 rows, 3 cards each

  }

  showFilteredCards() {
    this.showAll = !this.showAll;
    this.updateVisibleCards();
  }

  ngOnDestroy(): void {
    this.unSubscribe$.next(null);
    this.unSubscribe$.complete();
  }
}
