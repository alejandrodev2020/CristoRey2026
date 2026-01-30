import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { PettyCashService } from 'app/modules/petty-cash/services/petty-cash.service';
import Swal from 'sweetalert2';

import { roleCode } from 'app/modules/auth/models/plan-professional/role-code';
import { property } from 'lodash';
import { Product } from '../../models/warehouseProduct';
import { SaleService } from 'app/modules/sale/services/sale.service';
import { OverviewSaleComponent } from 'app/modules/sale/components/overview-sale/overview-sale.component';
import { WarehouseService } from '../../services/warehouse.service';



const ELEMENT_DATA: Product[] = [];

@Component({
  selector: 'app-warehouse-movement',
  templateUrl: './warehouse-movement.component.html',
  styleUrls: ['./warehouse-movement.component.scss']
})
export class WarehouseMovementComponent  implements AfterViewInit {
    displayedColumns: string[] = ['id', 'movementType', 'movementMotive', 'product', 'amountOrigin', 'unitMeasurement', 'acciones'];
    dataSource = new MatTableDataSource<any>(ELEMENT_DATA);

    warehouseId: number;
    PettyCashId: number;
    MyData: any[] = [];
    screenWidth: number = 0;
    isPhone: boolean = false;

    @ViewChild(MatPaginator) paginator: MatPaginator

    columns2 = [
      {
        label: 'Cod',
        property: 'id',
      },
      {
        label: 'Nombre',
        property: 'Name'
      }
    ];

    actions2 = [
      {
        label: 'Cod',
        property: 'id',
      },
      {
        label: 'Nombre',
        property: 'Name'
      }
    ];

    listOptionsPage: number[] = [5, 10, 20, 50, 100];
    totalLength: number = 400;
    page = 0;
    limit = 10;
    queryFilter = '';

    objComplete = null;

    constructor(private service: WarehouseService,
      private router: Router,
      public dialog: MatDialog,
      private servicePettyCash: PettyCashService,
      private activatedRoute: ActivatedRoute) {
    }


    applyFilter(filterValue: string) {
      filterValue = filterValue.trim(); // Remove whitespace
      filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
      this.dataSource.filter = filterValue;
    }

    ngAfterViewInit() {
      // this.dataSource.paginator = this.paginator;
    }

    listWarehouse: any[] = [];
    columns: any[] = [];
    actions: any[] = [];
    ngOnInit(): void {
      this.warehouseId = parseInt(this.activatedRoute.snapshot.params['id']);

      this.service.getWarehouseMovementByWarehouseId(this.warehouseId, this.CurrentPaginator).subscribe((ele: any) => {

        this.dataSource.data = ele.listWarehouseProductMovement;
        this.MyData = ele.listWarehouseProductMovement;
        this.objComplete = ele;
        this.totalLength = ele.total;
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
    }

    senfilter(event: string) {
      this.resetPaginator();
      this.queryFilter = event;
      let queryString = this.CurrentPaginator + event;
    //   this.service.getListSale(queryString).subscribe((ele: any[any]) => {
    //     this.dataSource.data = ele.listSale;
    //     this.objComplete = ele;
    //     this.totalLength = ele.total;
    //   });
    }

    resetPaginator() {
      this.page = 0;
      this.limit = 10;
    }

    pageEvent(event) {
      this.limit = event.pageSize;
      this.page = event.pageIndex;
    //   this.service.getListSale(this.CurrentPaginator + this.queryFilter).subscribe((ele: any[any]) => {
    //     this.dataSource.data = ele.listSale;
    //     this.objComplete = ele;
    //     this.totalLength = ele.total;
    //   });
    }

    get CurrentPaginator() {
      return `?Limit=${this.limit}&Page=${this.page}`;
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
