import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CourseResponse } from '../models/course-response';
import { DepartmentResponse } from '../models/department-response';
import { DepartmentRequest } from '../models/department-request';
import { InstructorResponse } from '../models/instructor-response';
import { StudentResponse } from '../models/student-response';
import { BatchResponse } from '../models/batch-response';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private API_URL: string = 'http://localhost:8080/api/v1'
  constructor(private http: HttpClient) { }

  public isLoddedIn(): Observable<Boolean> {
    return this.http.get<boolean>(`${this.API_URL}/status/isLoggedIn`);
  }

  public getCourseCount(): Observable<number> {
    return this.http.get<number>(`${this.API_URL}/admin/courseCount`);
  }

  public getDepartmentCount(): Observable<number> {
    return this.http.get<number>(`${this.API_URL}/admin/departmentCount`);
  }

  public getTeacherCount(): Observable<number> {
    return this.http.get<number>(`${this.API_URL}/admin/instructorCount`);
  }
  
  public getStudentCount(): Observable<number> {
    return this.http.get<number>(`${this.API_URL}/admin/studentCount`);
  }

  public getBatchCount(): Observable<number> {
    return this.http.get<number>(`${this.API_URL}/admin/batchCount`);
  }

  public getCourseList(): Observable<CourseResponse[]> {
    return this.http.get<CourseResponse[]>(`${this.API_URL}/admin/getCourseList`);
  }

  public getCourseById(id: number): Observable<CourseResponse> {
    return this.http.get<CourseResponse>(`${this.API_URL}/admin/getCourse/` + id);
  }

  public deleteCourseById(id: number): Observable<any> {
    return this.http.delete<any>(`${this.API_URL}/admin/deleteCourse/` + id)
  }


  public getDepartmentList(): Observable<DepartmentResponse[]> {
    return this.http.get<DepartmentResponse[]>(`${this.API_URL}/admin/getAllDepartment`);
  }

  public getDepartmentById(id: number): Observable<DepartmentResponse> {
    return this.http.get<DepartmentResponse>(`${this.API_URL}/admin/getDepartment/` + id);
  }

  public deleteDepartmentById(id: number): Observable<any> {
    return this.http.delete<any>(`${this.API_URL}/admin/deleteDepartment/` + id)
  }


  public getInstructorList(): Observable<InstructorResponse[]> {
    return this.http.get<InstructorResponse[]>(`${this.API_URL}/admin/get-instructor-list`);
  }

  public getInstructorById(id: number): Observable<InstructorResponse> {
    return this.http.get<InstructorResponse>(`${this.API_URL}/admin/getInstructor/` + id);
  }

  public deleteInstructor(id: number): Observable<any> {
    return this.http.delete<any>(`${this.API_URL}/admin/deleteInstructor/` + id);
  }

  public getStudentList(): Observable<StudentResponse[]> {
    return this.http.get<StudentResponse[]>(`${this.API_URL}/admin/get-student-list`);
  }

  public getStudentById(id: number): Observable<StudentResponse> {
    return this.http.get<StudentResponse>(`${this.API_URL}/admin/getStudent/` + id);
  }

  public deleteStudent(id: number): Observable<any> {
    return this.http.delete<any>(`${this.API_URL}/admin/deleteStudent/` + id);
  }

  public getBatchList(): Observable<BatchResponse[]> {
    return this.http.get<BatchResponse[]>(`${this.API_URL}/admin/get-batch-list`);
  }

  public getBatchById(id: number): Observable<BatchResponse> {
    return this.http.get<BatchResponse>(`${this.API_URL}/admin/getBatch/` + id);
  }

  public deleteBatch(id: number): Observable<any> {
    return this.http.delete<any>(`${this.API_URL}/admin/deleteBatch/` + id);
  }


}
