import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationRequest } from '../models/authentication-request';
import { Observable } from 'rxjs';
import { AuthenticationResponse } from '../models/authentication-response';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private API_URL: string = "http://localhost:8080/api/v1/auth";

  constructor(private http: HttpClient,private router:Router) { }

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

  public logout():Observable<HttpResponse<void>>{
    localStorage.removeItem('AUTH_TOKEN');
    localStorage.removeItem('ROLE');
    this.router.navigate(['/']);
    return this.http.get<void>(`${this.API_URL}/remove`,{
      headers:new HttpHeaders({
        'Content-Type':'application/json'
      }),
      observe:'response' as 'response'
    });
  }

}
