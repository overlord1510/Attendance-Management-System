import { BatchResponse } from "./batch-response";
import { CourseResponse } from "./course-response";
import { DepartmentResponse } from "./department-response";
import { UserAuthResponse } from "./user-auth-response";

export interface InstructorResponse {
    id:number;
    name:string;
    department:DepartmentResponse;
    gender:string;
    dob:Date;
    userAuth:UserAuthResponse;
    courses?:CourseResponse[];
    batches?:BatchResponse[];
}
