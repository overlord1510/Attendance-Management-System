import { BatchResponse } from "./batch-response";
import { DepartmentResponse } from "./department-response";
import { UserAuthResponse } from "./user-auth-response";

export interface RegisterStudentRequest {
    name:string;
    email:string;
    password:string;
    dob:string;
    gender:string;
    semester:string;
    department:DepartmentResponse;
    universityRoll:string;
    registrationNumber:string;
    batches:BatchResponse[];
}
