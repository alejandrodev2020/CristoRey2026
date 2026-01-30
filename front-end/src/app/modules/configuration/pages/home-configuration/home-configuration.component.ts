import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-configuration',
  templateUrl: './home-configuration.component.html',
  styleUrls: ['./home-configuration.component.scss']
})
export class HomeConfigurationComponent {

  listClassifier : any[];
  listGeneralAdjustments : any[];
  constructor(private router: Router){
    this.listClassifier = [
      {
        label: 'Categorias',
        path :'/category'
      },
      {
        label: 'Unidades de medida',
        path :'/unit-measurement'
      },

    ];
    this.listGeneralAdjustments = [
      {
        label: 'Whats App',
        path :'/whats-app'
      },
      {
        label: 'Metodos de pago',
        path :'/payment-method'
      },

    ];
  }


  redirect(path:string){
    this.router.navigate(['configuration'+ path]);
  }













}
