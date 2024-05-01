import { DepartmentResponse } from "./department-response";

export interface RegisterInstructorRequest {
    name:string;
    email:string;
    password:string;
    dob:string;
    department:DepartmentResponse;
    gender:string;
}
