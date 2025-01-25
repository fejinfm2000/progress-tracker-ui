import { AfterViewInit, Component, ElementRef, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { IAvatharTask, IOverview, IProjectOverView } from '../../models/web-app';
import {
  MatDialog
} from '@angular/material/dialog';
import { LogInComponent } from '../../../auth/components/log-in/log-in.component';
import { AddTaskComponent } from '../../Dialog/add-task/add-task.component';
import { IUser } from '../../../auth/models/auth';
import { SessionStorageService } from '../../../../services/session-storage.service';
import { Chart, ChartConfiguration, ChartType, registerables } from 'chart.js';
import { isPlatformBrowser } from '@angular/common';
import { HomeService } from '../../services/home.service';
import { IUserActivities } from '../../models/home';

Chart.register(...registerables);

@Component({
  selector: 'app-home',
  standalone: false,

  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, AfterViewInit {
  name: string = 'Buddy';
  email!: string;
  newTask: string = '';
  tasks: string[] = [];
  radius = 16;
  strokeWidth = 2;
  circumference: number = 40;
  strokeDashoffset: number = 40;
  visibleItems: IProjectOverView[] = [];
  activeIndex = 0;
  progress = 50;
  randomNumber: number = 0;
  profileUrl!: string;
  isSidebarOpen = false;
  barChart: Chart | undefined;
  @ViewChild('barCanvas', { static: false }) barCanvas!: ElementRef<HTMLCanvasElement>;
  userActivities!: IUserActivities;
  chartHeaderData: { time: number, title: string }[] = [
    { time: 17, title: "Time Spent" },
    { time: 12, title: "Lesson Learn" },
    { time: 24, title: "Goal reached" },
  ];

  dailyTaskData: { time: number, startTime: number, endTime: number, title: string }[] = [
    { time: 9, title: "Optimize Server Response", startTime: 9, endTime: 10 },
    { time: 10, title: "Ensure a responsive Design", startTime: 10, endTime: 11 },
    { time: 11, title: "Optimize Server Response", startTime: 11, endTime: 12 }
  ];

  overview: IOverview[] = [
    { count: 64, title: 'Total Project' }, { count: 14, title: 'Ongoing Project' }, { count: 4, title: 'In Progress' },
    { count: 64, title: 'Completed Project' }, { count: 10, title: 'Upcomming Project' }, { count: 8, title: 'Demo Project' }
  ];

  items: IProjectOverView[] = [
    // { title: 'Task 1',description:'create your task', subTitle: 'Sub Task 1', circumference: 0, progress: 0, strokeDashoffset: 0, tasks: [{ taskName: 'Create Task 1' }] },
    // { title: 'Task 2',description:'create your task', subTitle: 'Sub Task 2', circumference: 0, progress: 0, strokeDashoffset: 0, tasks: [{  taskName: 'Create Task 1' }] },
  ];

  avatars: IAvatharTask[] = [
    // { name: 'Fejin', imageUrl: '', initials: 'JD' },
    // { name: 'Fevin', imageUrl: 'assets/images/tracker-logo.png', initials: '' },
    // { name: 'Other', imageUrl: '', initials: 'MB' },

  ];

  notifications = [
    'You have a new message from John.',
    'Reminder: Meeting at 3 PM today.',
    'Your package has been delivered.',
    'New comment on your post.',
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private matDialog: MatDialog, private sessionStorageService: SessionStorageService,
    private homeService: HomeService) { }

  ngOnInit(): void {
    let userData: IUser;
    let sessionData = this.sessionStorageService.getItem('user');
    if (sessionData) {
      userData = sessionData;
      this.name = userData.firstName;
      this.email = userData.email;
      this.getUserTaskDetails(userData.email);
    }
    this.generateRandomNumber();
  }

  getUserTaskDetails(email: string) {
    this.homeService.getAllUserTaskDetails(email).subscribe(data => {
      console.log(data);
      this.userActivities = data;
      this.items = this.userActivities.activity.map(activity => {
        return {
          title: activity.category.categoryName,
          subTitle: activity.activityName,
          description: activity.description,
          tasks: this.generateInitialsForAvatars(this.userActivities.subActivity.map(subActivity => {
            return { taskId: subActivity.subActivityId, taskName: subActivity.subActivityName, imageUrl: '' }
          })),
          circumference: parseFloat((2 * Math.PI * 16).toFixed(2)),
          progress: 60,
          strokeDashoffset: (1 - 60 / 100) * (2 * Math.PI * 16)
        }
      })
      this.setNewTask();
      this.updateVisibleItems();

    });

  }

  setNewTask() {
    if (this.items.length == 0) {
      this.items = [
        { title: 'Task 1', description: 'create your task', subTitle: 'Sub Task 1', circumference: parseFloat((2 * Math.PI * 16).toFixed(2)), progress: 0, strokeDashoffset: (1 - 0 / 100) * (2 * Math.PI * 16), tasks: [] },
        { title: 'Task 2', description: 'create your task', subTitle: 'Sub Task 2', circumference: parseFloat((2 * Math.PI * 16).toFixed(2)), progress: 0, strokeDashoffset: (1 - 0 / 100) * (2 * Math.PI * 16), tasks: [] },
      ];
    } else if (this.items.length == 1) {
      this.items.push(
        { title: 'Task 2', description: 'create your task', subTitle: 'Sub Task 2', circumference: parseFloat((2 * Math.PI * 16).toFixed(2)), progress: 0, strokeDashoffset: (1 - 0 / 100) * (2 * Math.PI * 16), tasks: [] }
      )
    }
  }


  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  generateInitialsForAvatars(avatharList: IAvatharTask[]) {
    console.log(avatharList);

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

  addTask(): void {
    this.openDialog();
  }

  openDialog(): void {
    const dialogRef = this.matDialog.open(AddTaskComponent, {
      disableClose: true,
      data: { email: this.email }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  prevSlide() {
    this.activeIndex = (this.activeIndex - 1 + this.items.length) % this.items.length;
    this.updateVisibleItems();
    this.circumference = 2 * Math.PI * this.radius;
  }

  nextSlide() {
    this.activeIndex = (this.activeIndex + 1) % this.items.length;
    this.updateVisibleItems();
  }

  updateVisibleItems() {
    const nextIndex = (this.activeIndex + 1) % this.items.length;
    if (this.items[this.activeIndex])
      this.visibleItems = [
        this.items[this.activeIndex],
        this.items[nextIndex],
      ];
    else {
      this.visibleItems = []
    }
  }

  generateRandomNumber(): void {
    this.randomNumber = Math.floor(Math.random() * 10) + 1;
    this.profileUrl = "assets/images/profile" + this.randomNumber + ".webp";
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      if (isPlatformBrowser(this.platformId)) {
        this.renderChart();
      }
    }, 1000);
  }

  public barChartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Sales',
        data: [6, 9, 8, 8, 6, 2, 3],
        backgroundColor: [
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 0,
        barThickness: 10,
        borderRadius: 10,
      },
    ],
  };

  // Chart options
  public barChartOptions = {
    responsive: true,
    scales: {
      x: {
        categoryPercentage: 0.6,  // Adjust the space for categories
        barPercentage: 0.4,       // Adjust the width of bars
        grid: {
          display: false,  // Hide the grid lines for the x-axis
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          display: true,  // Display the grid lines for the y-axis
          color: '#ddd',
        },
      },
    },
    plugins: {
      legend: {
        display: false,  // Hide the legend
      },
    },
  };

  renderChart(): void {
    const chartConfig: ChartConfiguration<ChartType> = {
      type: 'bar',
      data: this.barChartData,
      options: this.barChartOptions
    };
    const canvas = document.getElementById('myChart') as HTMLCanvasElement;
    if (!chartConfig) {
      console.error('Canvas element not found');
      return;
    }
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.error('Canvas context not found');
      return;
    }
    this.barChart = new Chart(ctx, chartConfig);

    // this.barChart = new Chart(this.barCanvas.nativeElement, chartConfig);
  }

}
