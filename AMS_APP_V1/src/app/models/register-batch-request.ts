import { CourseResponse } from "./course-response";
import { DepartmentResponse } from "./department-response";

export interface RegisterBatchRequest {

    batchName:string;
    batchType:string;
    semester:string;
    department:DepartmentResponse
    courses:CourseResponse[]

}
