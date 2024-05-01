import { BatchResponse } from "./batch-response";
import { DepartmentResponse } from "./department-response";
import { UserAuthResponse } from "./user-auth-response";

export interface StudentResponse {

    id:number;
    name:string;
    gender:string;
    dob:Date;
    userAuth:UserAuthResponse;
    semester:string;
    registrationNumber:string;
    universityRoll:string;
    department:DepartmentResponse;
    batches:BatchResponse[];
}
