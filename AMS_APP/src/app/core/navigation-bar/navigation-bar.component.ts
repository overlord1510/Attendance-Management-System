import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent {

  constructor(private authService:AuthenticationService,private router:Router){}

  navigateToHome():void{
    if(localStorage.getItem('ROLE')=="ADMIN"){
      this.router.navigate(['admin']);
    }
  }

  logout():void{
    this.authService.logout().subscribe(res=>console.log(res));
  }

}
