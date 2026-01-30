import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { OverviewWarehouseComponent } from '../../components/warehouse-aggregate/overview-warehouse/overview-warehouse.component';
import { WarehouseService } from '../../services/warehouse.service';
import Swal from 'sweetalert2';
import { Warehouse } from '../../models/warehouse';
import { PopupAlertPackageComponent } from 'app/shared/components/popup-alert-package/popup-alert-package.component';
import { OverviewMovementComponent } from '../../components/warehouse-movement/overview-movement/overview-movement.component';



const ELEMENT_DATA: Warehouse[] = [];

@Component({
  selector: 'app-warehouse-transfer',
  templateUrl: './warehouse-transfer.component.html',
  styleUrls: ['./warehouse-transfer.component.scss']
})
export class WarehouseTransferComponent implements AfterViewInit{
  displayedColumns: string[] = ['id', 'movementDateRequest', 'noteRequest', 'warehouseOriginId','userRequestId','status','isActive','gestionary'];
  dataSource = new MatTableDataSource<Warehouse>(ELEMENT_DATA);
  id : number = 0;
  @ViewChild(MatPaginator) paginator: MatPaginator

  constructor(private service: WarehouseService,
              private activatedRoute: ActivatedRoute,
              private router: Router,public dialog: MatDialog) {
      this.id = parseInt(this.activatedRoute.snapshot.params['id']);
      if(this.id > 0)
      {
        this.readData();
      }
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
   this.readData();
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

  readData(){
    this.service.getListMovementRequest(this.id).subscribe((ele: any) => {
      this.dataSource = ele;
    });
  }


  createNew() {
    this.router.navigate(['warehouse/warehouse/store']);
  }

  gestioinaryProduct(id:any) {
    const dialogRef = this.dialog.open(OverviewMovementComponent, {
      data: {id: id},
      width: '80vw',
      maxWidth:'550px'
   });

   dialogRef.afterClosed().subscribe(result => {
     if(result){
      this.readData();
     }
   });
  }
  update(data: any) {
    this.router.navigate(['warehouse/warehouse/store/' + data.id]);
  }

  overView(data:any){
    const dialogRef = this.dialog.open(PopupAlertPackageComponent, {
       data: {id: data.id},
       width: '80vw',
       maxWidth:'600px'
    });

    dialogRef.afterClosed().subscribe(result => {
     let tes = result;
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
        this.service.lowWarehouseById(data.id).subscribe((resp)=>{
          this.readData();
          Swal.fire(
            'Baja Exitosa!',
            'Su Almacen se dio de baja exitosamente.',
            'success'
          );
        })
      }
    })
  }

}
