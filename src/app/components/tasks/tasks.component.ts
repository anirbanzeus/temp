import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { FormControl, ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import {ApiService} from "../../core/api.Service";
import { MatSnackBar } from '@angular/material/snack-bar';
import { TaskDetail } from 'src/app/models/taskdetail';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  taskDetail: TaskDetail;
  taskForm: FormGroup;
  durationInSeconds = 2;
  autoTicks = true;
  disabled = false;
  invert = false;
  max = 30;
  min = 0;
  showTicks = true;
  step = 1;
  thumbLabel = false;
  value = 0;
  vertical = false;
  id = new FormControl('');
  taskName = new FormControl('');
  parentTask= new FormControl('');
  startDate= new FormControl('');
  endDate= new FormControl('');
  invalidLogin: boolean;
  showMsg: boolean = false;
  message:string;
  
  //apiService: new ApiService('');

  constructor(private fb: FormBuilder, private apiService: ApiService, private router: Router, private _snackBar: MatSnackBar) {
    this.taskForm = this.fb.group({
      //id,
      taskName:[''],
      parentTask:[''],
      startDate:[''],
      endDate:[''],
      taskPriority:['']
    });
   }

  ngOnInit() {
  }

  onClickMe() {    
    console.log(this.taskForm.controls.taskPriority.value);
  }

  onSubmit() {
    console.log('step 0');
    if (this.taskForm.invalid) {
      return;
    }
    console.log('step 1');
    const loginPayload = {
      taskId: 0,
      taskName: this.taskForm.controls.taskName.value,
      parentTask: this.taskForm.controls.parentTask.value,
      startDate: this.taskForm.controls.startDate.value,
      endDate: this.taskForm.controls.endDate.value,
      priority: this.taskForm.controls.taskPriority.value

    }

    console.log('step 2');
    this.apiService.createTask(loginPayload).subscribe(data => {
      if(data.status === 200) {
        window.localStorage.setItem('token', data.result.token);
        alert('Task created successfully.');
        //this.router.navigate(['main-app']);
        this.taskForm.reset();
        this.showMsg= true;
      }else {
        this.invalidLogin = true;
        alert(data.message);
      }
    });
  }

  openSnackBar() {
    this._snackBar.openFromComponent(TasksComponent, {
      duration: this.durationInSeconds * 1000,
    });
  }

}
