export class TaskDetail{

  taskId: number;
  taskName: string;
  parentTask: string;
  priority: number;
  startDate:Date;
  endDate: Date
  userName:string;
  projectName:string;
  parent:boolean

  constructor(id, taskName, parentTask,priority,  startDate, endDate, userName, projectName, parent) {

    this.taskId = id;
    this.taskName = taskName;
    this.parentTask = parentTask;
    this.startDate = startDate;
    this.endDate = endDate;
    this.priority = priority;
    this.projectName = projectName;
    this.userName = userName;
    this.parent = parent;
   }

}