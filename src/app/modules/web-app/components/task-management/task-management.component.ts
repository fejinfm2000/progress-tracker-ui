import { Component, OnDestroy, OnInit } from '@angular/core';
import { HomeService } from '../../services/home.service';
import { SessionStorageService } from '../../../../services/session-storage.service';
import { Route, Router } from '@angular/router';
import { IUserActivities } from '../../models/home';
import { IAvatharTask, IProjectOverView } from '../../models/web-app';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-task-management',
  standalone: false,

  templateUrl: './task-management.component.html',
  styleUrl: './task-management.component.scss'
})
export class TaskManagementComponent implements OnInit, OnDestroy {
  userActivities!: IUserActivities;
  alltasks: IProjectOverView[] = []
  unSubscribe$ = new Subject();

  constructor(private homeService: HomeService, private sessionStorageService: SessionStorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    let sessionData = this.sessionStorageService.getItem('user');
    if (sessionData) {
      this.getUserTaskDetails(sessionData.email);
    }

  }

  getUserTaskDetails(email: string) {
    this.homeService.getAllUserTaskDetails(email).pipe(takeUntil(this.unSubscribe$)).subscribe(data => {
      this.userActivities = data;
      this.alltasks = [...this.transformTaskData(data)];
    });

  }

  transformTaskData(activiesData: IUserActivities) {
    return activiesData?.activity.map(activity => {
      let progressDate = this.userActivities?.subActivity.filter(data => (data.activity?.activityId == activity.activityId && data.status == "Completed"))?.map(data => data.progress) || [];
      let progress = progressDate.length > 0 ? progressDate.reduce((sum, currentValue) => (sum || 0) + (currentValue || 0)) || 0 : 0;

      return {
        title: activity.category.categoryName,
        activityId: activity.activityId,
        subTitle: activity.activityName,
        description: activity.description,
        repitation: this.userActivities?.subActivity?.length || 0,
        tasks: this.taskIteration(this.userActivities, activity.activityId).slice(0, 3),
        tasksCount: this.taskIteration(this.userActivities, activity.activityId)?.length || 0,
        circumference: parseFloat((2 * Math.PI * 16).toFixed(2)), // Approx. 100.48
        progress: this.userActivities?.subActivity.filter(data => data.activity?.activityId === activity.activityId).length
          ? (progress / this.userActivities.subActivity.filter(data => data.activity?.activityId === activity.activityId).length) * 100
          : 0,
        strokeDashoffset: (2 * Math.PI * 16) * (1 - ((progress / this.userActivities?.subActivity.filter(data => data.activity?.activityId === activity.activityId).length || 0) * 100) / 100),
      };
    })
  }

  taskIteration(userActivities: IUserActivities, activityId: number) {
    let subActivity = this.generateInitialsForAvatars(userActivities.subActivity?.filter(data => data.activity?.activityId === activityId)?.map(subActivity => {
      return { taskId: subActivity.subActivityId, taskName: subActivity.subActivityName, imageUrl: '' }
    }))
    return subActivity
  }

  generateInitialsForAvatars(avatharList: IAvatharTask[]) {
    return avatharList.map((avatar) => ({
      ...avatar,
      taskInitials: avatar.imageUrl
        ? ''
        : avatar.taskName
          .split(' ')
          .map((part) => part.charAt(0).toUpperCase())
          .join(''),
    }));
  }

  onSelectTask(item: IProjectOverView) {
    this.router.navigate([`/webApp/task/` + item.activityId])

  }
  
  ngOnDestroy(): void {
    this.unSubscribe$.next(null);
    this.unSubscribe$.complete();
  }
}
