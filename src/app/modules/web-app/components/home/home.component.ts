import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IOverview, IProjectOverView } from '../../models/web-app';
import {
  MatDialog
} from '@angular/material/dialog';
import { LogInComponent } from '../../../auth/components/log-in/log-in.component';
import { AddTaskComponent } from '../../Dialog/add-task/add-task.component';
import { IUser } from '../../../auth/models/auth';
import { SessionStorageService } from '../../../../services/session-storage.service';
import { Chart, ChartConfiguration, ChartType, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-home',
  standalone: false,

  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, AfterViewInit {
  name: string = 'Buddy';
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
    { title: 'Title1', subTitle: 'Sub Title1', circumference: 40, progress: 40, strokeDashoffset: 40, tasks: [{ taskId: 1, taskName: 'Task Name 1' }] },
    { title: 'Title2', subTitle: 'Sub Title2', circumference: 50, progress: 50, strokeDashoffset: 50, tasks: [{ taskId: 2, taskName: 'Task Name 2' }] },
    { title: 'Title3', subTitle: 'Sub Title3', circumference: 50, progress: 50, strokeDashoffset: 50, tasks: [{ taskId: 3, taskName: 'Task Name 3' }] },
    { title: 'Title4', subTitle: 'Sub Title4', circumference: 80, progress: 80, strokeDashoffset: 80, tasks: [{ taskId: 4, taskName: 'Task Name 4' }] },
    { title: 'Title5', subTitle: 'Sub Title5', circumference: 95, progress: 95, strokeDashoffset: 95, tasks: [{ taskId: 5, taskName: 'Task Name 5' }] },
  ];

  avatars = [
    { name: 'Fejin', imageUrl: '', initials: 'JD' },
    { name: 'Fevin', imageUrl: 'assets/images/tracker-logo.png', initials: '' },
    { name: 'Other', imageUrl: '', initials: 'MB' },

  ];

  @ViewChild('barCanvas', { static: false }) barCanvas!: ElementRef<HTMLCanvasElement>;
  barChart: Chart | undefined;

  constructor(private matDialog: MatDialog, private sessionStorageService: SessionStorageService) { }

  ngOnInit(): void {
    let userData: IUser;
    let sessionData = this.sessionStorageService.getItem('user');
    if (sessionData) {
      userData = sessionData
      this.name = userData.firstName
    }

    this.updateVisibleItems();
    this.generateInitialsForAvatars();
    this.generateRandomNumber();
  }

  isSidebarOpen = false;
  notifications = [
    'You have a new message from John.',
    'Reminder: Meeting at 3 PM today.',
    'Your package has been delivered.',
    'New comment on your post.',
  ];

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  generateInitialsForAvatars() {
    this.avatars = this.avatars.map((avatar) => ({
      ...avatar,
      initials: avatar.imageUrl
        ? ''
        : avatar.name
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
      data: {}
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
    this.visibleItems = [
      this.items[this.activeIndex],
      this.items[nextIndex],
    ];
  }

  generateRandomNumber(): void {
    this.randomNumber = Math.floor(Math.random() * 10) + 1;
    this.profileUrl = "assets/images/profile" + this.randomNumber + ".webp";
  }

  ngAfterViewInit(): void {
    this.renderChart();
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
    if (!chartConfig) {
      console.error('Canvas element not found');
      return;
    }

    this.barChart = new Chart(this.barCanvas.nativeElement, chartConfig);
  }

}
