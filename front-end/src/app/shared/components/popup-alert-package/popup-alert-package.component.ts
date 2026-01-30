import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-popup-alert-package',
  templateUrl: './popup-alert-package.component.html',
  styleUrls: ['./popup-alert-package.component.scss']
})
export class PopupAlertPackageComponent {
  pettyCashId:any;
  pettyCashObj:any;
  viewMovements : boolean = false;
  constructor(private dialogRef: MatDialogRef<any>,
              @Inject(MAT_DIALOG_DATA) data,
            ){
   this.pettyCashId= data;
    this.setValuesDefaul();
  }

  setValuesDefaul(){
    // this.service.getById(this.pettyCashId).subscribe((resp)=>{
    //   this.pettyCashObj = resp;
    // });
  }

  selectTab(event:any){
    this.viewMovements = (event.index === 1);
  }


  close(){
    this.dialogRef.close(true);
  }
}
