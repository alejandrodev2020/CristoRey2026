import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {map, Observable, startWith} from 'rxjs';
import { WarehouseService } from 'app/modules/warehouse/services/warehouse.service';
import { PettyCashService } from 'app/modules/petty-cash/services/petty-cash.service';
import { SecurityService } from 'app/modules/security/services/security.service';
import Swal from 'sweetalert2';
import { MAT_DATE_FORMATS } from '@angular/material/core';

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  },
};

@Component({
  selector: 'app-store-petty-cash',
  templateUrl: './store-petty-cash.component.html',
  styleUrls: ['./store-petty-cash.component.scss'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
  ]
})
export class StorePettyCashComponent implements OnInit {
  form: FormGroup;
  id: number | null = null;
  isCreate = false;
  myControl = new FormControl('');
  options: any[] = [];
  listWarehouse : any;
  isSaving: boolean = false;
  currentDate = new Date();
  filteredOptions: Observable<string[]>;
  prop = [
    "id",
    "name",
    "description",
    "code",
    "ubication",
  ];
  get formLabel() {
    return this.isCreate ? 'Regístro' : 'Actualización';
  }
  constructor(private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private serviceClient : SecurityService,
    private service : PettyCashService,
    private serviceWarehouse : WarehouseService) {
      this.form = this.fb.group({
        id: [null],
        pettyCashInit: [null,[Validators.required]],
        clientName: [null,[Validators.required,Validators.maxLength(50)]],
        userIdSeller: [null],
        amountInit: [null],
        warehouseId: [null,[Validators.required]],
      });
      this.filteredOptions = this.form.get('clientName').valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value || '')),
      );
     }

  ngOnInit(): void {
    this.isCreate = this.router.url.endsWith('/store');
    if (!this.isCreate) {
      this.id = parseInt(this.activatedRoute.snapshot.params['id']);
      this.serviceWarehouse.getById(this.id).subscribe((response: any) => {
         this.prop.forEach((key) => this.form.get(key)?.setValue(response[key]));
      });
    }
    else{
      // let fecha =  this.dateFormat.transform('10/07/2023');
      let date = new Date();
      // date.setUTCHours(0, 0, 0, 0); // Ajustar la hora a 00:00 UTC
      this.form.get('pettyCashInit').setValue(date);
    }



    this.serviceClient.getListUser().subscribe((ele : any)=>{
      this.options = ele;
    });
    this.serviceWarehouse.getAllWarehouse().subscribe((ele)=>{
        this.listWarehouse=ele;
    });
  }

  changeEmployee(){

    // this.form.get('clientName').setValue(' ');
  }

  private _filter(value: any): any[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.firstName.toLowerCase().includes(filterValue));
  }

  onBookChange(){

  }

  getPosts(data : any){

    this.form.get('clientName').setValue(data.firstName + ' '+ data.lastName);
    this.form.get('userIdSeller').setValue(data.id);
  }

  cancelStore(){
    this.router.navigate(['petty-cash/petty-cash']);
  }

  private isValidForm(): boolean{
    let values = this.form.controls;
    Object.keys(this.form.controls).forEach((field) => {
      const control = this.form.get(field);
      control?.markAsTouched({ onlySelf: true });
    });
    return this.form.valid;
  }

  save(): void {
    if (this.isValidForm()) { 
    this.isSaving = true
    let data: any = this.form.value;
    data.id = this.id;
    let date: Date = new Date(data.pettyCashInit);
    date.setHours(date.getHours() - 4); // Ajustar 4 horas menos para UTC-4
    data.pettyCashInit = date.toISOString();
    try {
      this.service.store(data).subscribe((resp) => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Su Caja se aperturo correctamente',
          showConfirmButton: false,
          timer: 1500
        })
        this.router.navigate(['petty-cash/petty-cash']);
      }, (error)=>{
         this.isSaving = false
         let exception : string = error.error;
         let exceptionMessage = exception.split("\n")[0].split(":")[1];
         Swal.fire({
          icon: 'error',
          title: 'Ocurrio un Problema...',
          text: exceptionMessage
        })
      });
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Ocurrio un Problema...',
        text: err
      })
    }
   }
  }

}
