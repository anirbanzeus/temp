import { Component, OnInit } from '@angular/core';
import { TasksComponent } from '../tasks/tasks.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TaskDetail } from 'src/app/models/taskdetail';
import { Router } from '@angular/router';
import {ApiService} from "../../core/api.Service";

import {first} from "rxjs/operators";

@Component({
  selector: 'view-tasks',
  templateUrl: './view-tasks.component.html',
  styleUrls: ['./view-tasks.component.css']
})
export class ViewTasksComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,private router: Router, private apiService: ApiService) { }

  viewtaskForm : FormGroup;
  tasks: TaskDetail[];
  isShow: boolean = false;
  editForm: FormGroup;
  task: TaskDetail
  
  
  ngOnInit(): void {
   this.isShow = true;
    this.apiService.getTasks()
      .subscribe( data => {
        this.tasks = data.result;
      });
  }

  endTask(task: TaskDetail): void {
    this.apiService.updateTaskToComplete(task)
      .subscribe( data => {
        this.tasks = this.tasks.filter(u => u !== task);
      })
  };

  editTask(task: TaskDetail): void {
   window.localStorage.removeItem("editTaskId");
   window.localStorage.setItem("editTaskId", task.taskId.toString());
   let taskId = window.localStorage.getItem("editTaskId");
    if(!taskId) {
      alert("Invalid action.")
      this.router.navigate(['view-task']);
      return;
    }
    this.isShow = false;
    this.editForm = this.formBuilder.group({
      taskId: [''],
      taskName: ['', Validators.required],
      parentTask: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      priority: ['', Validators.required]
    });
    this.apiService.getTaskById(+taskId)
      .subscribe( data => {
        this.editForm.setValue(data.result);
      });   
  };

  onSubmit() {
    this.apiService.updateTask(this.editForm.value)
      .pipe(first())
      .subscribe(
        data => {
          if(data.status === 200) {
            alert('Task updated successfully.');
            this.isShow = true;
            //window.location.reload();
            this.ngOnInit();            
          }else {
            alert('No data to update');
          }
        },
        error => {
          alert(error);
        });
  }

  searchForProjects(name){
    console.log('Here');
    this.isShow = true;
    this.apiService.getTaskByProjectName(name)
      .subscribe( data => {
        this.tasks = data.result;
      });
  }
}
