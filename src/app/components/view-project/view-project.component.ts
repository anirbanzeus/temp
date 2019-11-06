import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { ProjectDetail } from 'src/app/models/projectDetail';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/api.Service';
import { Sort } from '@angular/material/sort';

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
  sortedData: ProjectDetail[];
  tmp:ProjectDetail;
  isShow: boolean = false;
  isUpdate:boolean = false;
  constructor(private formBuilder: FormBuilder,private router: Router, private apiService: ApiService) {


   }

  ngOnInit() {
    this.isShow = true;    
    this.apiService.getProjects()
      .subscribe( data => {
        this.projects = data.result;
        this.sortedData = this.projects.slice();
      });
  }
  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    for(let propName in changes){
      if (propName == 'update'){       
        for(let val in this.projects){
          if(this.projects[val].projectId === changes[propName].currentValue.projectId){
            this.projects[val] = changes[propName].currentValue;
            this.isUpdate = true;
            this.ngOnInit();
          }
        }
        if(!this.isUpdate){
          this.ngOnInit();
          //this.tmp =  changes[propName].currentValue;
          //this.projects.push(this.tmp);
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
   
   sortData(sort: Sort) {
    const data = this.projects.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'projectPriority': return this.compare(a.projectPriority, b.projectPriority, isAsc);
        case 'completedTaskCount': return this.compare(a.completedTaskCount, b.completedTaskCount, isAsc);
        case 'startDate': return this.compare(new Date(a.startDate).getTime(), new Date(b.startDate).getTime(), isAsc);
        case 'endDate': return this.compare(new Date(a.endDate).getMilliseconds(), new Date(b.endDate).getMilliseconds(), isAsc);
        /*case 'protein': return compare(a.protein, b.protein, isAsc);*/
        default: return 0;
      }
    });
  }
  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

}
