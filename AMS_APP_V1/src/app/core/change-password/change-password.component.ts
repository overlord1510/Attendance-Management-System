import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ChangePasswordReq } from 'src/app/models/change-password-req';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit, AfterViewInit {
  changePasswordForm: FormGroup;
  private email: string = '';
  private otp: number = -1;

  private newPassword: string = '';
  private checkPassword: string = '';

  constructor(private authService: AuthenticationService, private router: Router, private route: ActivatedRoute, private elementRef: ElementRef) {
    this.changePasswordForm = new FormGroup({
      npassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
      cpassword: new FormControl('', [Validators.required, this.passwordValidator()])
    });
  }

  ngAfterViewInit(): void {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#D4E7C5';
  }

  passwordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!this.changePasswordForm) {
        return null;
      }
      const password = this.changePasswordForm.get('npassword')!.value;
      const confirmPassword = control.value;

      if (password !== confirmPassword) {
        return { passwordMismatch: true };
      }
      return null;
    };
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((res) => {
      this.email = res['emailId'];
      this.otp = res['otp'];
    });
  }

  onSubmit(): void {

    console.log(this.changePasswordForm.valid);
    if (this.changePasswordForm.valid) {
      this.newPassword = this.changePasswordForm.get('npassword')!.value;
      this.checkPassword = this.changePasswordForm.get('cpassword')!.value;

      const changePasswordReq: ChangePasswordReq = {
        email: this.email,
        otp: this.otp,
        password: this.changePasswordForm.get('npassword')!.value
      }

      this.authService.changePassword(changePasswordReq).subscribe( {
        next:()=>{
          alert("Password Changed Will be redirected to login page.");
          this.router.navigate(['']);
        },error:(err)=>{
          console.log(err.status);
          if(err.status==491){
            alert("Invalid Username Redirecting to login page");
          }else if(err.status==492){
            alert("OTP Expired Redirecting to login page");
          }else if(err.status==493){
            alert("Invalid Otp Try Again");
            this.back();
          }
        }
      });
    }

  }

  back() {
    this.changePasswordForm.reset();
    history.back();
  }
}
