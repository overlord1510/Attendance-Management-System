import { AfterViewInit, Component, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidateOTP } from 'src/app/models/validate-otp';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-validate-otp',
  templateUrl: './validate-otp.component.html',
  styleUrls: ['./validate-otp.component.css']
})
export class ValidateOtpComponent implements AfterViewInit {
  recoverForm: FormGroup;

  constructor(private authService: AuthenticationService, private router: Router,private elementRef:ElementRef) {
    this.recoverForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      otp: new FormControl('', [Validators.required])
    });
  }

  ngAfterViewInit(): void {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor='#D4E7C5';
  }
  onSubmit(): void {
    const emailId=this.recoverForm.get('email')!.value;
    const otp=this.recoverForm.get('otp')!.value;
    const validate_otp: ValidateOTP = {
      email: this.recoverForm.get('email')?.value,
      otp: this.recoverForm.get('otp')?.value
    }
    this.authService.validateOTP(validate_otp).subscribe((res) => {
      console.log(res);
      this.router.navigate(['change-password'],{queryParams:{emailId,otp}})
    });
   
  }

  back(){
    history.back();
  }
}
