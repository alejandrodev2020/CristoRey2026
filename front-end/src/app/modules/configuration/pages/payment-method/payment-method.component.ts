import { Component } from '@angular/core';
import { ConfigurationService } from '../../services/configuration.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { Configuration } from '../../models/configuration.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.scss']
})
export class PaymentMethodComponent {

  imageqr: string | null = null;
  form: FormGroup;
  sessionActive: boolean = false;
  imageQrBanner: string | null = null;
  configuration: Configuration;

  constructor(private service: ConfigurationService,
    private router: Router,
    private fb: FormBuilder) {
    this.form = this.fb.group({
      paymentCash: [false],
      paymentQr: [true],
      paymentCard: [false],
    });

    const configuration = localStorage.getItem('configuration');
    this.configuration = JSON.parse(configuration);
    if (configuration) {
      this.updateData(this.configuration.paymentTypeCash, this.configuration.paymentTypeQr, this.configuration.paymentTypeCard)
    }
  }


  cancel() {
    this.router.navigate(['configuration']);
  }

  updateData(paymentCash, paymentQr, paymentCard) {
    this.form.get('paymentCash').setValue(paymentCash);
    this.form.get('paymentQr').setValue(paymentQr);
    this.form.get('paymentCard').setValue(paymentCard);
    this.configuration.paymentTypeCash = paymentCash;
    this.configuration.paymentTypeQr = paymentQr;
    this.configuration.paymentTypeCard = paymentCard;
  }

  save(): void {
    if (!this.form.valid) {
      return alert('datos invalidos');
    }

    let data: any = this.form.value;
    try {
      this.service.updatePaymentMethod(data).subscribe((resp: any) => {
        this.configuration.paymentTypeCash = data.paymentCash;
        this.configuration.paymentTypeQr = data.paymentQr;
        this.configuration.paymentTypeCard = data.paymentCard;
        localStorage.removeItem('configuration');
        localStorage.setItem('configuration', JSON.stringify(this.configuration));
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Se actualizo los metodos de pago correctamente',
          showConfirmButton: false,
          timer: 1500
        });
        this.cancel();

      }, (error) => {
        let exception: string = error.error;
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
