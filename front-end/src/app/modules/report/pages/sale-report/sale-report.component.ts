import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Classifier } from 'app/modules/configuration/models/classifier';
import { OverviewSaleComponent } from 'app/modules/sale/components/overview-sale/overview-sale.component';
import { ReportService } from '../../services/report.service';
import { SaleFilterInterface } from '../../models/saleFilterInterface';
import { CalendarService } from 'app/modules/calendar/services/calendar.service';


const ELEMENT_DATA: Classifier[] = [];

@Component({
  selector: 'app-sale-report',
  templateUrl: './sale-report.component.html',
  styleUrls: ['./sale-report.component.scss']
})
export class SaleReportComponent implements AfterViewInit {
  displayedColumns: string[] = ['order', 'client', 'warehouse', 'saleType', 'saleDate', 'amountTotal'];
  dataSource = new MatTableDataSource<any>(ELEMENT_DATA);
  warehouseId: number;
  PettyCashId: number;
  @ViewChild(MatPaginator) paginator: MatPaginator


  listOptionsPage: number[] = [5, 10, 20, 50, 100];
  totalLength: number = 400;
  page = 0;
  limit = 10;
  currentQueryString : string = "";
  objComplete = null;
  
  objDataFilter : SaleFilterInterface ;
  labelData : string = "Hoy";
  labelDateInit : string = "No Aplica";
  labelDateEnd : string = "No Aplica";
  labelNameClient : string = "Todos";
  labelSaleType : string = "Todos";
  listAppoint : any ;


  constructor(private service: CalendarService,
    private router: Router,
    public dialog: MatDialog) {
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
    let user = localStorage.getItem('userLogged');
    let userJson = JSON.parse(user);
    this.getListAppoint(userJson?.id);
  }


  getListAppoint(id: number) {
    this.service.getListAppoint(id).subscribe({
      next: (resp: any[]) => {
          this.listAppoint = resp.filter(item => item.statusId === 2);
      },
      error: (err) => {
        console.error('Error al obtener citas:', err);
      }
    });
  }

  pageEvent(event) {
  
  }

  onManageClinicalHistory(data: any){

     const dialogRef = this.dialog.open(OverviewSaleComponent, {
      panelClass: 'custom-container',
      maxHeight: '94vh',
      data: data ,
    });

    dialogRef.afterClosed().subscribe(result => {
        this.ngOnInit();
    });
  }

  get CurrentPaginator() {
    return `?Limit=${this.limit}&Page=${this.page}`;
  }

  downloadPDFTermic() {

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
      data: { id: data.id },
    });

    dialogRef.afterClosed().subscribe(result => {
      let tes = result;
    });
  }




}
