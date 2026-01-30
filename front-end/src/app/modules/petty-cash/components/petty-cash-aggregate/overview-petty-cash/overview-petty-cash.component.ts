import { Component, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA,MatDialog } from '@angular/material/dialog';
import { PettyCashService } from 'app/modules/petty-cash/services/petty-cash.service';
import { SaleService } from 'app/modules/sale/services/sale.service';
import { ChartComponent, ApexAxisChartSeries, ApexChart, ApexXAxis, ApexTitleSubtitle } from "ng-apexcharts";
import { CloseAdminComponent } from '../../petty-cash-close/close-admin/close-admin.component';


export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  colors: string[];
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-overview-petty-cash',
  templateUrl: './overview-petty-cash.component.html',
  styleUrls: ['./overview-petty-cash.component.scss']
})
export class OverviewPettyCashComponent {

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  lastDaySaleData : any[];
  amountTotalData:any[];
  saleDateData: any[];
  pettyCashId:any;
  pettyCashObj:any;
  viewMovements : boolean = false;
  viewGraphics : boolean = true;
  constructor(private dialogRef: MatDialogRef<any>,
              @Inject(MAT_DIALOG_DATA) data,
              private service: PettyCashService,
              private saleService : SaleService,
              public dialog: MatDialog,
              private pettyCashServive: PettyCashService){
   this.pettyCashId= data;
    this.setValuesDefaul();
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
      colors:['#A2C747'],
      title: {
        text: "Movimientos de Caja" ,
        style: { color: "black" }
      },
      xaxis: {
        categories: []
      }
    };

    this.updateChartData();
  }

  updateChartData() {
    setTimeout(() => {
      this.pettyCashServive.getMovementsById(this.pettyCashId).subscribe((resp: any[]) => {
        this.amountTotalData = resp.slice(0, 20).map(sale => sale.amount);
        this.saleDateData = resp.slice(0, 20).map(sale => {
          const date = new Date(sale.movementDate);
          let hours = date.getHours();
          const minutes = date.getMinutes();
          const period = hours >= 12 ? 'PM' : 'AM';

          hours = hours % 12;
          hours = hours ? hours : 12;
          const timeString = `${hours}:${minutes < 10 ? '0' + minutes : minutes} ${period}`;
          return timeString;
        });

        this.amountTotalData.reverse();
        this.saleDateData.reverse();

        this.chartOptions.series = [
          {
            name: "Movimiento",
            data: this.amountTotalData
          }
        ];
        this.chartOptions.xaxis = {
          categories: this.saleDateData
        };
      });
    }, 500);
  }

  setValuesDefaul(){
    this.service.getById(this.pettyCashId).subscribe((resp)=>{
      this.pettyCashObj = resp;
    });
  }

  selectTab(event:any){
    this.viewMovements = (event.index === 1);
    this.viewGraphics = (event.index === 0);
  }

  setGraphics(){
    this.updateChartData();
  }

  close(){
    this.dialogRef.close(false);
  }

  closePettyCash(){
    const dialogRef = this.dialog.open(CloseAdminComponent, {
      panelClass: 'custom-container',
      data: {id: this.pettyCashId},
   });

   dialogRef.afterClosed().subscribe(result => {
        if(result){
          this.dialogRef.close(true);
        }
   });


  }


}
