import { Component } from '@angular/core';

@Component({
  selector: 'app-web-features',
  standalone: false,

  templateUrl: './web-features.component.html',
  styleUrl: './web-features.component.scss'
})
export class WebFeaturesComponent {
  features = [
    {
      title: 'Progress Tracking',
      description: 'Track your goals and milestones with real-time updates.',
      icon: 'trending_up'
    },
    {
      title: 'Visual Reports',
      description: 'Generate pie charts, flowcharts, and more to visualize your progress.',
      icon: 'pie_chart'
    },
    {
      title: 'Task Management',
      description: 'Organize tasks, set priorities, and manage deadlines.',
      icon: 'check_circle'
    },
    {
      title: 'Mobile Friendly',
      description: 'Access your tracker on the go with a mobile-optimized design.',
      icon: 'phone_android'
    },
    {
      title: 'Analytics & Insights',
      description: 'Dive deeper into your data with advanced analytics and reports.',
      icon: 'show_chart'
    }
  ];
}
