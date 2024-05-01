import { Component, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-recover',
  templateUrl: './recover.component.html',
  styleUrls: ['./recover.component.css']
})
export class RecoverComponent {
  recoverForm: FormGroup;

  constructor(private authService:AuthenticationService,private router:Router,private elementRef:ElementRef){
    this.recoverForm=new FormGroup({
      email:new FormControl('',[Validators.required])
    });
  }

  ngAfterViewInit(): void {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor='#D4E7C5';
  }
  back(){
    history.back();
  }
  onSubmit():void{
    console.log(this.recoverForm.get('email')?.value);
    this.authService.sendOTP(this.recoverForm.get('email')?.value).subscribe(()=>{
      alert(`OTP sent on registered main\n'${this.recoverForm.get('email')?.value}`);
      this.router.navigate(['validate-otp']);
    });
  }
}
