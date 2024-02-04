import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { concatMap } from 'rxjs';
import { BatchResponse } from 'src/app/models/batch-response';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-batch-list',
  templateUrl: './batch-list.component.html',
  styleUrls: ['./batch-list.component.css']
})
export class BatchListComponent {
  batchList: BatchResponse[] = [];

  constructor(private dataService:DataService,private router:Router){
    this.getBatchList();
  }
  private getBatchList():void{
    this.dataService.isLoddedIn().pipe(
      concatMap(res=>{
        console.log("Authenticated :: "+res);
        return this.dataService.getBatchList();
      })
    ).subscribe((res)=>{
      this.batchList=res;
    });
  }

  navigateToRegisterBatch() {
    this.router.navigate(['/admin/register-batch']);
  }
  editBatch(id: number) {
    this.router.navigate(['/admin/update-batch',id]);
  }
  deleteBatch(id: number) {
    const val=confirm("Delete batch with id :: "+id)
    this.dataService.deleteBatch(id).subscribe({
      next:()=>{
        console.log("Batch deleted");
      },error:(err)=>{
        console.log(err);
      },complete:()=>{
        this.getBatchList();
      }
    })
  }

}
