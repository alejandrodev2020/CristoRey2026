import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { image } from 'app/modules/product/models/image-default.const';
import Swal from 'sweetalert2';
import { Provider } from 'app/modules/provider/models/provider';
import { SecurityService } from 'app/modules/security/services/security.service';

@Component({
  selector: 'app-store-user',
  templateUrl: './store-user.component.html',
  styleUrls: ['./store-user.component.scss']
})
export class StoreUserComponent implements OnInit {
  form: FormGroup;
  dissableBotton:boolean = false;
  id: number | null = null;
  imageSource = this.sanitizer.bypassSecurityTrustResourceUrl(image);
  isCreate = false;
  prop = [
    "id",
    "firstName",
    "lastName",
    "phone",
    "ci",
    "avatar",
    "userName",
    "userKey",
    "isAdmin",
    "authRoleId"
  ];
  get formLabel() {
    return this.isCreate ? 'Regístro' : 'Actualización';
  }
  constructor(private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private sanitizer: DomSanitizer,
    private router: Router,
    private service : SecurityService) {
      this.form = this.fb.group({
        id: [null],
        firstName: [null,[Validators.required, Validators.minLength(3)]],
        lastName: [null],
        phone: [null],
        ci: [null],
        avatar: [null],
        authRoleId : [1,[Validators.required]],
        userName: [null,[Validators.required]],
        userKey: [null,[Validators.required,Validators.maxLength(30)]],
        isAdmin: [true,[Validators.required]]
      });
     }

  ngOnInit(): void {
    this.isCreate = this.router.url.endsWith('/store');
    if (!this.isCreate) {
      this.isCreate=false;
      this.id = parseInt(this.activatedRoute.snapshot.params['id']);
      this.service.getById(this.id).subscribe((response: any) => {
        this.prop.forEach((key) => this.form.get(key)?.setValue(response[key]));
        this.form.get('authRoleId').setValue(response?.authRole?.id);
         if(response.avatar!== null){
          let path = 'data:image/png;base64,'+response.avatar;
          this.setPhoto(path);
         }
      });
    }
    else{
      this.isCreate=true;
    }
  }



  async uploadAvatar(fileList: FileList)
  {
      if ( !fileList.length )
      {
          return;
      }

      const allowedTypes = ['image/jpeg', 'image/png'];
      const file = fileList[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.setPhoto(reader.result);
      };
  }


  async setPhoto(data : any){
    this.imageSource = this.sanitizer.bypassSecurityTrustResourceUrl(data);
    this.form.get('avatar').setValue(data);
  }

  removeAvatar(): void
  {
    this.imageSource = this.sanitizer.bypassSecurityTrustResourceUrl(image);
    this.form.get('avatar').setValue(null);
  }

  cancelStore(){
    this.router.navigate(['security/user']);
  }

  private isValidForm(): boolean{
    let values = this.form.controls;
    Object.keys(this.form.controls).forEach((field) => {
      const control = this.form.get(field);
      control?.markAsTouched({ onlySelf: true });
    });
    return this.form.valid;
}

control(key: string): FormControl {
  return this.form.controls[key] as FormControl;
}

  save(): void {
    let data: Provider = this.form.value;
    data.id = this.id;
    let messaje = (this.isCreate) ? 'Registro' : 'Actualización';
    if(this.isValidForm()){
        this.dissableBotton = true;
        this.service.store(data).subscribe((resp) => {
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Su '+ messaje + 'se realizo con exito!',
              showConfirmButton: false,
              timer: 1500
            })
            this.router.navigate(['security/user']);
          });
        }
    }






}
