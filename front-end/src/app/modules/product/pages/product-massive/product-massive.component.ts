import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-product-massive',
  templateUrl: './product-massive.component.html',
  styleUrls: ['./product-massive.component.scss']
})
export class ProductMassiveComponent {



    form: FormGroup;
    existFile : boolean = false;
    fileName : string = "No se encuentra ningun archivo.";

    constructor( private fb: FormBuilder,
                 private service : ProductService,
                 private router: Router){
        this.form = this.fb.group({
            file: [null],
          });
    }

    dowloadTemplate(){
        const link = document.createElement('a'); // Crea un elemento <a>
        link.href = 'assets/resources/template_product.xlsx'; // Especifica la ruta del archivo dentro de la carpeta assets
        link.download = 'template_product.xlsx'; // Nombre del archivo que se descargará
        link.click(); // Dispara el clic en el enlace para iniciar la descarga
    }

    upload(event: Event): void {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files.length > 0) {
          const file = input.files[0];
          this.fileName = file.name;
          this.form.patchValue({ file: file }); // Asigna el archivo al control `file`
          this.form.get('file')?.updateValueAndValidity(); // Actualiza el valor y validez del control
          this.existFile = true;
        }
      }
      removeFile(){
        this.form.patchValue({ file: null }); // Establece el valor del archivo en null
        this.form.get('file')?.updateValueAndValidity(); // Actualiza la validez del control
        this.fileName = 'No se encuentra ningun archivo.'; // Limpia el nombre del archivo
        this.existFile = false; // Indica que no hay archivo cargado

      }

      sendMassiveData(){
        if (this.form.invalid) {
            console.warn('Formulario inválido. Completa los campos requeridos.');
            return;
          }

          // Crear el objeto `FormData` y agregar los valores del formulario
          const formData = new FormData();

          // Añadir cada campo del formulario a `FormData`
          Object.keys(this.form.controls).forEach(key => {
            formData.append(key, this.form.get(key)?.value);
          });

          // Realizar la solicitud al servicio con `FormData`
          this.service.storeProductMassive(formData).subscribe((resp)=>{
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Su carga masiva se realizo con exito!',
                showConfirmButton: false,
                timer: 1500
              });
              this.router.navigate(['product']);
          });
      }
}
