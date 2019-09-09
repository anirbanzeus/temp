import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { FormControl, ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import {ApiService} from "../../core/api.Service";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  taskForm: FormGroup;

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
  taskName = new FormControl('');
  parentTask= new FormControl('');
  startDate= new FormControl('');
  endDate= new FormControl('');
  invalidLogin: boolean;
  //apiService: new ApiService('');

  constructor(private fb: FormBuilder, private apiService: ApiService, private router: Router) {
    this.taskForm = this.fb.group({
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
    if (this.taskForm.invalid) {
      return;
    }
    console.log('step 1');
    const loginPayload = {
      taskName: this.taskForm.controls.taskName.value,
      parentTask: this.taskForm.controls.parentTask.value,
      startDate: this.taskForm.controls.startDate.value,
      endDate: this.taskForm.controls.endDate.value,
      priority: this.taskForm.controls.taskPriority.value

    }
    console.log('step 2');
    this.apiService.createUser(loginPayload).subscribe(data => {
      if(data.status === 200) {
        window.localStorage.setItem('token', data.result.token);
        this.router.navigate(['list-user']);
      }else {
        this.invalidLogin = true;
        alert(data.message);
      }
    });
  }

}
