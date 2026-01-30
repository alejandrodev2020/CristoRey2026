import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Product } from 'app/modules/product/models/product';
import { ProductService } from 'app/modules/product/services/product.service';


@Component({
  selector: 'app-overview-product',
  templateUrl: './overview-product.component.html',
  styleUrls: ['./overview-product.component.scss']
})
export class OverviewProductComponent implements OnInit {


  id:number;
  myProduct : Product; 

  constructor(  private dialogRef: MatDialogRef<any>,
                private service: ProductService,
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
    this.readData();
  }

  close(){
    this.dialogRef.close(true);
  }

  readData(){
      this.service.getById(this.id).subscribe((ele: Product)=>{
          this.myProduct = ele;
      });
  }

  gestionaryProducts(){
    this.dialogRef.close(true);
    this.router.navigate(['warehouse/warehouse/product/'+this.id]);
  }
}
