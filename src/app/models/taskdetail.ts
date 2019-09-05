export class TaskDetail{

  taskName: string;
  parentTask: string;
  priority: number;
  startDate:Date;
  endDate: Date

  constructor(taskName, parentTask,priority,  startDate, endDate) {

    this.taskName = taskName;
    this.parentTask = parentTask;
    this.startDate = startDate;
    this.endDate = endDate;
    this.priority = priority;
   }

}