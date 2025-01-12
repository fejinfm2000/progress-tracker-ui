import { Component, OnInit } from '@angular/core';
import { IOverview, IProjectOverView } from '../../models/web-app';

@Component({
  selector: 'app-home',
  standalone: false,

  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  name: string = 'Your Name';
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

  constructor() { }

  ngOnInit(): void {
    this.updateVisibleItems();
    this.generateInitialsForAvatars();
    this.generateRandomNumber();
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

  onAddAvatar() {
    console.log('Added..');
  }

  addTask(): void {
    if (this.newTask.trim()) {
      this.tasks.push(this.newTask.trim());
      this.newTask = '';
    }
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

}
