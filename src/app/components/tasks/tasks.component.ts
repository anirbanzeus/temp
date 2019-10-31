import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { FormControl, ReactiveFormsModule, FormGroup, FormBuilder, FormsModule } from '@angular/forms';
import {ApiService} from "../../core/api.Service";
import { MatSnackBar } from '@angular/material/snack-bar';
import { TaskDetail } from 'src/app/models/taskdetail';
import { ProjectDetail } from 'src/app/models/projectDetail';
import { UserDetail } from 'src/app/models/userDetail';

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
  max = 70;
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
  userName = new FormControl('');
  projectName = new FormControl('');
  setAsParent = new FormControl('');
  updatedTask: TaskDetail;
  invalidLogin: boolean;
  showMsg: boolean = false;
  message:string;
  checked: boolean = false;
  isCreate:boolean = true;
  isEdit:boolean = false;
  isValidDate:boolean;
  error:any={isError:false,errorMessage:''};
  
  constructor(private fb: FormBuilder, private apiService: ApiService, private router: Router, private _snackBar: MatSnackBar) {
    this.taskForm = this.fb.group({
      projectId:[''],
      taskId:[''],
      taskName:[''],
      parentTask:[''],
      startDate:[''],
      endDate:[''],
      taskPriority:[''],
      projectName:[''],
      userName:[''],
      setAsParent:['']
    });
   }

  ngOnInit() {
  }

  onClickMe() {    
    console.log(this.taskForm.controls.taskPriority.value);
  }

  onSubmit() {
    this.isValidDate = this.validateDates(this.taskForm.controls.startDate.value, this.taskForm.controls.endDate.value);
    if (this.taskForm.invalid) {
      return;
    }

    if (!this.isValidDate) {
      alert('End date greater than start date');
      return;
    }
    const loginPayload = {
      taskId: this.taskForm.controls.taskId.value,
      taskName: this.taskForm.controls.taskName.value,
      parentTask: this.taskForm.controls.parentTask.value,
      startDate: this.taskForm.controls.startDate.value,
      endDate: this.taskForm.controls.endDate.value,
      priority: this.taskForm.controls.taskPriority.value,
      userName: this.taskForm.controls.userName.value,
      projectName: this.taskForm.controls.projectName.value,
      parent: this.taskForm.controls.setAsParent.value,
      projectId: this.taskForm.controls.projectId.value
    }

    this.updatedTask = loginPayload;

    if(this.isEdit){
      this.apiService.updateTask(this.updatedTask).subscribe(data => {
        if(data.status === 200) {
          window.localStorage.setItem('token', data.result.token);
          alert('Task updated successfully.');
          this.taskForm.reset();
          this.showMsg= true;
          this.isEdit= false;
          this.isCreate= true;
        }else {
          this.invalidLogin = true;
          alert(data.message);
        }
      });
    }else{
      this.apiService.createTask(loginPayload).subscribe(data => {
        if(data.status === 200) {
          window.localStorage.setItem('token', data.result.token);
          alert('Task created successfully.');
          this.taskForm.reset();
          this.checked=false;
          this.showMsg= true;
        }else {
          this.invalidLogin = true;
          alert(data.message);
        }
      });

    }
    
  }

  openSnackBar() {
    this._snackBar.openFromComponent(TasksComponent, {
      duration: this.durationInSeconds * 1000,
    });
  }

  mapProjectHandler(projectEvent: ProjectDetail){
    this.taskForm.controls['projectName'].setValue(projectEvent.projectName);
    this.taskForm.controls['projectId'].setValue(projectEvent.projectId);
  }

  mapUserHandler(userEvent: UserDetail){
    this.taskForm.controls['userName'].setValue(userEvent.firstName);
  }

  mapParentTaskHandler(parentTaskEvent: TaskDetail){
    this.taskForm.controls['parentTask'].setValue(parentTaskEvent.taskName);
  }

  checkValue(eve: any){
    if (this.taskForm.get('setAsParent').value === true){
      this.taskForm.get('taskPriority').disable();
      this.checked = true;
      this.taskForm.get('startDate').disable();
      this.taskForm.get('endDate').disable();
      this.taskForm.controls.parentTask = this.taskForm.controls.taskName;
      this.taskForm.controls.taskName.reset; 

    }else{
      this.taskForm.get('taskPriority').enable();
      this.checked = false;
      this.taskForm.get('startDate').enable();
      this.taskForm.get('endDate').enable();
    }
}

validateDates(sDate: string, eDate: string){
  this.isValidDate = true;
      if((sDate != null && eDate !=null) && (eDate) < (sDate)){
    this.error={isError:true,errorMessage:'End date should be grater then start date.'};
    this.isValidDate = false;
  }
  return this.isValidDate;
}



}
