import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BatchResponse } from '../models/batch-response';
import { StudentResponse } from '../models/student-response';
import { InstructorResponse } from '../models/instructor-response';
import { DepartmentResponse } from '../models/department-response';
import { CourseResponse } from '../models/course-response';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {
  private API_URL: string = 'http://localhost:8080/api/v1';
  
  constructor(private http:HttpClient) { }
  
  public updateCourse(update_course:CourseResponse):Observable<any>{
    return this.http.patch<any>(`${this.API_URL}/admin/updateCourse`,update_course);
  }
  
  public updateDepartment(update_department:DepartmentResponse):Observable<any>{
    return this.http.patch<any>(`${this.API_URL}/admin/updateDepartment`,update_department);
  }
  
  public updateInstructor(update_instructor:InstructorResponse):Observable<any>{
    return this.http.patch<any>(`${this.API_URL}/admin/updateInstructor`,update_instructor);
  }
  
  public updateStudent(update_student:StudentResponse):Observable<any>{
    return this.http.patch<any>(`${this.API_URL}/admin/updateStudent`,update_student);
  }
  
  public updateBatch(update_batch:BatchResponse):Observable<any>{
    return this.http.patch<any>(`${this.API_URL}/admin/updateBatch`,update_batch);
  }
}
