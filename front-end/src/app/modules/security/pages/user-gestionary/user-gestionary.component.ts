import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { OverviewUserComponent } from '../../components/user-components/overview-user/overview-user.component';
import { Provider } from '../../models/provider';
import { SecurityService } from '../../services/security.service';




const ELEMENT_DATA: Provider[] = [];


@Component({
  selector: 'app-user-gestionary',
  templateUrl: './user-gestionary.component.html',
  styleUrls: ['./user-gestionary.component.scss']
})
export class UserGestionaryComponent implements AfterViewInit{
  displayedColumns: string[] = [
  "id",
  "firstName",
  "lastName",
  "phone",
  "ci",
  "userName",
  "role",
  "isActive",
  'acciones'];
  dataSource = new MatTableDataSource<Provider>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator

  constructor(private service: SecurityService,
    private router: Router,public dialog: MatDialog) {
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
    this.service.getListUser().subscribe((ele: any) => {
      this.dataSource = ele;
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



  createNew() {
    this.router.navigate(['security/user/store']);
  }

  update(data: any) {
    this.router.navigate(['security/user/store/' + data.id]);
  }
  
  overView(data:any){
    const dialogRef = this.dialog.open(OverviewUserComponent, {
       data: {id: data.id},
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

        this.service.lowById(data.id).subscribe((ele)=>{
           this.ngOnInit();
        });

        Swal.fire(
          'Baja Exitosa!',
          'Su cliente se dio de baja exitosamente.',
          'success'
        )
      }
    })
  }

}