export class ProjectDetail{

    projectId: number;
    projectName: string;
    projectPriority: number;
    startDate:Date;
    endDate: Date;
    managerName: number;
    taskCount: number;
    completedTaskCount: number;
    projectStatus: string
  
    constructor(id, taskName, parentTask,priority,  startDate, endDate, managerName, taskCount, completedTaskCount, projectStatus) {
  
      this.projectId = id;
      this.projectName = taskName;
      this.startDate = startDate;
      this.endDate = endDate;
      this.projectPriority = priority;
      this.managerName = managerName;
      this.taskCount = taskCount;
      this.completedTaskCount = completedTaskCount;
      this.projectStatus = projectStatus;
     }
  
  }