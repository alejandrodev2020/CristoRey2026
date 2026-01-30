import { AfterViewInit, ChangeDetectorRef, Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Product } from 'app/modules/warehouse/models/warehouseProduct';
import { PatientService } from '../../services/patient.service';


const ELEMENT_DATA: Product[] = [];

@Component({
  selector: 'app-clinic-history',
  templateUrl: './clinic-history.component.html',
  styleUrls: ['./clinic-history.component.scss']
})
export class ClinicHistoryComponent implements AfterViewInit {
  form: FormGroup;
  displayedColumns: string[] = ['id', 'photo', 'name', 'description', 'code', 'status', 'equivalences', 'acciones'];
  dataSource = new MatTableDataSource<Product>(ELEMENT_DATA);
  isFilterVisible: boolean = false;
  productList: [] = [];
  isRecording = false;
  transcribedText = '';
  label = '';
  searchValue: string = '';
  private recognition: SpeechRecognition | null = null;
  @ViewChild(MatPaginator) paginator: MatPaginator
  id: number = 0;
  listClinicalHistory: any[];
  isDoctor : boolean = false;
  userLogged : any = null;
  constructor(private service: PatientService,
    private router: Router,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute) {

    let role = localStorage.getItem('role');
    let roleJson = JSON.parse(role);
    this.isDoctor = (roleJson.id == 2);

    let user = localStorage.getItem('userLogged');
    let userJson = JSON.parse(user);
    if(userJson != null){
      this.userLogged = userJson;
    }

    this.form = this.fb.group({
      id: [null],
      price: [null],
      count: [null],
      discount: [null],
      subTotal: [null],
      search: [''],
    });

    this.dataSource = new MatTableDataSource(this.productList);
    this.form.get('search')?.valueChanges.subscribe((searchValue) => {
      this.applyFilter(searchValue);
    });

    this.dataSource.filterPredicate = (data, filter) => {
      return data.name.toLowerCase().includes(filter.toLowerCase());
    };
  }

  clearSearch() {
    this.searchValue = '';
    this.form.get('search').setValue('');
  }

  applyFilter(searchValue: string) {
    this.searchValue = searchValue;
    this.dataSource.filter = searchValue.trim().toLowerCase(); // Aplicar el filtro
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  listWarehouse: any[] = [];
  columns: any[] = [];
  actions: any[] = [];


  ngOnInit(): void {
    this.id = parseInt(this.activatedRoute.snapshot.params['id']);
    let query = "";
    query = (this.isDoctor) ? '?DoctorId=3' : '';
    if (this.id > 0) {
      this.getListHistoryClinic(this.id,query);
    }
  }

  printReport() {
    this.service.printReport(this.id, this.userLogged.id)
      .subscribe({
        next: (file: Blob) => {
          const fileURL = URL.createObjectURL(file);
          window.open(fileURL, '_blank');
        },
        error: (err) => {
          console.error('Error al generar el reporte', err);
        }
      });
  }

  onManageClinicalHistory(data: any){

  }

  getListHistoryClinic(id: number, queryString : string) {
    this.service.getListClinicHistoryById(id,queryString).subscribe((resp: any[]) => {
      this.listClinicalHistory = resp;
    })
  }

  equivalence(data: any) {
    this.router.navigate(['product/product/equivalence/' + data.id]);
  }


  createNew() {
    this.router.navigate(['options/store']);
  }
  addMassive() {
    this.router.navigate(['product/product/massive']);
  }

  update(data: any) {
    this.router.navigate(['options/store/' + data.id]);
  }

  overView(data: any) {
    // const dialogRef = this.dialog.open(OverviewProductComponent, {
    //   data: { id: data.id },
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   let tes = result;
    // });
  }

  senfilter(event: string) {

  }

  toggleFilter() {
    this.isFilterVisible = !this.isFilterVisible;
  }

  gestionaryDiasnostic(element: any) {
    this.router.navigate(['options/diasnostic/' + element.id]);
  }

  gestionaryTratament(element: any) {
    this.router.navigate(['options/tratament/' + element.id]);
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
        this.service.lowById(data?.id).subscribe((resp => {
          this.ngOnInit();
          Swal.fire(
            'Baja Exitosa!',
            'Su Almacen se dio de baja exitosamente.',
            'success'
          )
        }));

      }
    })
  }

}
