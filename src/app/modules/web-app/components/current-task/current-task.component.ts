import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { title } from 'process';
import { ActivatedRoute } from '@angular/router';
import { CurrentTaskService } from '../../services/current-task.service';
import { SessionStorageService } from '../../../../services/session-storage.service';
import { IUser } from '../../../auth/models/auth';
import { Subject, takeUntil } from 'rxjs';
import { IActivityDetails } from '../../models/home';

@Component({
  selector: 'app-current-task',
  standalone: false,

  templateUrl: './current-task.component.html',
  styleUrl: './current-task.component.scss'
})
export class CurrentTaskComponent implements OnInit, OnDestroy {
  constructor(private location: Location, private route: ActivatedRoute, private service: CurrentTaskService, private sessionStorageService: SessionStorageService) { }
  allTask: { status: string, subActivityId: number, title: string, desctiption: string }[] = [];
  activityId!: number;
  email!: string;
  unSubscribe$ = new Subject();
  statusList: string[] = ["Completed", "In-Progress", "Started"]
  goBack(): void {
    this.location.back();
  }

  ngOnInit(): void {

    let userData: IUser;
    let sessionData = this.sessionStorageService.getItem('user');
    if (sessionData) {
      userData = sessionData;
      this.email = userData.email;
    }
    this.activityId = parseInt(this.route.snapshot.paramMap.get('id')!)
    this.triggerGet();
  }
  triggerGet() {
    this.service.getAllSubActivity(this.activityId, this.email).pipe(takeUntil(this.unSubscribe$)).subscribe(data => {
      let activity = data.map(data => { return { status: data.status, subActivityId: data.subActivityId, title: data.subActivityName, desctiption: data.description } });
      this.allTask = activity as { status: string, subActivityId: number, title: string, desctiption: string }[];
    })
  }

  onUpdate(subActivityId: number, status: string) {
    let data = {
      subActivityId,
      email: this.email,
      status: status,
      progress: 1
    }
    this.service.onUpdateSubActivity(this.activityId, data).pipe(takeUntil(this.unSubscribe$)).subscribe(data => {
      this.triggerGet();
    });
  }

  ngOnDestroy(): void {
    this.unSubscribe$.next(null);
    this.unSubscribe$.complete();
  }
}
