import { CourseResponse } from "./course-response";
import { DepartmentResponse } from "./department-response";

export interface BatchResponse {
    id:number;
    batchName:string;
    department:DepartmentResponse;
    semester:string;
    batchType:string;
    courses:CourseResponse[];
}
