import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { PettyCashService } from 'app/modules/petty-cash/services/petty-cash.service';
import Swal from 'sweetalert2';
import { Product } from '../../models/product';
import { roleCode } from 'app/modules/auth/models/plan-professional/role-code';
import { Classifier } from 'app/modules/configuration/models/classifier';
import { OverviewSaleComponent } from 'app/modules/sale/components/overview-sale/overview-sale.component';
import { ReportService } from '../../services/report.service';


const ELEMENT_DATA: Classifier[] = [];

@Component({
  selector: 'app-earning-report',
  templateUrl: './earning-report.component.html',
  styleUrls: ['./earning-report.component.scss']
})
export class EarningReportComponent implements AfterViewInit {
  displayedColumns: string[] = ['order', 'saleId', 'saleTotal','warehouse','saleDate','client','seller','saleType'];
  dataSource = new MatTableDataSource<any>(ELEMENT_DATA);
  warehouseId: number;
  PettyCashId: number;
  @ViewChild(MatPaginator) paginator: MatPaginator


  listOptionsPage: number[] = [5, 10, 20, 50, 100];
  totalLength: number = 400;
  amountTotalEarning: number = 0;
  page = 0;
  limit = 10;
  isFilterVisible: boolean = true;
  objComplete = null;

  clientNameSelect : string = 'Todos';
  userNameSelect : string = 'Todos';
  rangeDateLabel : string = 'Hoy';




  constructor(private service: ReportService,
    private router: Router,
    public dialog: MatDialog,
    private servicePettyCash: PettyCashService) {

  }


  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  toggleFilter() {
    this.isFilterVisible = !this.isFilterVisible;
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

  pageEvent(event) {
    this.limit = event.pageSize;
    this.page = event.pageIndex;
    this.service.getListSaleReport(this.CurrentPaginator).subscribe((ele: any[any]) => {
      this.dataSource = ele.listSale;
      this.objComplete = ele;
      this.totalLength = ele.total;
    });
  }

  gestionaryEarning(data : any){
    this.router.navigate(['report/earning/detail/' + data.id]);

  }




  get CurrentPaginator() {
    // const today = new Date();
    // const localDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000);
    // const formattedDate = localDate.toISOString().split('T')[0]; 
    // return `?Limit=${this.limit}&Page=${this.page}&DateInit=${formattedDate}&DateEnd=${formattedDate}`;
    return `?Limit=${this.limit}&Page=${this.page}`;
  }

  downloadPDFTermic() {
    this.service.generateReportingPdfSale(this.objComplete).subscribe((response: Blob) => {
      const fileURL = URL.createObjectURL(response);
      window.open(fileURL, '_blank');
      setTimeout(() => {
        URL.revokeObjectURL(fileURL);
      }, 100);
    },
      err => {
        console.error('Error al descargar el PDF:', err);
      })
  }


  createNew() {
    this.router.navigate(['sale/sale/store']);
  }

  update(data: any) {
    this.router.navigate(['sale/sale/store/' + data.id]);
  }

  overView(data: any) {
    const dialogRef = this.dialog.open(OverviewSaleComponent, {
      panelClass: 'custom-container',
      maxHeight: '94vh',
      data: { id: data.saleId },
    });

    dialogRef.afterClosed().subscribe(result => {
      let tes = result;
    });
  }

  senfilter(event: any) {
    let queryStringFilter = event.query;
    let dataParamsFilter = event.dataParamsFilter;
    let queryString = this.CurrentPaginator + queryStringFilter;
    this.getAllDataEarning(queryString);
    this.setParameters(dataParamsFilter); 
  }

  setParameters(data : any){
     this.clientNameSelect = data?.myControl;
     this.userNameSelect = data?.userName;
     if(data?.typeId == 1){
        this.rangeDateLabel = 'Hoy';
     }
     if(data?.typeId == 2){
        this.rangeDateLabel = 'Ayer';
     }
     if(data?.typeId == 3){
       this.rangeDateLabel = 'Fechas';
     }


  }

  getAllDataEarning(queryString : string){
   this.service.getListEarningReport(queryString).subscribe((ele: any) => {
        this.amountTotalEarning = ele?.amountTotalEarning;
        this.dataSource = ele.listEarning;
        this.objComplete = ele.listEarning;
      });
  }



  lowWarehouse(data: any) {
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
