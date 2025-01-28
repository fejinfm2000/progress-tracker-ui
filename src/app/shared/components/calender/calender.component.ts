import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calender',
  standalone: false,

  templateUrl: './calender.component.html',
  styleUrl: './calender.component.scss'
})
export class CalenderComponent implements OnInit {
  currentMonth: number;
  currentYear: number;
  daysInMonth: (number | null)[] = [];  // <-- Allow both number and null
  monthNames: string[];
  weekDays: string[];

  constructor() {
    this.currentMonth = new Date().getMonth();
    this.currentYear = new Date().getFullYear();
    this.monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    this.weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    this.daysInMonth = [];
  }

  ngOnInit() {
    this.generateCalendar();
  }

  generateCalendar() {
    // Clear the array before generating a new month
    this.daysInMonth = [];

    // Get the first day of the month and the number of days in the month
    const firstDay = new Date(this.currentYear, this.currentMonth, 1).getDay();
    const daysInThisMonth = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();

    // Fill the days in the month
    for (let i = 0; i < firstDay; i++) {
      this.daysInMonth.push(null); // Empty days to match the first day of the month
    }

    for (let day = 1; day <= daysInThisMonth; day++) {
      this.daysInMonth.push(day);
    }
  }

  nextMonth() {
    if (this.currentMonth === 11) {
      this.currentMonth = 0;
      this.currentYear++;
    } else {
      this.currentMonth++;
    }
    this.generateCalendar();
  }

  previousMonth() {
    if (this.currentMonth === 0) {
      this.currentMonth = 11;
      this.currentYear--;
    } else {
      this.currentMonth--;
    }
    this.generateCalendar();
  }
}
