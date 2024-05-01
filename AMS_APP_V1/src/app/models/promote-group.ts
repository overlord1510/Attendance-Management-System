import { DepartmentResponse } from "./department-response";

export interface PromoteGroup {
    department:DepartmentResponse;
	semester:string;
	count:number;
}
