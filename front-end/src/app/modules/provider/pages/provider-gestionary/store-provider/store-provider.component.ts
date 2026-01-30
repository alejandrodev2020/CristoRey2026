import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { image } from 'app/modules/product/models/image-default.const';
import Swal from 'sweetalert2';
import { Provider } from 'app/modules/provider/models/provider';
import { ProviderService } from 'app/modules/provider/services/provider.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { imageUserDefault } from 'app/shared/models/image-user';

@Component({
  selector: 'app-store-provider',
  templateUrl: './store-provider.component.html',
  styleUrls: ['./store-provider.component.scss']
})
export class StoreProviderComponent implements OnInit {
  form: FormGroup;
  id: number | null = null;
  isSaving: boolean = false;
  imageSource = this.sanitizer.bypassSecurityTrustResourceUrl(imageUserDefault);
  isCreate = false;
  prop = [
    "id",
    "firstName",
    "lastName",
    "phone",
    "ci",
    "nit",
    "photo",
    "businessName",
    "isEmergency"
  ];
  isModal: any = false;  // Para detectar si se abre como modal

  get formLabel() {
    return this.isCreate ? 'Registro' : 'Actualización';
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private sanitizer: DomSanitizer,
    private router: Router,
    private service: ProviderService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,  // Inyección opcional de datos para modal
    @Optional() private dialogRef: MatDialogRef<any>         // Referencia opcional al modal
  ) {
    this.isModal = data;
    this.form = this.fb.group({
      id: [null],
      firstName: [null, [Validators.required, Validators.minLength(3)]],
      lastName: [null],
      phone: [null],
      ci: [null],
      nit: [null],
      photo: [null],
      businessName: [null],
      isEmergency:[false]
    });
  }

  ngOnInit(): void {
    this.isCreate = this.router.url.endsWith('/store');
    if (!this.isCreate && !this.isModal) {
      this.id = parseInt(this.activatedRoute.snapshot.params['id']);
      this.service.getById(this.id).subscribe((response: any) => {
        this.prop.forEach((key) => this.form.get(key)?.setValue(response[key]));
        if (response.photo !== null) {
          let path = 'data:image/png;base64,' + response.photo;
          this.setPhoto(path);
        }
      });
    } else if (this.isModal && this.data?.id) {
      // Caso cuando se abre como modal y recibe datos
      this.id = this.data.id;
      this.service.getById(this.id).subscribe((response: any) => {
        this.prop.forEach((key) => this.form.get(key)?.setValue(response[key]));
        if (response.photo !== null) {
          let path = 'data:image/png;base64,' + response.photo;
          this.setPhoto(path);
        }
      });
    } else {
      this.isCreate = true;
    }
  }

  async uploadAvatar(fileList: FileList) {
    if (!fileList.length) {
      return;
    }

    const file = fileList[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.setPhoto(reader.result);
    };
  }

  async setPhoto(data: any) {
    this.imageSource = this.sanitizer.bypassSecurityTrustResourceUrl(data);
    this.form.get('photo').setValue(data);
  }

  removeAvatar(): void {
    this.imageSource = this.sanitizer.bypassSecurityTrustResourceUrl(image);
    this.form.get('photo').setValue(null);
  }

  closeModal(data: any) {
    if (this.dialogRef) {
      this.dialogRef.close(data);
    }
  }

  cancelStore(){    
    if(this.isModal){
      this.closeModal(null);
    }else{
      this.router.navigate(['provider/provider']);
    }
  }

  control(key: string): FormControl {
    return this.form.controls[key] as FormControl;
}
  save(): void {
    let messaje = this.isCreate ? 'Registro' : 'Actualización';
    if(this.isValidForm()){
      let data: Provider = this.form.value;
      data.id = this.id;
      this.isSaving = true;
      this.service.store(data).subscribe((resp) => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Su ' + messaje + ' se realizo con exito!',
          showConfirmButton: false,
          timer: 1500
        });
        if (this.isModal) {
          this.closeModal(resp);
        } else {
          this.router.navigate(['provider/provider']);
        }
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
}
