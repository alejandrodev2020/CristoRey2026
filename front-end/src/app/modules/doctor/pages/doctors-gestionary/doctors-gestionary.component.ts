import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { OverviewProviderComponent } from '../../components/client-aggregate/overview-provider/overview-provider.component';
import { Provider } from '../../models/provider';
import { DoctorService } from '../../services/doctor.service';


const ELEMENT_DATA: Provider[] = [];

@Component({
  selector: 'app-doctors-gestionary',
  templateUrl: './doctors-gestionary.component.html',
  styleUrls: ['./doctors-gestionary.component.scss']
})
export class DoctorsGestionaryComponent implements AfterViewInit{
  displayedColumns: string[] = [
  "id",
  "businessName",
  "firstName",
  "lastName",
  "phone",
  "ci",
  "isActive",
  'acciones'];
  dataSource = new MatTableDataSource<Provider>(ELEMENT_DATA);
  isFilterVisible: boolean = false;
  searchValue: string = '';
  productList: [] = [];
  form: FormGroup;
  @ViewChild(MatPaginator) paginator: MatPaginator

  constructor(private service: DoctorService,private fb: FormBuilder,
    private router: Router,public dialog: MatDialog) {
      this.form = this.fb.group({
        search: [''],
      });
           /////////////// inplemente esto
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
    this.service.getListDoctors().subscribe((ele: any) => {
      this.productList = ele;
      this.dataSource = new MatTableDataSource(ele);
      /////////////// inplemente esto
      console.log( this.dataSource,"esto son mis datos")
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
    this.router.navigate(['doctors/doctors/store']);
  }

  update(data: any) {
    this.router.navigate(['doctors/doctors/store/' + data.id]);
  }
  
  overView(data:any){
    const dialogRef = this.dialog.open(OverviewProviderComponent, {
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

  senfilter(event: string) {

  }

  toggleFilter() {
    this.isFilterVisible = !this.isFilterVisible;
  }

}