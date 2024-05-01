import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationRequest } from '../models/authentication-request';
import { Observable } from 'rxjs';
import { AuthenticationResponse } from '../models/authentication-response';
import { UserAuthResponse } from '../models/user-auth-response';
import { ValidateOTP } from '../models/validate-otp';
import { ChangePasswordReq } from '../models/change-password-req';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private API_URL: string = "http://localhost:8080/api/v1/auth";

  constructor(private http: HttpClient, private router: Router) { }

  public authenticate(auth_req: AuthenticationRequest): Observable<HttpResponse<AuthenticationResponse>> {
    return this.http.post<AuthenticationResponse>(`${this.API_URL}/authenticate`, auth_req, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      observe: 'response' as 'response'
    });
  }

  public refreshToken(): Observable<HttpResponse<AuthenticationResponse>> {
    return this.http.get<AuthenticationResponse>(`${this.API_URL}/refresh`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      observe: 'response' as 'response'
    });
  }

  public logout(): Observable<HttpResponse<void>> {
    localStorage.removeItem('AUTH_TOKEN');
    localStorage.removeItem('ROLE');
    localStorage.removeItem('EMAIL');
    this.router.navigate(['/']);
    return this.http.get<void>(`${this.API_URL}/remove`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      observe: 'response' as 'response'
    });
  }


  public sendOTP(email_id: string): Observable<void> {
    console.log(email_id);
    const params = {
      email: email_id
    }
    return this.http.get<void>(`${this.API_URL}/send-otp`, { params })
  }

  public validateOTP(validate_otp: ValidateOTP): Observable<UserAuthResponse> {
    return this.http.post<UserAuthResponse>(`${this.API_URL}/validate-otp`, validate_otp)
  }

  public changePassword(change_password: ChangePasswordReq): Observable<void> {
    return this.http.post<void>(`${this.API_URL}/change-password`, change_password);
  }
}
