import { Component } from '@angular/core';

@Component({
  selector: 'app-web-team',
  standalone: false,

  templateUrl: './web-team.component.html',
  styleUrl: './web-team.component.scss'
})
export class WebTeamComponent {
  members: any[] = [
    { name: 'Fejin FM', role: 'Developer', tasksAssigned: 5, tasksCompleted: 3, lastActive: '2 hours ago' },
    { name: 'Fevin FM', role: 'Developer', tasksAssigned: 5, tasksCompleted: 3, lastActive: '2 hours ago' },
    { name: 'Fylin', role: 'Designer', tasksAssigned: 3, tasksCompleted: 2, lastActive: '1 day ago' },
    { name: 'Francis', role: 'Project Manager', tasksAssigned: 2, tasksCompleted: 2, lastActive: '4 hours ago' }
  ];

  getTaskCompletionPercentage(member: any): number {
    return (member.tasksCompleted / member.tasksAssigned) * 100;
  }
}
