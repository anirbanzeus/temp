import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ApiService } from 'src/app/core/api.Service';
import { Router } from '@angular/router';
import { ViewProjectComponent } from '../view-project/view-project.component';
import { UserDetail } from 'src/app/models/userDetail';

@Component({
  selector: 'add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  userForm: FormGroup;
  id = new FormControl('');
  firstName = new FormControl('');
  lastName= new FormControl('');
  empId= new FormControl('');  
  newUserDetail: UserDetail;
  submitted = false;
  isCreate:boolean = true;
  isEdit:boolean = false; 
  invalidLogin: boolean;
  showMsg: boolean = false;
  updatedUser: UserDetail

  constructor(private fb: FormBuilder, private apiService: ApiService, private router: Router) {
    
  } 

  ngOnInit() {
    this.userForm = this.fb.group({
      userId:[''],
      firstName:['', Validators.required],
      lastName:['', Validators.required],
      empId:['', Validators.required]
    });
  }

  get f() { return this.userForm.controls; }

  onSubmit(){    
    this.submitted = true;
    if (this.userForm.invalid) {
      console.log('Invalid');
      return;
  }

  const payload = {
    userId: this.userForm.controls.userId.value,
    firstName: this.userForm.controls.firstName.value,
    lastName: this.userForm.controls.lastName.value,
    empId: this.userForm.controls.empId.value,    
  }
  this.updatedUser =  payload   
    if(this.isEdit){
      this.apiService.updateUser(this.updatedUser).subscribe(data => {
        if(data.status === 200) {
          window.localStorage.setItem('token', data.result.token);
          alert('User updated successfully.');
          this.userForm.reset();
          this.isEdit= false;
          this.isCreate= true;
        }else {
          this.invalidLogin = true;
          alert(data.message);
        }
      });
    }else{
      this.apiService.createUser(payload).subscribe(data => {
        if(data.status === 200) {
          window.localStorage.setItem('token', data.result.token);
          alert('User created successfully.');
          this.userForm.reset();
          this.showMsg= true;
        }else {
          this.invalidLogin = true;
          alert(data.message);
        }
      });
    }
  }

  updateUserHandler(userEvent: UserDetail){
    this.userForm.controls['userId'].setValue(userEvent.userId);
    this.userForm.controls['firstName'].setValue(userEvent.firstName);
    this.userForm.controls['lastName'].setValue(userEvent.lastName);
    this.userForm.controls['empId'].setValue(userEvent.empId);
    this.isCreate = false;
    this.isEdit = true;
    
  }

}
