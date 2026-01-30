import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { OverviewWarehouseComponent } from '../../components/warehouse-aggregate/overview-warehouse/overview-warehouse.component';
import { WarehouseService } from '../../services/warehouse.service';
import Swal from 'sweetalert2';
import { Warehouse } from '../../models/warehouse';
import { PopupAlertPackageComponent } from 'app/shared/components/popup-alert-package/popup-alert-package.component';
import { FormBuilder, FormGroup } from '@angular/forms';



const ELEMENT_DATA: Warehouse[] = [];


@Component({
  selector: 'warehouse-gestionary',
  templateUrl: './warehouse-gestionary.component.html',
  styleUrls: ['./warehouse-gestionary.component.css']
})
export class WarehouseGestionaryComponent implements AfterViewInit{
  displayedColumns: string[] = ['id', 'name', 'description', 'code','location','isActive', 'acciones','gestionary'];
  dataSource = new MatTableDataSource<Warehouse>(ELEMENT_DATA);
  isFilterVisible: boolean = false;
  searchValue: string = '';
  form: FormGroup;

  @ViewChild(MatPaginator) paginator: MatPaginator

  constructor(private service: WarehouseService,private fb: FormBuilder,
    private router: Router,public dialog: MatDialog) {
      this.form = this.fb.group({
        search: [''],
      });
  
      this.form.get('search')?.valueChanges.subscribe((searchValue) => {
        this.applyFilter(searchValue);
      });
       /////////////// inplemente esto
      this.dataSource.filterPredicate = (data, filter) => {
      const firstName =  data.name.toLowerCase().includes(filter.toLowerCase());
      const lastName =  data.code.toLowerCase().includes(filter.toLowerCase());
      return firstName || lastName;
      };      

  }

        /////////////// inplemente esto
  applyFilter(searchValue: string) {
    this.searchValue = searchValue;
    this.dataSource.filter = searchValue.trim().toLowerCase(); // Aplicar el filtro
  }
        /////////////// inplemente esto
  clearSearch() {
    this.searchValue = '';
    this.form.get('search').setValue('');
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
    this.service.getAllWarehouse().subscribe((ele: any) => {
      this.dataSource = new MatTableDataSource(ele);
    });
  }


  createNew() {
    this.router.navigate(['warehouse/warehouse/store']);
  }

  gestioinaryProduct(id:any) {
    this.router.navigate(['warehouse/warehouse/product/'+id]);
  }
  update(data: any) {
    this.router.navigate(['warehouse/warehouse/store/' + data.id]);
  }

  overView(data:any){
    const dialogRef = this.dialog.open(OverviewWarehouseComponent, {
       data: {id: data.id},
       minWidth:'380px',

       maxWidth:'380px'
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
          localStorage.removeItem('warehouseDefault');
          Swal.fire(
            'Baja Exitosa!',
            'Su Almacen se dio de baja exitosamente.',
            'success'
          );
        })
      }
    })
  }

  senfilter(event: string) {
  }

  toggleFilter() {
    this.isFilterVisible = !this.isFilterVisible;
  }

  upWarehouse(data : any){
    Swal.fire({
      title: 'Seguro que quiere dar de alta?',
      text: "Recuerda que sí, estas activando nuevamente el almancen!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, activar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.upWarehouseById(data.id).subscribe((resp)=>{
          this.readData();
          localStorage.removeItem('warehouseDefault');
          Swal.fire(
            'Habilitación Exitosa!',
            'Su Almacen se activo exitosamente.',
            'success'
          );
        })
      }
    })
  }

}
