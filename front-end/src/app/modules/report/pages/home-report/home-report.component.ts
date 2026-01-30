import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-report',
  templateUrl: './home-report.component.html',
  styleUrls: ['./home-report.component.scss']
})
export class HomeReportComponent  {

  listClassifier : any[];
  constructor(private router: Router){
    this.listClassifier = [
      {
        label: 'Aceptadas',
        path :'/acept'
      },
      // {
      //   label: 'Rechazadas',
      //   path :'/shopping'
      // },
    ]
  }


  redirect(path:string){
    this.router.navigate(['report'+ path]);
  }













}
