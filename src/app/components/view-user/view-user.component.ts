import { Component, OnInit, Output, EventEmitter, Input, SimpleChange } from '@angular/core';
import { ProjectDetail } from 'src/app/models/projectDetail';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/api.Service';
import { UserDetail } from 'src/app/models/userDetail';

@Component({
  selector: 'view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit {

  users:UserDetail[] = [];
  user:UserDetail;
  tmp:UserDetail;
  isShow: boolean = false;
  isUpdate:boolean = false;

  @Output() updateUser: EventEmitter<UserDetail> =   new EventEmitter();
  @Input() update: any;
  
  constructor(private formBuilder: FormBuilder,private router: Router, private apiService: ApiService) { }

  ngOnInit() {
    this.isShow = true;    
    this.apiService.getUsers()
      .subscribe( data => {
        this.users = data.result;
      });
  }

  editUser(user: UserDetail): void {
    window.localStorage.removeItem("editUserId");
    window.localStorage.setItem("editUserId", user.userId.toString());
    let projectId = window.localStorage.getItem("editUserId");
     if(!projectId) {
       alert("Invalid action.")
       this.router.navigate(['add-user']);
       return;
     }
     this.isShow = false;
     this.updateUser.emit(user);   
   };

   ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    for(let propName in changes){
      if (propName == 'update'){       
        for(let val in this.users){
          if(this.users[val].userId === changes[propName].currentValue.userId){
            this.users[val] = changes[propName].currentValue;
            this.isUpdate = true;
          }
        }
        if(!this.isUpdate){
          this.tmp =  changes[propName].currentValue;
          this.users.push(this.tmp);
        }
      }
    }
}

}
