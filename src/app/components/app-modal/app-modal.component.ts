import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserDetail } from 'src/app/models/userDetail';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/api.Service';

@Component({
  selector: 'app-modal',
  templateUrl: './app-modal.component.html',
  styleUrls: ['./app-modal.component.css']
})
export class AppModalComponent implements OnInit {
  @Output() selection: EventEmitter<UserDetail> =   new EventEmitter();
  user: UserDetail;
  users:UserDetail[] = [];
  isShow: boolean = false;
  private _prevSelected: any;

  constructor(private formBuilder: FormBuilder,private router: Router, private apiService: ApiService) { }

  ngOnInit() {
    this.isShow = true;    
    this.apiService.getUsers()
      .subscribe( data => {
        this.users = data.result;
      });
  }
  handleChange(evt){
    //var target = evt.target;
      //if (target.checked) {
        this.selection.emit(evt);
        //this._prevSelected = target;
      //} else {
        
     // }
  }

}
