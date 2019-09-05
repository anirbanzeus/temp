export class TaskDetail{

  taskName: string;
  parentTask: string;
  startDate:Date;
  endDate: Date

  constructor(taskName, parentTask, startDate, endDate) {

    this.taskName = taskName;
    this.parentTask = parentTask;
    this.startDate = startDate;
    this.endDate = endDate;
   }

}