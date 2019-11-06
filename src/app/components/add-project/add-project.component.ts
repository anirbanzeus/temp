import { Component, OnInit, OnChanges, ViewChild, SimpleChange } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/core/api.Service';
import { Router } from '@angular/router';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ProjectDetail } from 'src/app/models/projectDetail';
import { ViewProjectComponent } from '../view-project/view-project.component';
import { UserDetail } from 'src/app/models/userDetail';

@Component({
  selector: 'add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit, OnChanges {
  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    throw new Error("Method not implemented.");
  }

  projectForm: FormGroup;
  id = new FormControl('');
  projectName = new FormControl('');
  startDate= new FormControl('');
  endDate= new FormControl('');
  managerName= new FormControl('');
  showMsg: boolean = false;
  invalidLogin: boolean;
  isDisabled: boolean=false;
  submitted = false;
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
  isCreate:boolean = true;
  isEdit:boolean = false; 
  count: Number; 
  updatedProject: ProjectDetail;
  selected: boolean;
  check:boolean = false;
  isValidDate:boolean;
  error:any={isError:false,errorMessage:''};

  constructor(private fb: FormBuilder, private apiService: ApiService, private router: Router, private abc:ViewProjectComponent) {
    
   } 

  ngOnInit() {
    this.projectForm = this.fb.group({
      projectId:[''],
      projectName:['', Validators.required],
      startDate:[''],
      endDate:[''],
      projectPriority:[''],
      managerName:[''],
      selectDates:['']
    });

    this.projectForm.get('startDate').disable();
    this.projectForm.get('endDate').disable();
  }
  get f() { return this.projectForm.controls; }

  onSubmit() {
    this.submitted = true;
    this.isValidDate = this.validateDates(this.projectForm.controls.startDate.value, this.projectForm.controls.endDate.value);
    if (this.projectForm.invalid) {
      console.log('Invalid');
      return;
  }
  if (!this.isValidDate) {
    alert('End date greater than start date');
    return;
}
    const loginPayload = {
      projectId: this.projectForm.controls.projectId.value,
      projectName: this.projectForm.controls.projectName.value,
      startDate: this.projectForm.controls.startDate.value,
      endDate: this.projectForm.controls.endDate.value,
      projectPriority: this.projectForm.controls.projectPriority.value,
      managerName: this.projectForm.controls.managerName.value,
      taskCount:0,
      completedTaskCount: 0,
      projectStatus: 'Running'
    }

    if(loginPayload.projectPriority == ''){
      loginPayload.projectPriority=1;
    }
    
    this.updatedProject = loginPayload;
    if(this.isEdit){
      this.apiService.updateProject(this.updatedProject).subscribe(data => {
        if(data.status === 200) {
          window.localStorage.setItem('token', data.result.token);
          alert('Project updated successfully.');
          this.projectForm.reset();
          this.isEdit= false;
          this.isCreate= true;
          //this.count = Math.random();
          //this.ngOnInit();
         // this.abc.ngOnInit();
        }else {
          this.invalidLogin = true;
          alert(data.message);
        }
      });
    }else{
      this.apiService.createProject(this.updatedProject).subscribe(data => {
        if(data.status === 200) {
          window.localStorage.setItem('token', data.result.token);
          alert('Project created successfully.');
          this.projectForm.reset();
          this.ngOnInit();
          this.showMsg= true;
        }else {
          this.invalidLogin = true;
          alert(data.message);
        }
      });
    }
    
  }

  checkValue(eve: any){
    if (this.projectForm.get('selectDates').value === true){
      this.projectForm.get('startDate').enable();
      this.projectForm.get('endDate').enable();
    }else{
      this.projectForm.get('startDate').disable();
          this.projectForm.get('endDate').disable();
    }
}

updateProjectHandler(projectEvent: ProjectDetail){
  this.projectForm.controls['projectId'].setValue(projectEvent.projectId);
  this.projectForm.controls['projectName'].setValue(projectEvent.projectName);
  this.projectForm.controls['projectPriority'].setValue(projectEvent.projectPriority);
  this.projectForm.controls['startDate'].setValue(projectEvent.startDate);
  this.projectForm.controls['endDate'].setValue(projectEvent.endDate);
  this.isCreate = false;
  this.isEdit = true;  
}

mapUserHandler(userEvent: UserDetail){
  this.projectForm.controls['managerName'].setValue(userEvent.firstName);
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
