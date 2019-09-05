import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  taskForm: FormGroup;

  autoTicks = true;
  disabled = false;
  invert = false;
  max = 30;
  min = 0;
  showTicks = true;
  step = 1;
  thumbLabel = false;
  value = 0;
  vertical = false;
  taskName = new FormControl('');
  parentTask= new FormControl('');
  startDate= new FormControl('');
  endDate= new FormControl('');

  constructor(private fb: FormBuilder) {
    this.taskForm = this.fb.group({
      taskName:[''],
      parentTask:[''],
      startDate:[''],
      endDate:[''],
      taskPriority:['']
    });
   }

  ngOnInit() {
  }

  onClickMe(taskName) {
    console.log('11111');
    console.log(this.taskForm.controls.taskPriority.value);
  }

}
