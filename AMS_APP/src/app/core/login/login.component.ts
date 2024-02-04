import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationRequest } from 'src/app/models/authentication-request';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  private auth_req: AuthenticationRequest;

  loginForm: FormGroup = new FormGroup({
    email: new FormControl("", [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl("", [
      Validators.required,
      Validators.minLength(8)
    ])
  });

  constructor(private authService: AuthenticationService, private router: Router) {
    this.auth_req = {
      email: "",
      password: ""
    };
  }

  onSubmit(): void {
    console.log(this.loginForm.controls['email'].value);
    console.log(this.loginForm.controls['password'].value);
    this.auth_req.email = this.loginForm.controls['email'].value;
    this.auth_req.password = this.loginForm.controls['password'].value
    this.authService.authenticate(this.auth_req).subscribe({

      next: res => {
        localStorage.setItem('AUTH_TOKEN', res.body!.token);
        localStorage.setItem('ROLE', res.body!.role);

        if (res.body!.role == 'ADMIN' && res.body!.token) {
          this.router.navigate(['/admin']);
        }
      }, error: err => {
        console.log(err.status);
      }, complete: () => {
        console.log("Authentication Process Completed");
        console.log("Received Token ", localStorage.getItem('AUTH_TOKEN'));
        console.log("Received Role ", localStorage.getItem('ROLE'));
      }
    });
  }

  get val() {
    return this.loginForm.controls;
  }
}
