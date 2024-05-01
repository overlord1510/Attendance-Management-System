import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AttendanceRequest } from '../models/attendance-request';
import { AssignBatchToInstructor } from '../models/assign-batch-to-instructor';
import { AssignCourseToInstructor } from '../models/assign-course-to-instructor';
import { RegisterBatchRequest } from '../models/register-batch-request';
import { RegisterStudentRequest } from '../models/register-student-request';
import { RegisterInstructorRequest } from '../models/register-instructor-request';
import { DepartmentRequest } from '../models/department-request';
import { RegisterCourseRequest } from '../models/register-course-request';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  
  private API_URL: string = 'http://localhost:8080/api/v1';
  
  constructor(private http: HttpClient) { }

  public saveCourse(course_reg: RegisterCourseRequest): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/admin/saveCourse`, course_reg);
  }

  public saveDepartment(department_reg: DepartmentRequest): Observable<void> {
    return this.http.post<void>(`${this.API_URL}/admin/saveDepartment`, department_reg);
  }

  public saveInstructor(instructor_reg: RegisterInstructorRequest): Observable<void> {
    return this.http.post<void>(`${this.API_URL}/admin/saveInstructor`, instructor_reg);
  }

  public saveStudent(student_reg: RegisterStudentRequest): Observable<void> {
    return this.http.post<void>(`${this.API_URL}/admin/saveStudent`, student_reg);
  }

  public saveBatch(batch_reg: RegisterBatchRequest): Observable<void> {
    return this.http.post<void>(`${this.API_URL}/admin/saveBatch`,batch_reg);
  }

  public assignCourseToInstructor(assignCourse:AssignCourseToInstructor):Observable<void>{
    return this.http.post<void>(`${this.API_URL}/admin/instructor-course/assign`,assignCourse);
  }

  public assignBatchToInstructor(assignBatch:AssignBatchToInstructor):Observable<void>{
    return this.http.post<void>(`${this.API_URL}/admin/instructor-batch/assign`,assignBatch);
  }

  public assignAttendance(attendanceRequest:AttendanceRequest):Observable<void>{
    return this.http.post<void>(`${this.API_URL}/teacher/assignAttendance`,attendanceRequest);
  }

  public promoteStudents(student_ids:number[]):Observable<void>{
    return this.http.post<void>(`${this.API_URL}/admin/promote`,student_ids);
  }
}
