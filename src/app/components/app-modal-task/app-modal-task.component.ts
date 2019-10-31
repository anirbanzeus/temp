import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TaskDetail } from 'src/app/models/taskdetail';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/api.Service';

@Component({
  selector: 'app-modal-task',
  templateUrl: './app-modal-task.component.html',
  styleUrls: ['./app-modal-task.component.css']
})
export class AppModalTaskComponent implements OnInit {

  @Output() selection: EventEmitter<TaskDetail> =   new EventEmitter();
  task: TaskDetail;
  tasks:TaskDetail[] = [];
  isShow: boolean = false;
  scope:string = 'scope'
  private _prevSelected: any;
  constructor(private formBuilder: FormBuilder,private router: Router, private apiService: ApiService) { }

  ngOnInit() {
    this.isShow = true;    
    this.apiService.getParentTasks(this.scope)
      .subscribe( data => {
        this.tasks = data.result;
      });
  }

  handleChange(evt){
        this.selection.emit(evt);
  }



}
