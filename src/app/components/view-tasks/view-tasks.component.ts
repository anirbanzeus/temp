import { Component, OnInit, EventEmitter, Output, Input, SimpleChange } from '@angular/core';
import { TasksComponent } from '../tasks/tasks.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TaskDetail } from 'src/app/models/taskdetail';
import { Router } from '@angular/router';
import {ApiService} from "../../core/api.Service";

import {first} from "rxjs/operators";
import { Sort } from '@angular/material/sort';

@Component({
  selector: 'view-tasks',
  templateUrl: './view-tasks.component.html',
  styleUrls: ['./view-tasks.component.css']
})

export class ViewTasksComponent implements OnInit {

  @Output() updateTask: EventEmitter<TaskDetail> =   new EventEmitter();
  @Input() update: any;
  constructor(private formBuilder: FormBuilder,private router: Router, private apiService: ApiService) { }

  viewtaskForm : FormGroup;
  tasks: TaskDetail[];
  sortedData: TaskDetail[];
  isShow: boolean = false;
  editForm: FormGroup;
  task: TaskDetail
  isUpdate:boolean = false;
  tmp:TaskDetail;
  
  
  ngOnInit(): void {
   this.isShow = true;
    this.apiService.getTasks()
      .subscribe( data => {
        this.tasks = data.result;
        this.sortedData = this.tasks.slice();
      });
  }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    for(let propName in changes){
      if (propName == 'update'){       
        for(let val in this.tasks){
          if(this.tasks[val].taskId === changes[propName].currentValue.taskId){
            this.tasks[val] = changes[propName].currentValue;
            this.isUpdate = true;
            this.ngOnInit();
          }
        }
        if(!this.isUpdate){
          //this.tmp =  changes[propName].currentValue;
          //this.tasks.push(this.tmp);
          this.ngOnInit();
        }
      }
    }
}

  endTask(task: TaskDetail): void {
    this.apiService.updateTaskToComplete(task)
      .subscribe(data => {
        if(data.status === 200) {
          alert('Task completed successfully.');
          //this.isShow = true;
          //window.location.reload();
          this.ngOnInit();            
        }else {
          alert('No data to update');
        }
      },
      error => {
        alert(error);
      })
      
  };

  editTask(task: TaskDetail): void {
   window.localStorage.removeItem("editTaskId");
   window.localStorage.setItem("editTaskId", task.taskId.toString());
   let taskId = window.localStorage.getItem("editTaskId");
    /*if(!taskId) {
      alert("Invalid action.")
      this.router.navigate(['app-tasks']);
      return;
    }*/
    this.isShow = false;
    this.updateTask.emit(task);   
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

  sortData(sort: Sort) {
    const data = this.tasks.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'priority': return this.compare(a.priority, b.priority, isAsc);
        case 'startDate': return this.compare(new Date(a.startDate).getTime(), new Date(b.startDate).getTime(), isAsc);
        case 'endDate': return this.compare(new Date(a.endDate).getTime(), new Date(b.endDate).getTime(), isAsc);
        case 'status': return this.compare(a.status, b.status, isAsc);
        default: return 0;
      }
    });
  }
  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
}
