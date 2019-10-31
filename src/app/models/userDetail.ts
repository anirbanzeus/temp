export class UserDetail{

    userId: number;
    firstName: string;
    lastName: string;
    empId: number;

  
    constructor(id, firstName, lastName, empId) {
  
      this.userId = id;
      this.firstName = firstName;
      this.lastName = lastName;
      this.empId = empId;
     }
  
  }