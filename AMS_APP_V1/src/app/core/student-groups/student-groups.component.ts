import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { concatMap } from 'rxjs';
import { PromoteGroup } from 'src/app/models/promote-group';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-student-groups',
  templateUrl: './student-groups.component.html',
  styleUrls: ['./student-groups.component.css']
})
export class StudentGroupsComponent implements OnInit,AfterViewInit {
  promoteGroups:PromoteGroup[]=[];
  
  constructor(private dataService:DataService,private router:Router,private elementRef:ElementRef){}

  ngOnInit(): void {
    this.dataService.isLoddedIn().pipe(
      concatMap(()=>{
        return this.dataService.getGroupOfDepartment();
      })
    ).subscribe(res=>{
      this.promoteGroups=res;
      console.log(res);
    });
  }

  ngAfterViewInit(): void {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor='#D4E7C5';
  }

  navigateToRemoveGroup(dept_id:number,semester:string) {
    const queryParams={
      dept_id,semester
    }
    this.router.navigate(['/admin/remove-students'],{queryParams})
  }
}
