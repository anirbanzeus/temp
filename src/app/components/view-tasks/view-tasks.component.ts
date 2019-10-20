import { Component, OnInit } from '@angular/core';
import { TasksComponent } from '../tasks/tasks.component';
import { FormGroup } from '@angular/forms';
import { TaskDetail } from 'src/app/models/taskdetail';
import { Router } from '@angular/router';
import {ApiService} from "../../core/api.Service";

@Component({
  selector: 'app-view-tasks',
  templateUrl: './view-tasks.component.html',
  styleUrls: ['./view-tasks.component.css']
})
export class ViewTasksComponent implements OnInit {

  constructor(private router: Router, private apiService: ApiService) { }

  viewtaskForm : FormGroup;
  tasks: TaskDetail[];
  
  
  ngOnInit(): void {
    this.apiService.getTasks()
      .subscribe( data => {this.tasks = data.result;});
  }

  deleteTask(task: TaskDetail): void {
    this.apiService.deleteTask(task.taskId)
      .subscribe( data => {
        this.tasks = this.tasks.filter(u => u !== task);
      })
  };

  editTask(task: TaskDetail): void {
    //window.localStorage.removeItem("editTaskId");
   // window.localStorage.setItem("editTaskId", task.taskId.toString());
    this.router.navigate(['edit-task']);
  };

  addTask(): void {
    this.router.navigate(['add-task']);
  };  

}
