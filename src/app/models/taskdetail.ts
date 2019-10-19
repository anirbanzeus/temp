export class TaskDetail{

  taskId: number;
  taskName: string;
  parent: string;
  priority: number;
  startDate:Date;
  endDate: Date

  constructor(id, taskName, parentTask,priority,  startDate, endDate) {

    this.taskId = id;
    this.taskName = taskName;
    this.parent = parentTask;
    this.startDate = startDate;
    this.endDate = endDate;
    this.priority = priority;
   }

}