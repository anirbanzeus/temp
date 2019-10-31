import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { ProjectDetail } from 'src/app/models/projectDetail';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/api.Service';

@Component({
  selector: 'view-project',
  templateUrl: './view-project.component.html',
  styleUrls: ['./view-project.component.css']
})
export class ViewProjectComponent implements OnInit, OnChanges {

  @Output() updateProject: EventEmitter<ProjectDetail> =   new EventEmitter();
  @Input() update: any;
  projects:ProjectDetail[] = [];
  project:ProjectDetail;
  tmp:ProjectDetail;
  isShow: boolean = false;
  isUpdate:boolean = false;
  constructor(private formBuilder: FormBuilder,private router: Router, private apiService: ApiService) { }

  ngOnInit() {
    this.isShow = true;    
    this.apiService.getProjects()
      .subscribe( data => {
        this.projects = data.result;
      });
  }
  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    for(let propName in changes){
      if (propName == 'update'){       
        for(let val in this.projects){
          if(this.projects[val].projectId === changes[propName].currentValue.projectId){
            this.projects[val] = changes[propName].currentValue;
            this.isUpdate = true;
          }
        }
        if(!this.isUpdate){
          this.tmp =  changes[propName].currentValue;
          this.projects.push(this.tmp);
        }
      }
    }
}


  editProject(project: ProjectDetail): void {
    window.localStorage.removeItem("editProjectId");
    window.localStorage.setItem("editProjectId", project.projectId.toString());
    let projectId = window.localStorage.getItem("editProjectId");
     if(!projectId) {
       alert("Invalid action.")
       this.router.navigate(['add-project']);
       return;
     }
     this.isShow = false;
     /*this.apiService.getProjectById(+projectId)
       .subscribe( data => {
         this.editForm.setValue(data.result);
       }); */
       this.updateProject.emit(project);   
   }; 

}
