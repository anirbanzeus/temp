export class ProjectDetail{

    projectId: number;
    projectName: string;
    projectPriority: number;
    startDate:Date;
    endDate: Date;
    managerName: number
  
    constructor(id, taskName, parentTask,priority,  startDate, endDate, managerName) {
  
      this.projectId = id;
      this.projectName = taskName;
      this.startDate = startDate;
      this.endDate = endDate;
      this.projectPriority = priority;
      this.managerName = managerName;
     }
  
  }