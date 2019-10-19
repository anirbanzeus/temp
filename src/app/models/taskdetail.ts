export class TaskDetail{

  taskId: number;
  taskName: string;
  parentTask: string;
  priority: number;
  startDate:Date;
  endDate: Date

  constructor(id, taskName, parentTask,priority,  startDate, endDate) {

    this.taskId = id;
    this.taskName = taskName;
    this.parentTask = parentTask;
    this.startDate = startDate;
    this.endDate = endDate;
    this.priority = priority;
   }

}