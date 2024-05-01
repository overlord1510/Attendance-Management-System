import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent {

  username: string;
  role:string;
  
  constructor(private authService:AuthenticationService,private router:Router) {
    const username = localStorage.getItem('EMAIL');
    const role = localStorage.getItem('ROLE');
    console.log(username);
    if (username && role) {
      this.username = username;
      this.role=role;
    } else { 
      this.username = ''; 
      this.role='';
    }
  }

  navigateToHome():void{
    if(localStorage.getItem('ROLE')=="ADMIN"){
      this.router.navigate(['admin']);
    }
  }

  logout():void{
    this.authService.logout().subscribe(res=>console.log(res));
  }



}
