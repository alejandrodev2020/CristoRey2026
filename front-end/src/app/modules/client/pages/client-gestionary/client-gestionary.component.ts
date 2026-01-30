import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { OverviewClientComponent } from '../../components/client-aggregate/overview-client/overview-client.component';
import { Client } from '../../models/client';
import { ClientService } from '../../services/client.service';
import { catchError, of } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';

const ELEMENT_DATA: Client[] = [];

@Component({
  selector: 'app-client-gestionary',
  templateUrl: './client-gestionary.component.html',
  styleUrls: ['./client-gestionary.component.scss']
})
export class ClientGestionaryComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = [
    "photo",
    "id",
    "firstName",
    "lastName",
    "phone",
    "isActive",
    'acciones'
  ]; 
  dataSource = new MatTableDataSource<Client>(ELEMENT_DATA);
  isFilterVisible: boolean = false;
  form: FormGroup;
  searchValue: string = '';

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private service: ClientService,private fb: FormBuilder, private router: Router, public dialog: MatDialog) 
  {
    this.form = this.fb.group({
      search: [''],
    });
    this.form.get('search')?.valueChanges.subscribe((searchValue) => {
      this.applyFilter(searchValue);
    });
     /////////////// inplemente esto
    this.dataSource.filterPredicate = (data, filter) => {
    const firstName =  data.firstName.toLowerCase().includes(filter.toLowerCase());
    const lastName =  data.lastName.toLowerCase().includes(filter.toLowerCase());
    return firstName || lastName;
    };   

  }

  applyFilter(searchValue: string) {
    this.searchValue = searchValue;
    this.dataSource.filter = searchValue.trim().toLowerCase(); // Aplicar el filtro
  }

  ngOnInit(): void {
    this.getClientList();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getClientList() {
    this.service.getAllClient().pipe(
      catchError((error) => {
        console.error('Error fetching clients:', error);
        // Puedes mostrar un mensaje de error al usuario si lo deseas
        Swal.fire('Error', 'No se pudieron cargar los clientes.', 'error');
        return of([]); // Retorna un array vacío en caso de error
      })
    ).subscribe((ele: Client[]) => {
      ele.forEach((item) => {
        item.photo = item.photo ? `data:image/png;base64,${item.photo}` :
          "https://img.freepik.com/psd-gratis/3d-ilustracion-persona-gafas-sol_23-2149436188.jpg?size=338&ext=jpg&ga=GA1.1.1788068356.1716681600&semt=ais_user";
      });
      this.dataSource.data = ele; // Asignar datos a dataSource
    });
  }

  createNew() {
    this.router.navigate(['client/client/store']);
  }

  update(data: Client) {
    this.router.navigate(['client/client/store/', data.id]);
  }

  overView(data: Client) {
    const dialogRef = this.dialog.open(OverviewClientComponent, {
      data: { id: data.id },
    });

    dialogRef.afterClosed().subscribe(result => {
      // Manejar el resultado si es necesario
    });
  }

  clearSearch() {
    this.searchValue = '';
    this.form.get('search').setValue('');
  }
  
  lowWarehouse(data: Client) {
    Swal.fire({
      title: '¿Seguro que quiere dar de baja?',
      text: "Recuerda que no estás eliminando permanentemente!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, dar de Baja!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.lowById(data.id).subscribe(() => {
          this.getClientList(); // Llama de nuevo para actualizar la lista
        });

        Swal.fire(
          'Baja Exitosa!',
          'Su cliente se dio de baja exitosamente.',
          'success'
        );
      }
    });
  }

  toggleFilter() {
    this.isFilterVisible = !this.isFilterVisible;
  }
}
