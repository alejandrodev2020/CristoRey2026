import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-security',
  templateUrl: './home-security.component.html',
  styleUrls: ['./home-security.component.scss']
})
export class HomeSecurityComponent {

  listClassifier : any[];
  constructor(private router: Router){
    this.listClassifier = [
      {
        label: 'Perfil',
        path :'/profile'
      },
      {
        label: 'Usuarios',
        path :'/user'
      },
    //   {
    //     label: 'Vendedores',
    //     path :'/unit-measurement'
    //   },
    //   {
    //     label: 'Contadores',
    //     path :'/method-payment'
    //   },
    ]
  }


  redirect(path:string){
    this.router.navigate(['security'+ path]);
  }


}



