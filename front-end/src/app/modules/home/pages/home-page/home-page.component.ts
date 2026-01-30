import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { roleCode } from 'app/modules/auth/models/plan-professional/role-code';
import { rolesAdmin } from 'app/modules/auth/models/plan-professional/admin-roles';
import { rolesSeller } from 'app/modules/auth/models/plan-professional/seller-roles';
import { rolesCounter } from 'app/modules/auth/models/plan-professional/counter-roles';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle
} from "ng-apexcharts";
import { PettyCashService } from 'app/modules/petty-cash/services/petty-cash.service';
import { MatDialog } from '@angular/material/dialog';
import { CloseSellerComponent } from 'app/modules/petty-cash/components/petty-cash-close/close-seller/close-seller.component';
import { environment } from 'environments/enviroments';
import { SaleService } from 'app/modules/sale/services/sale.service';
import { rolesAssistant } from 'app/modules/auth/models/plan-professional/assistant-roles';
import { WarehouseService } from 'app/modules/warehouse/services/warehouse.service';
import { AlertModalComponent } from 'app/shared/components/alert-modal/alert-modal.component';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  colors: string[];
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  listModules : any[] = [];
  modules : any[] = [];
  isAdmin : boolean = false;
  isSeller : boolean = false;
  pettyCashDefault : any;
  userSellerDefault : any ;
  lastDaySaleData : any[];
  amountTotalData:any[];
  saleDateData: any[];

  constructor(private router: Router,
              private service : PettyCashService,
              private saleService : SaleService,
              private warehouseSerive: WarehouseService,
              public dialog: MatDialog) {
    this.chartOptions = {
      series: [
        {
          name: "Venta semana 24",
          data: []
        }
      ],
      chart: {
        height: 350,
        type: "line"
      },
      title: {
        text: "Ventas - " + environment.nameStore,
        style: { color: "black" }
      },
      colors:['#A2C747'],
      xaxis: {
        categories: []
      }
    };

    this.updateChartData();
  }

  ngOnInit(): void {
    let user = localStorage.getItem('userLogged');
    let role = localStorage.getItem('role');
    let token = localStorage.getItem('token');
    let viewAlert = localStorage.getItem('viewAlert');
    
    let roleJson = JSON.parse(role);
    this.userSellerDefault = JSON.parse(user);
    if(user === null || role === null || token === null) {
      this.router.navigate(['/']);
    }

    switch (roleJson?.id) {
      case roleCode.admin:
        this.modules = rolesAdmin;
        this.isAdmin = true;
        this.isSeller = false;
        break;
      case roleCode.doctor:
        this.modules = rolesSeller;
        this.isAdmin = false;
        this.isSeller = true;
        this.setDataPettyCash();
        break;
      case roleCode.patient:
        this.modules = rolesCounter;
        this.isAdmin = false;
        this.isSeller = false;
        break;

      default:
        alert('Tu sessión ha caducado');
        this.router.navigate(['/']);
        break;
    }
    this.modules = this.modules.filter((ele) => {
      if (ele.link !== '/home' && ele.link !== '/auth') {
        return ele;
      }
    });

    if(viewAlert === "true"){
      this.viewAlertNotification();
    }
  }

  setDataPettyCash() {
    // this.service.getBySellerId(this.userSellerDefault?.id).subscribe((resp) => {
    //   this.pettyCashDefault = resp;
    // });
  }
  async setDataUserAssistant(){
    this.warehouseSerive.getWahouseIdByAssistant().subscribe((id : number)=>{
        localStorage.setItem('warehouseDefault',id.toString());
    });
  }

  changeModule(path: string) {
    this.router.navigate(['/' + path]);
  }

  closePettyCash() {
    const dialogRef = this.dialog.open(CloseSellerComponent, {
      panelClass: 'custom-container',
      maxHeight: '94vh',
      data: { id: this.pettyCashDefault },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.ngOnInit();
      }
    });
  }

  viewAlertNotification() {
    const dialogRef = this.dialog.open(AlertModalComponent, {
      panelClass: 'custom-container',
      maxHeight: '94vh',
      data: { id: this.pettyCashDefault },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.ngOnInit();
      }
    });
  }

  viewMovements() {
    const path = `petty-cash/petty-cash/${this.pettyCashDefault.id}/movement`;
    this.router.navigate([path]);
  }

  updateChartData() {
    // setTimeout(() => {
    //   this.saleService.getSaleLastDay().subscribe((resp: any[]) => {
    //     this.lastDaySaleData = resp;
    //     this.amountTotalData = resp.slice(0, 20).map(sale => sale.amountTotal);
    //     this.saleDateData = resp.slice(0, 20).map(sale => {
    //       const date = new Date(sale.saleDate);
    //       let hours = date.getHours();
    //       const minutes = date.getMinutes();
    //       const period = hours >= 12 ? 'PM' : 'AM';

    //       hours = hours % 12;
    //       hours = hours ? hours : 12;
    //       const timeString = `${hours}:${minutes < 10 ? '0' + minutes : minutes} ${period}`;
    //       return timeString;
    //     });

    //     this.amountTotalData.reverse();
    //     this.saleDateData.reverse();

    //     this.chartOptions.series = [
    //       {
    //         name: "Venta semana 24",
    //         data: this.amountTotalData
    //       }
    //     ];
    //     this.chartOptions.xaxis = {
    //       categories: this.saleDateData
    //     };
    //   });
    // }, 500);
  }
}
