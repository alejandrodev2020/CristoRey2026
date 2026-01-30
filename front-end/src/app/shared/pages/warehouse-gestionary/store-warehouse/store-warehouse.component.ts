import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Warehouse } from 'app/modules/warehouse/models/warehouse';
import { WarehouseService } from 'app/modules/warehouse/services/warehouse.service';

@Component({
  selector: 'app-store-warehouse',
  templateUrl: './store-warehouse.component.html',
  styleUrls: ['./store-warehouse.component.css']
})
export class StoreWarehouseComponent implements OnInit {
  form: FormGroup;
  id: number | null = null;
  isCreate = false;
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
    private service : WarehouseService) {
      this.form = this.fb.group({
        id: [null, [Validators.required, Validators.minLength(3)]],
        name: [null, [Validators.required, Validators.minLength(3)]],
        description: [null, [Validators.required, Validators.minLength(3)]],
        code: [null, [Validators.required, Validators.minLength(3)]],
        ubication: [null, [Validators.required, Validators.minLength(3)]],
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




  save(): void {
    if (!this.form.valid) {
      return alert('datos invalidos');
    }

    let data: Warehouse = this.form.value;
    data.id = this.id;
    this.service.store(data).subscribe((resp) => {
      alert('success');
      this.router.navigate(['warehouse/warehouse']);
    });
  }

}
