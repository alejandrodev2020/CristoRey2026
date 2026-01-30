import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Warehouse } from '../../../models/warehouse';
import { WarehouseService } from '../../../services/warehouse.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-store-warehouse',
  templateUrl: './store-warehouse.component.html',
  styleUrls: ['./store-warehouse.component.css']
})
export class StoreWarehouseComponent implements OnInit {
  form: FormGroup;
  id: number | null = null;
  isCreate = false;
  isSaving: boolean = false;
  listType = [{
    id: 1,
    name: 'Fisico'
  },
  {
    id:2,
    name:'Movil'
  }
]
  prop = [
    "id",
    "name",
    "description",
    "code",
    "location",
    "warehouseTypeId",
  ];
  get formLabel() {
    return this.isCreate ? 'Regístro' : 'Actualización';
  }
  constructor(private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private service : WarehouseService) {
      this.form = this.fb.group({
        id: [null],
        name: [null, [Validators.required, Validators.minLength(3)]],
        description: [null, [Validators.required, Validators.minLength(3)]],
        code: [null, [Validators.required, Validators.minLength(3)]],
        location: [null],
        warehouseTypeId: [1,null],
      });
     }

  ngOnInit(): void {
    this.isCreate = this.router.url.endsWith('/store');
    if (!this.isCreate) {
      this.id = parseInt(this.activatedRoute.snapshot.params['id']);
      this.service.getById(this.id).subscribe((response: any) => {
         this.prop.forEach((key) => this.form.get(key)?.setValue(response[key]));
      });
    }
  }
  control(key: string): FormControl {
    return this.form.controls[key] as FormControl;
  }
  save(): void {
    let data: Warehouse = this.form.value;
    data.id = this.id;
    let messaje = (this.isCreate) ? 'Registro' : 'Actualización';
    if(this.isValidForm()){
        this.isSaving = true;
        this.service.store(data).subscribe((resp) => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Su '+ messaje + 'se realizo con exito!',
            showConfirmButton: false,
            timer: 1500
          });
          localStorage.removeItem('warehouseDefault');
          this.router.navigate(['warehouse/warehouse']);
        });
    }
  }
  private isValidForm(): boolean{
    let values = this.form.controls;
    Object.keys(this.form.controls).forEach((field) => {
      const control = this.form.get(field);
      control?.markAsTouched({ onlySelf: true });
    });
    return this.form.valid;
  }
  cancelStore(){
    this.router.navigate(['warehouse/warehouse']);
  }

}
