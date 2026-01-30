import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { FormBuilder, FormGroup, isFormRecord } from '@angular/forms';
import { SecurityService } from '../../services/security.service';
import Swal from 'sweetalert2';
import { imageUser } from 'app/shared/models/image-user-default.const';


@Component({
    selector       : 'settings-account',
    templateUrl    : './account.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsAccountComponent implements OnInit
{
    isEdit : boolean = false;
    authUserId : number = 0;
    imageSource = this.sanitizer.bypassSecurityTrustResourceUrl(imageUser);
    @ViewChild('aForm2') aForm2: ElementRef;
    form: FormGroup;
    /**
     * Constructor
     */
    constructor(
        private _formBuilder: UntypedFormBuilder,
        private sanitizer: DomSanitizer,
        private fb: FormBuilder,
        private service : SecurityService
    )
    {
        this.form = this.fb.group({
            id : [null],
            avatar: [null],
            firstName : [null,[Validators.required]],
            lastName : [null],
            phone : [null],
            ci : [null],
            userName : [null],
            nit : [null],
            about : [null],
            email : [null],
            phoneWork : [null],
            country : [null],
            language : [null],
          });
          const userLogged = localStorage.getItem('userLogged');
          let obj  = JSON.parse(userLogged);
          if(obj !== null){
              this.authUserId = obj?.id;
              this.setData(obj?.id);
          }
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Create the form
        this.form.get('firstName').disable();
        this.form.get('lastName').disable();
        this.form.get('phone').disable();
        this.form.get('ci').disable();
        this.form.get('nit').disable();
        this.form.get('userName').disable();
        this.form.get('about').disable();

        
        this.form.get('phoneWork').disable();
        this.form.get('email').disable();
        this.form.get('country').disable();
        this.form.get('language').disable();
    }


    setData(id : number){
        this.service.getUserById(id).subscribe((resp: any)=>{
            this.form.get('firstName').setValue(resp?.firstName);
            this.form.get('lastName').setValue(resp?.lastName);
            this.form.get('phone').setValue(resp?.phone);
            this.form.get('ci').setValue(resp?.ci);
            this.form.get('nit').setValue(resp?.nit);
            this.form.get('userName').setValue(resp?.userName);
            this.form.get('about').setValue(resp?.about);
            this.imageSource = (resp.avatar)? 'data:image/png;base64,'+resp?.avatar : imageUser;
            this.form.get('avatar').setValue(this.imageSource);
        })
    }

    updateProfile(){
        this.isEdit = true;
        this.form.get('firstName').enable();
        this.form.get('lastName').enable();
        this.form.get('phone').enable();
        this.form.get('ci').enable();
        this.form.get('nit').enable();
        this.form.get('userName').enable();
        this.form.get('about').enable();

        
        this.form.get('phoneWork').enable();
        this.form.get('email').enable();
        this.form.get('country').enable();
        this.form.get('language').enable();
    }

    cancelUpdate(){
        this.isEdit = false;
        this.form.get('firstName').disable();
        this.form.get('lastName').disable();
        this.form.get('phone').disable();
        this.form.get('ci').disable();
        this.form.get('nit').disable();
        this.form.get('userName').disable();
        this.form.get('about').disable();

        
        this.form.get('phoneWork').disable();
        this.form.get('email').disable();
        this.form.get('country').disable();
        this.form.get('language').disable();
    }


    uploadAvatar(fileList: FileList): void
    {

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
        const ele = this.aForm2.nativeElement['firstName'];    
        ele.focus();
      }

    /**
     * Remove the avatar
     */
     removeAvatar(): void
     {
        this.imageSource = this.sanitizer.bypassSecurityTrustResourceUrl(imageUser);
        this.form.get('avatar').setValue(null);
     }


    /**
     * Upload the avatar
     */
     UpdateUser(){
        let data = this.form.value;
        this.service.updateUser(this.authUserId, data).subscribe((resp)=>{
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Su actualización se realizo con exito!',
                showConfirmButton: false,
                timer: 1500
            });
        });
    
    }

}
