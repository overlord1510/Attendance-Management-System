import { DepartmentResponse } from "./department-response"

export interface BatchesOfInstructor {
     batchId:number;
	 batchName:string;
	 batchType:string;
	 department:DepartmentResponse;
	 semester:string;
	 courseId:number;
	 courseName:string;
}
