import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Classifier } from 'app/modules/configuration/models/classifier';
import { OverviewSaleComponent } from 'app/modules/sale/components/overview-sale/overview-sale.component';
import { ReportService } from '../../services/report.service';
import { SaleFilterInterface } from '../../models/saleFilterInterface';
const ELEMENT_DATA: Classifier[] = [];
@Component({
  selector: 'app-shopping-report',
  templateUrl: './shopping-report.component.html',
  styleUrls: ['./shopping-report.component.scss']
})
export class ShoppingReportComponent  implements AfterViewInit {
  displayedColumns: string[] = ['order', 'provaider', 'warehouse','shoppingDate','amountTotal'];
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
  constructor(private service: ReportService,
    private router: Router,
    public dialog: MatDialog) {
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  listWarehouse: any[] = [];
  columns: any[] = [];
  actions: any[] = [];
  ngOnInit(): void {
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
    this.service.getListShoppingReport(this.CurrentPaginator).subscribe((ele: any[any]) => {
      this.dataSource = ele.listSale;
      this.objComplete = ele;
      this.totalLength = ele.total;
    });
  }

  get CurrentPaginator() {
    return `?Limit=${this.limit}&Page=${this.page}`;
  }

  downloadPDFTermic() {
    this.service.generateReportingPdfSale(this.currentQueryString).subscribe((response: Blob) => {
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
      data: { id: data.id },
    });

    dialogRef.afterClosed().subscribe(result => {
      let tes = result;
    });
  }

  senfilter(queryFilterObj: any) {
    let event = queryFilterObj.queryString;
    let data : SaleFilterInterface = queryFilterObj.dataForm;
    let queryString = this.CurrentPaginator + event;
    this.currentQueryString = this.CurrentPaginator + event;

    this.paseDataFormFilter(data);
    this.service.getListShoppingReport(queryString).subscribe((ele: any[any]) => {
      this.dataSource = ele.listShopping;
      this.objComplete = ele;
      this.totalLength = ele.total;
    });
  }

  paseDataFormFilter(data : SaleFilterInterface){

    
    this.objDataFilter = data;
    if(data.dateType == 1)
    {
      this.labelData = "Hoy";
    }
    if(data.dateType == 2)
    {
      this.labelData = "Ayer";
    }
    if(data.dateType == 3)
    {
      this.labelData = "Fechas";
    }

    if(data.typeId == 1){
      this.labelSaleType = "Contado"
    }

    if(data.typeId == 2){
      this.labelSaleType = "Credito"
    }
    if(data.typeId == 0){
      this.labelSaleType = "Todos"
    }


    this.labelNameClient = (data?.myControl)?data?.myControl : 'Todos';
    if (data.dateInit instanceof Date) {
      this.labelDateInit = data.dateInit.toDateString();
    } else {
      this.labelDateInit = new Date(data.dateInit).toDateString();
    }
    
    if (data.dateEnd instanceof Date) {
      this.labelDateEnd = data.dateEnd.toDateString();
    } else {
      this.labelDateEnd = new Date(data.dateEnd).toDateString();
    }

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
