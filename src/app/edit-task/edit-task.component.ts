import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../core/api.Service';
import { TaskDetail } from '../models/taskdetail';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {

  editForm: FormGroup;
  task: TaskDetail
  constructor(private formBuilder: FormBuilder,private router: Router, private apiService: ApiService) { }

  ngOnInit() {
    let taskId = window.localStorage.getItem("editTaskId");
    if(!taskId) {
      alert("Invalid action.")
      this.router.navigate(['view-task']);
      return;
    }
    this.editForm = this.formBuilder.group({
      taskId: [''],
      taskName: ['', Validators.required],
      parentTask: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      priority: ['', Validators.required]
    });
    this.apiService.getTaskById(+taskId)
      .subscribe( data => {
        this.editForm.setValue(data.result);
      });
  }

}
