import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { StoreClassifierComponent } from '../../components/store-classifier/store-classifier.component';
import { Classifier } from '../../models/classifier';
import { ConfigurationService } from '../../services/configuration.service';

const ELEMENT_DATA: Classifier[] = []; 

@Component({
  selector: 'app-unit-measurement',
  templateUrl: './unit-measurement.component.html',
  styleUrls: ['./unit-measurement.component.scss']
})
export class UnitMeasurementComponent implements OnInit {
  displayedColumns: string[] = [
    "id",
    "name",
    "description",
    "isActive",
    'acciones'];
    dataSource = new MatTableDataSource<Classifier>(ELEMENT_DATA);
    @ViewChild(MatPaginator) paginator: MatPaginator
  
  listUnitMeasurement : Classifier[];
  constructor(private service : ConfigurationService,
    public dialog: MatDialog){

  }
  ngOnInit(): void {
    this.redaData();
  }

  redaData(){
    this.service.getAllUnitMeasurement().subscribe((ele:any )=>{
      this.dataSource = ele;
   });
  }
  createNew(){
    const dialogRef = this.dialog.open(StoreClassifierComponent, {
      data: {  
              id: null,
              classifier : 'Unidad de Medida',
              pathClassifier:'unit-measurement'
            },
   });
 
   dialogRef.afterClosed().subscribe(result => {
    if(result){
      this.redaData();
    }  
   });
  }


  update(data : Classifier){
    const dialogRef = this.dialog.open(StoreClassifierComponent, {
      data: {  
        id: data.id,
        data:data,
        classifier : 'Unidad de Medida',
        pathClassifier:'unit-measurement'
      },
   });
   dialogRef.afterClosed().subscribe(result => {
       if(result){
         this.redaData();
       }  
   });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


}
