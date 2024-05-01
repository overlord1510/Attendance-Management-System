import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { concatMap } from 'rxjs';
import { StudentResponse } from 'src/app/models/student-response';
import { DataService } from 'src/app/services/data.service';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-remove-list',
  templateUrl: './remove-list.component.html',
  styleUrls: ['./remove-list.component.css']
})
export class RemoveListComponent implements OnInit,AfterViewInit {
  studentList: StudentResponse[] = [];
  removeForm: FormGroup;


  constructor(private dataService: DataService, private route: ActivatedRoute,private registerService:RegisterService,private elementRef:ElementRef,private router:Router) {
    this.removeForm = new FormGroup({
      passout:new FormControl(false),
      promotes: new FormArray([])
    });
  }

  ngAfterViewInit(): void {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor='#D4E7C5';
  }
  
  ngOnInit(): void {
    this.dataService.isLoddedIn().pipe(
      concatMap(() => {
        return this.route.queryParams;
      }), concatMap((res) => {
        const dept_id = res['dept_id'];
        const semester = res['semester'];
        return this.dataService.getStudentUsingDepartmentAndSemester(dept_id,semester);
      })
      ).subscribe(res => {
        this.studentList = res;
        this.updatePromoteFormArray();
        console.log("hello",this.studentList.length);
      });
    }
    
    get promoteFormArray(): FormArray {
      return this.removeForm.get('promotes') as FormArray;
    }
    
    updatePromoteFormArray(){
    this.studentList.forEach(()=> this.promoteFormArray.push(new FormControl(true)));
  }

  onSubmit():void{
    console.log(this.removeForm.get('passout')?.value);
    console.log(this.promoteFormArray.value);

    const student_ids:number[]=[];
    this.promoteFormArray.controls.filter((control,index)=>{
      if(control.value){
        student_ids.push(this.studentList[index].id);
      }
    });

    console.log(student_ids);

    if(this.removeForm.get('passout')!.value){
      this.dataService.removeStudents(student_ids).subscribe({
        next:()=>{
          alert("Deleted Batch");
          this.router.navigate(['/admin/remove-passouts']);
        }
      });
    }else{
      this.registerService.promoteStudents(student_ids).subscribe({
        next:()=>{
          console.log("Students Promoted "),
          this.router.navigate(['/admin/remove-passouts']);
        },
        error:(err)=>{
          if(err.status==406){
            alert("Batch already occupied!!! Please Promote Student of next Semeter first")
          }
        }
      });
    }

  }
}
