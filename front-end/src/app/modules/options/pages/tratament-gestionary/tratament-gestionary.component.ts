import { AfterViewInit, ChangeDetectorRef, Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { OverviewWarehouseComponent } from 'app/modules/warehouse/components/warehouse-aggregate/overview-warehouse/overview-warehouse.component';
import Swal from 'sweetalert2';
// import { Product } from '../../models/product';
// import { ProductService } from '../../services/product.service';
// import { OverviewProductComponent } from '../../components/product-aggregate/overview-product/overview-product.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Product } from 'app/modules/warehouse/models/warehouseProduct';
import { ProductService } from 'app/modules/product/services/product.service';
import { OptionsService } from '../../services/options.service';


const ELEMENT_DATA: Product[] = [];

@Component({
  selector: 'app-tratament-gestionary',
  templateUrl: './tratament-gestionary.component.html',
  styleUrls: ['./tratament-gestionary.component.scss']
})
export class TratamentGestionaryComponent implements AfterViewInit {
  form: FormGroup;
  displayedColumns: string[] = ['id', 'photo','name', 'description', 'code', 'status', 'acciones'];
  dataSource = new MatTableDataSource<Product>(ELEMENT_DATA);
  isFilterVisible: boolean = false;
  productList: [] = [];
  isRecording = false;
  transcribedText = '';
  label = '';
  searchValue: string = '';
  private recognition: SpeechRecognition | null = null;
  @ViewChild(MatPaginator) paginator: MatPaginator
  id : number = 0;



  constructor(private service: OptionsService,
    private router: Router,
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private ngZone: NgZone,
    private changeDetector: ChangeDetectorRef) {
    this.id = parseInt(this.activatedRoute.snapshot.params['id']);

    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognitionAPI) {
      this.recognition = new SpeechRecognitionAPI();
      this.recognition.lang = 'es-ES'; // Ajusta el idioma según sea necesario
      this.recognition.interimResults = false;

      this.recognition.onresult = (event) => {
        const result = event.results[event.resultIndex][0].transcript;

        this.ngZone.run(() => {
          this.transcribedText += result; // Agrega el resultado al texto transcrito
          this.applyFilter(this.transcribedText);
          this.form.get('search').setValue(this.transcribedText);

        });
        this.changeDetector.detectChanges(); // Fuerza la detección de cambios
      };

      this.recognition.onend = () => {
        this.ngZone.run(() => {
          this.isRecording = false;
        });
        this.changeDetector.detectChanges(); // Fuerza la detección de cambios
      };
    } else {
      console.error('SpeechRecognition not supported in this browser.');
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


  startRecording() {
    if (this.recognition) {
      this.ngZone.run(() => {
        this.isRecording = true;
        this.transcribedText = '';
      });
      this.recognition.start();
      this.changeDetector.detectChanges();
    }
  }

  stopRecording() {
    if (this.recognition) {
      this.ngZone.run(() => {
        this.isRecording = false;
      });

      setTimeout(() => {
        this.recognition.stop();
        this.changeDetector.detectChanges();
      }, 1000);
    }
  }

  ngOnInit(): void {
    this.service.getListTratamientByOptionId(this.id).subscribe((ele: any) => {

      this.productList = ele.map((item: any) => {
        item.photo = item.picture
          ? `data:image/png;base64,${item.picture}`
          : "https://img.freepik.com/psd-gratis/3d-ilustracion-persona-gafas-sol_23-2149436188.jpg?size=338&ext=jpg&ga=GA1.1.1788068356.1716681600&semt=ais_user";
        return item;
      });

      this.dataSource = new MatTableDataSource(this.productList);

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

  equivalence(data: any) {
    this.router.navigate(['product/product/equivalence/' + data.id]);
  }


  createNew() {
    this.router.navigate([`options/${this.id}/tratament/store`]);
  }
  addMassive() {
    this.router.navigate(['product/product/massive']);
  }

  update(data: any) {
    this.router.navigate([`options/${this.id}/tratament/store/${data.id}`]);
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

  gestionary(element: any){
    this.router.navigate(['options/diasnostic/' + element.id]);
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
