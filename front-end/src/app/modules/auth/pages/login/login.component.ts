
import { Component, OnInit,  } from '@angular/core';
import { Validators, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FuseAlertType } from '@fuse/components/alert';
import { AuthService } from '../../services/auth.service';
import { environment } from 'environments/enviroments';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit
{
    alert: { type: FuseAlertType; message: string } = {
        type   : 'success',
        message: ''
    };

    form: FormGroup;
    userLogger : any = null;
    messageError : string = null;
    showAlert: boolean = false;
    nameStore = environment.nameStore;
    logoStore = environment.logo;
    constructor(
        private fb: FormBuilder,
        private router: Router,
        private service : AuthService
    )
    {
        this.form = this.fb.group({
            userName : [null,[Validators.required]],
            userKey : [null,[Validators.required]],
            isUser : [true],
            isDoctor : [false],
          });

    }

    control(key: string): FormControl {
        return this.form.controls[key] as FormControl;
    }

    ngOnInit(){
        localStorage.clear()
    }

    private isValidForm(): boolean{
        let values = this.form.controls;
        Object.keys(this.form.controls).forEach((field) => {
          const control = this.form.get(field);
          control?.markAsTouched({ onlySelf: true });
        });
        return this.form.valid;
    }

    setDataLocalStorage(data){
        let user = data;
        let role = data.authRole;
        let configuration = data.configuration;
        delete user.authRole;
        localStorage.setItem('userLogged',JSON.stringify(user));
        if(role != null && role != undefined){
          localStorage.setItem('role',JSON.stringify(role));
        }
        else{
            const doctor = {
              id: 2,
              name: 'Doctor',
              description: null,
              isActive: null
            };

            localStorage.setItem('role', JSON.stringify(doctor));
        }
        localStorage.setItem('configuration',JSON.stringify(configuration));
        localStorage.setItem('token', data.token);
        localStorage.setItem('viewAlert', "false");
        

    }
    addInput(){
    }
    signIn()
    {
        const data = this.form.value;
        if(this.isValidForm())
        {

          this.service.singIn(data).subscribe((resp)=>{           
            this.userLogger = resp;
            this.setDataLocalStorage(resp);
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Inicio de Session Exitoso!',
              showConfirmButton: false,
              timer: 1500
            })
            this.router.navigate(['home']);
          },
          (err)=>{
              this.showAlert= true;
              this.alert.type = 'error';
              this.alert.message = err?.error?.message + '!!';
          });
        }
    }
    toggleUserDoctor(type: 'user' | 'doctor'): void {
      if (type === 'user') {
        this.form.patchValue({
          isUser: true,
          isDoctor: false
        });
      } else {
        this.form.patchValue({
          isUser: false,
          isDoctor: true
        });
      }
    }
}
