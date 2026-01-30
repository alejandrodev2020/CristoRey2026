import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';

import { Router } from '@angular/router';
import { Configuration } from 'app/modules/configuration/models/configuration.model';
import { ConfigurationService } from 'app/modules/configuration/services/configuration.service';
import { AuthUserConfiguration } from 'app/modules/auth/models/authUser.configuration.model';

@Component({
  selector: 'app-user-configuration',
  templateUrl: './user-configuration.component.html',
  styleUrls: ['./user-configuration.component.scss']
})
export class UserConfigurationComponent {

  imageqr: string | null = null;
  form: FormGroup;
  sessionActive: boolean = false;
  imageQrBanner: string | null = null;
  configuration: Configuration;
  authUserConfiguration : AuthUserConfiguration = {
    id:0,
    authUserId:0,
    allItemsSale:false,
    countItemsSale:0,
    printNoteSale:false,
    allItemsShopping:false,
    countItemsShopping:0,
    printNoteShopping:false
  };


  constructor(private service: ConfigurationService,
    private router: Router,
    private fb: FormBuilder) {
    this.form = this.fb.group({
      allItemsSale: [false],
      countItemsSale: [0],
      printNoteSale: [false],
      allItemsShopping: [false],
      countItemsShopping: [0],
      printNoteShopping: [false],
    });

    const configuration = localStorage.getItem('userLogged');
    this.configuration = JSON.parse(configuration);
    if (configuration) {
       this.updateData(this.configuration.authUserConfiguration)
    }
  }


  cancel() {
    this.router.navigate(['configuration']);
  }

  moveToLogin() {
    this.router.navigate(['auth/login']);
  }

  updateData(data: AuthUserConfiguration) {
     this.form.get('allItemsSale').setValue(data?.allItemsSale);
     this.form.get('countItemsSale').setValue(data?.countItemsSale);
     this.form.get('printNoteSale').setValue(data?.printNoteSale);
     this.form.get('allItemsShopping').setValue(data?.allItemsShopping);
     this.form.get('countItemsShopping').setValue(data?.countItemsShopping);
     this.form.get('printNoteShopping').setValue(data?.printNoteShopping);

    this.authUserConfiguration.id = data?.id;
    this.authUserConfiguration.authUserId = data?.authUserId;
    this.authUserConfiguration.allItemsSale = data?.allItemsSale;
    this.authUserConfiguration.countItemsSale = data?.countItemsSale;
    this.authUserConfiguration.printNoteSale = data?.printNoteSale;
    this.authUserConfiguration.allItemsShopping = data?.allItemsShopping;
    this.authUserConfiguration.countItemsShopping = data?.countItemsShopping;
    this.authUserConfiguration.printNoteShopping = data?.printNoteShopping;
  }

  save(): void {
    if (!this.form.valid) {
      return alert('datos invalidos');
    }
    let data: any = this.form.value;
    try {


      Swal.fire({
        title: "Seguro que quieres actualizar?",
        text: "Recuerda que al actualizar, tendras que iniciar sessión nuevamente!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, actualizar!",
        cancelButtonText:"Cancelar"
      }).then((result) => {
        if (result.isConfirmed) {
          this.service.updateAuthUserConfiguration(data).subscribe((resp: any) => {
            localStorage.clear();
            this.moveToLogin();
            Swal.fire({
                title: "Actualizado!",
                text: "Tu configuración se actualizo, correctamente",
                icon: "success"
              });
            }, (error) => {
            let exception: string = error.error;
            let exceptionMessage = exception.split("\n")[0].split(":")[1];
            Swal.fire({
              icon: 'error',
              title: 'Ocurrio un Problema...',
              text: exceptionMessage
            })
          });
        }
      });
    } 
    catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Ocurrio un Problema...',
        text: err
      })
    }
  }


}
