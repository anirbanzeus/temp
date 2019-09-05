import { Component, OnInit } from '@angular/core';
import { TasksComponent } from '../tasks/tasks.component';

@Component({
  selector: 'app-view-tasks',
  templateUrl: './view-tasks.component.html',
  styleUrls: ['./view-tasks.component.css']
})
export class ViewTasksComponent implements OnInit {
  taskLists: Array<TasksComponent>;

  constructor() { }

  ngOnInit() {
  }

}
