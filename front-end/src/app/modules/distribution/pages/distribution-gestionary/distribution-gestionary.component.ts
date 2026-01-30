import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';
import { ClientService } from 'app/modules/client/services/client.service';


import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ApexOptions } from 'ng-apexcharts';
import { OverviewWarehouseComponent } from 'app/modules/warehouse/components/warehouse-aggregate/overview-warehouse/overview-warehouse.component';
import Swal from 'sweetalert2';
import { DateTime } from 'luxon';



import { MatSort } from '@angular/material/sort';
import { PettyCashService } from 'app/modules/petty-cash/services/petty-cash.service';
import { PettyCash } from 'app/modules/petty-cash/models/petty-cash';
import { DistributionService } from '../../services/distribution.service';





const ELEMENT_DATA: PettyCash[] = [];



@Component({
  selector: 'app-distribution-gestionary',
  templateUrl: './distribution-gestionary.component.html',
  styleUrls: ['./distribution-gestionary.component.scss']
})
export class DistributionGestionaryComponent implements AfterViewInit{
  displayedColumns: string[] = ['id', 'createDateDistribution','userDistribuidorId','startDate','endDate','isActive','acciones'];
  dataSource = new MatTableDataSource<any>(ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator!:MatPaginator
  @ViewChild(MatSort) sort!: MatSort;

  chartVisitors: ApexOptions;

  now = DateTime.now();
  listDistribution : any;
  page = 0;
  limit = 10;
  totalLength:number = 400;

  pagination = {
    endIndex:9,
    lastPage:3,
    length:14,
    page:0,
    size:5,
    startIndex:0
  }

  listOptionsPage : number[] = [5, 10, 20,50,100];
  pettyCash : boolean = false;
  isFilterVisible: boolean = false;
  objComplete = null;

  constructor(private service: DistributionService,
    private router: Router,public dialog: MatDialog) {
  }



  ngAfterViewInit() {
  }

  listWarehouse: any[] = [];
  columns: any[] = [];
  actions: any[] = [];
  queryFilter = '';
  ngOnInit(): void {
    this.resetPaginator();
    this.service.getListDistribution(this.CurrentPaginator).subscribe((ele: any[any]) => {
      this.dataSource = ele.listDistribution;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.totalLength = ele.total;
      this.listDistribution = ele.listDistribution.filter((ele)=>
      {
         return (ele.isActive)
      });
      if(this.listDistribution.length > 0){
        this.pettyCash = true;
      }
    });
    this.columns = [
      {
        prop: 'Id',
        value: 'id'
      },
      {
        prop: 'Nombre',
        value: 'name'
      },
      {
        prop: 'Descripción',
        value: 'Description'
      },
      {
        prop: 'Ubicación',
        value: 'ubication'
      },
    ];

    this.actions = [
      'Ver',
      'Editar',
      'Eliminar'
    ];
    const now = DateTime.now();

  }

  pageEvent(event){
    this.limit = event.pageSize;
    this.page= event.pageIndex;
    this.service.getListDistribution(this.CurrentPaginator).subscribe((ele: any[any]) => {
      this.dataSource = ele.listDistribution;
      this.listDistribution = ele.listDistribution.filter((ele)=>
      {
         return (ele.isActive)
      });
      if(this.listDistribution.length > 0){
        this.pettyCash = true;
      }
    });
  }


  createNew() {
    this.router.navigate(['distribution/distribution/store']);
  }

  update(data: any) {
    this.router.navigate(['distribution/distribution/store/' + data.id]);
  }
  goToMaps(){
    this.router.navigate(['distribution/distribution/maps']);
  }

  overView(data:any){
    this.router.navigate(['distribution/distribution/execute/' + data.id]);
    // const dialogRef = this.dialog.open(OverviewPettyCashComponent, {
    //    data:  data.id,
    //    height : '80vh',
    //    maxWidth : '720px'
    // });

    // dialogRef.afterClosed().subscribe(result => {

    //   this.ngOnInit();
    // });
  }

  senfilter(event: string) {
    this.queryFilter = event;
    let queryString = this.CurrentPaginator + event;
    this.service.getListDistribution(queryString).subscribe((ele: any[any]) => {
      this.dataSource.data = ele.listSale;
      this.objComplete = ele;
      this.totalLength = ele.total;
    });
  }

  toggleFilter() {
    this.isFilterVisible = !this.isFilterVisible;
  }

  lowWarehouse(data : any){
    Swal.fire({
      title: 'Seguro que quiere dar de baja?',
      text: "Recuerda que no estas eliminando permanentemente!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, dar de Baja!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Baja Exitosa!',
          'Su Almacen se dio de baja exitosamente.',
          'success'
        )
      }
    })
  }

  resetPaginator() {
    this.page = 0;
    this.limit = 10;
  }

  get CurrentPaginator() {
    return `?Limit=${this.limit}&Page=${this.page}`;
  }


}

export interface PeriodicElement {
  id: number;
  name: string;
  description: string;
  code: string;
  location: string;
  isActive: boolean;
}
