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
  status: string

  constructor(id, taskName, parentTask,priority,  startDate, endDate, userName, projectName, parent, status) {

    this.taskId = id;
    this.taskName = taskName;
    this.parentTask = parentTask;
    this.startDate = startDate;
    this.endDate = endDate;
    this.priority = priority;
    this.projectName = projectName;
    this.userName = userName;
    this.parent = parent;
    this.status = status;
   }

}