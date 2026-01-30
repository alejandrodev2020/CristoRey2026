import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { PettyCashService } from 'app/modules/petty-cash/services/petty-cash.service';
import Swal from 'sweetalert2';
import { roleCode } from 'app/modules/auth/models/plan-professional/role-code';
import { Product } from 'app/modules/sale/models/product';
import { CollectionsService } from '../../services/collections.service';
import { OverviewCollectionsComponent } from '../../components/overview-collections/overview-collections.component';
import { OverviewSaleComponent } from 'app/modules/sale/components/overview-sale/overview-sale.component';
const ELEMENT_DATA: Product[] = [];
@Component({
  selector: 'app-collections-gestionary',
  templateUrl: './collections-gestionary.component.html',
  styleUrls: ['./collections-gestionary.component.scss']
})
export class CollectionsGestionaryComponent implements AfterViewInit{
  displayedColumns: string[] = ['id','client', 'saleCreditDate','amountCredit','status','sale','actions'];
  dataSource = new MatTableDataSource<any>(ELEMENT_DATA);
  warehouseId:number;
  PettyCashId:number;
  limit : number = 10;
  page : number = 0;
  totalLength: number = 400;
  isFilterVisible: boolean = false;
  queryFilter = '';
  objComplete = null;
  listOptionsPage: number[] = [5, 10, 20, 50, 100];
  @ViewChild(MatPaginator) paginator: MatPaginator

  constructor(private service: CollectionsService,
              private router: Router,
              public dialog: MatDialog,
              private servicePettyCash : PettyCashService) {
              this.resetPaginator();
  }


  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  listWarehouse: any[] = [];
  columns: any[] = [];
  actions: any[] = [];
  ngOnInit(): void {
    let role = localStorage.getItem('role');
    let userLogged = localStorage.getItem('userLogged');
    let roleJson = JSON.parse(role);
    let userJson = JSON.parse(userLogged);

    if(roleJson.id == roleCode.admin)
    {
      this.service.getAllSaleCredit(this.CurrentPaginator).subscribe((ele: any) => {
        this.dataSource.data = ele.listSaleCredit;
        this.objComplete = ele;
        this.totalLength = ele.total;
      });

    }
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
  }



  createNew() {
    this.router.navigate(['sale/sale/store']);
  }

  update(data: any) {
    this.router.navigate(['sale/sale/store/' + data.id]);
  }

  overView(data:any){
    const dialogRef = this.dialog.open(OverviewSaleComponent, {
      panelClass: 'custom-container',
      maxHeight: '94vh',
      data: { id: data?.sale?.id },
    });

    dialogRef.afterClosed().subscribe(result => {
      let tes = result;
    });
  }

  gestionaryCredit(data: any){
    this.router.navigate(['collections/collections/detail/' + data.id]);
  }

  senfilter(event: string) {
    this.queryFilter = event;
    let queryString = this.CurrentPaginator + event;
    this.service.getAllSaleCredit(queryString).subscribe((ele: any[any]) => {

    });
  }

  toggleFilter() {
    this.isFilterVisible = !this.isFilterVisible;
  }

  resetPaginator() {
    this.page = 0;
    this.limit = 10;
  }

  get CurrentPaginator() {
    return `?Limit=${this.limit}&Page=${this.page}`;
  }

  pageEvent(event) {
    this.limit = event.pageSize;
    this.page = event.pageIndex;
    this.service.getAllSaleCredit(this.CurrentPaginator).subscribe((ele: any[any]) => {
      this.dataSource.data = ele.listSaleCredit;
      this.objComplete = ele;
      this.totalLength = ele.total;
    });
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

}
