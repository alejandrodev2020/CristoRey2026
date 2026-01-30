import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { StoreClassifierComponent } from '../../components/store-classifier/store-classifier.component';
import { Classifier } from '../../models/classifier';
import { ConfigurationService } from '../../services/configuration.service';

const ELEMENT_DATA: Classifier[] = []; 
@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.scss']
})
export class ProductCategoryComponent implements OnInit {
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
    this.service.getAllProductCategory().subscribe((ele:any )=>{
      this.dataSource = ele;
   });
  }
  createNew(){
    const dialogRef = this.dialog.open(StoreClassifierComponent, {
      data: {  
              id: null,
              classifier : 'categoria',
              pathClassifier:'product-category'
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
        classifier : 'categoria',
        pathClassifier:'product-category'
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
