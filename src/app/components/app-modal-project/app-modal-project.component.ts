import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserDetail } from 'src/app/models/userDetail';
import { ProjectDetail } from 'src/app/models/projectDetail';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/api.Service';

@Component({
  selector: 'app-modal-project',
  templateUrl: './app-modal-project.component.html',
  styleUrls: ['./app-modal-project.component.css']
})
export class AppModalProjectComponent implements OnInit {
  @Output() selection: EventEmitter<ProjectDetail> =   new EventEmitter();
  project: ProjectDetail;
  projects:ProjectDetail[] = [];
  isShow: boolean = false;
  private _prevSelected: any;
  constructor(private formBuilder: FormBuilder,private router: Router, private apiService: ApiService) { }

  ngOnInit() {
    this.isShow = true;    
    this.apiService.getProjects()
      .subscribe( data => {
        this.projects = data.result;
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
