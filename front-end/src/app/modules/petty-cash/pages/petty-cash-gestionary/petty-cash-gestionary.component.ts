import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ApexOptions } from 'ng-apexcharts';
import { OverviewWarehouseComponent } from 'app/modules/warehouse/components/warehouse-aggregate/overview-warehouse/overview-warehouse.component';
import Swal from 'sweetalert2';
import { DateTime } from 'luxon';
import { PettyCashService } from '../../services/petty-cash.service';
import { PettyCash } from '../../models/petty-cash';
import { OverviewPettyCashComponent } from '../../components/petty-cash-aggregate/overview-petty-cash/overview-petty-cash.component';
import { MatSort } from '@angular/material/sort';


const ELEMENT_DATA: PettyCash[] = [];

@Component({
  selector: 'app-petty-cash-gestionary',
  templateUrl: './petty-cash-gestionary.component.html',
  styleUrls: ['./petty-cash-gestionary.component.scss']
})
export class PettyCashGestionaryComponent implements AfterViewInit{
//   displayedColumns: string[] = ['id', 'pettyCashInit', 'pettyCashEnd', 'amountEnd','cashAmount','warehouse','isActive', 'acciones'];
  displayedColumns: string[] = ['id', 'pettyCashInit', 'pettyCashEnd', 'amountEnd','cashAmount','warehouse','isActive', 'acciones'];
  dataSource = new MatTableDataSource<any>(ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator!:MatPaginator
  @ViewChild(MatSort) sort!: MatSort;

  chartVisitors: ApexOptions;

  now = DateTime.now();
  listPettyCash : any;
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

  constructor(private service: PettyCashService,
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
    this.service.getAllPettyCash(this.CurrentPaginator).subscribe((ele: any[any]) => {
      this.dataSource = ele.listPettyCash;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.totalLength = ele.total;
      this.listPettyCash = ele.listPettyCash.filter((ele)=>
      {
         return (ele.isActive)
      });
      if(this.listPettyCash.length > 0){
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
    this.service.getAllPettyCash(this.CurrentPaginator).subscribe((ele: any[any]) => {
      this.dataSource = ele.listPettyCash;
      this.listPettyCash = ele.listPettyCash.filter((ele)=>
      {
         return (ele.isActive)
      });
      if(this.listPettyCash.length > 0){
        this.pettyCash = true;
      }
    });
  }


  createNew() {
    this.router.navigate(['petty-cash/petty-cash/store']);
  }

  update(data: any) {
    this.router.navigate(['petty-cash/petty-cash/store/' + data.id]);
  }

  overView(data:any){
    this.router.navigate(['petty-cash/petty-cash/manage/' + data.id]);
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
    this.service.getAllPettyCash(queryString).subscribe((ele: any[any]) => {
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
