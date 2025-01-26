import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { title } from 'process';
import { ActivatedRoute } from '@angular/router';
import { CurrentTaskService } from '../../services/current-task.service';

@Component({
  selector: 'app-current-task',
  standalone: false,

  templateUrl: './current-task.component.html',
  styleUrl: './current-task.component.scss'
})
export class CurrentTaskComponent implements OnInit {
  constructor(private location: Location, private route: ActivatedRoute, private service: CurrentTaskService) { }
  allTask: { title: string, desctiption: string }[] = [];
  activityId!: number;
  goBack(): void {
    this.location.back();
  }

  ngOnInit(): void {
    this.activityId = parseInt(this.route.snapshot.paramMap.get('id')!)
    this.service.getAllSubActivity(this.activityId).subscribe(data => {
      let activity = data.map(data => { return { title: data.subActivityName, desctiption: data.description } });
      this.allTask = activity as { title: string, desctiption: string }[];
    })
  }

}
