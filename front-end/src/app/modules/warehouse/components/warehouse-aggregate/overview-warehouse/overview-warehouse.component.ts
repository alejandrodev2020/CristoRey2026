import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { Provider } from 'app/modules/provider/models/provider';
import { image } from 'app/modules/product/models/image-default.const';
import { WarehouseService } from 'app/modules/warehouse/services/warehouse.service';
import { Warehouse } from 'app/modules/warehouse/models/warehouse';
import { Router } from '@angular/router';




@Component({
  selector: 'app-overview-warehouse',
  templateUrl: './overview-warehouse.component.html',
  styleUrls: ['./overview-warehouse.component.scss']
})
export class OverviewWarehouseComponent implements OnInit {


  id:number;
  myProvider : Warehouse;
  imageSource = this.sanitizer.bypassSecurityTrustResourceUrl(image);
  constructor(  private dialogRef: MatDialogRef<any>,
                private sanitizer: DomSanitizer,
                private service: WarehouseService,
                private router: Router,
                @Inject(MAT_DIALOG_DATA) data) 
  {
    this.id = data.id;
    if(this.id>0)
    {
      this.readData();
    }
  }
  ngOnInit(): void {
  }

  close(){
    this.dialogRef.close(true);
  }

  async setPhoto(data : any){
    this.imageSource = this.sanitizer.bypassSecurityTrustResourceUrl(data);
  }


  readData(){
      this.service.getById(this.id).subscribe((ele: Warehouse)=>{
          this.myProvider = ele;
      });
  }

  gestionaryProducts(){
    this.dialogRef.close(true);
    this.router.navigate(['warehouse/warehouse/product/'+this.id]);
  }

}
