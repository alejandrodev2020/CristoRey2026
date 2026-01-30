import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ApexOptions } from 'ng-apexcharts';
import { OverviewWarehouseComponent } from 'app/modules/warehouse/components/warehouse-aggregate/overview-warehouse/overview-warehouse.component';
import Swal from 'sweetalert2';
import { DateTime } from 'luxon';
import { PettyCashService } from '../../services/petty-cash.service';
import { PettyCash } from '../../models/petty-cash';
import { OverviewPettyCashComponent } from '../../components/petty-cash-aggregate/overview-petty-cash/overview-petty-cash.component';
import { MatSort } from '@angular/material/sort';
import { CloseAdminComponent } from '../../components/petty-cash-close/close-admin/close-admin.component';
import { ChartComponent, ApexAxisChartSeries, ApexChart, ApexXAxis, ApexTitleSubtitle } from "ng-apexcharts";
import { AddOperatorsComponent } from '../../components/add-operators/add-operators.component';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  colors: string[];
  title: ApexTitleSubtitle;
};


const ELEMENT_DATA: PettyCash[] = [];

@Component({
  selector: 'app-petty-cash-manage',
  templateUrl: './petty-cash-manage.component.html',
  styleUrls: ['./petty-cash-manage.component.scss']
})
export class PettyCashManageComponent implements AfterViewInit{
  public chartOptions: Partial<ChartOptions>;
  id : number| null = null;
  pettyCashObj:any;
  viewMovements : boolean = false;
  viewGraphics : boolean = true;
  viewOperators : boolean = false;
  amountTotalData:any[];
  saleDateData: any[];
  listOperators : any [] = [];
  displayedColumns: string[] = ['id','firstName', 'lastName','status','actions'];
  dataSource =  [];


     constructor(private activatedRoute: ActivatedRoute,
                 private service: PettyCashService,
                 public dialog: MatDialog,
                 private router: Router
                 )
     {
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

    ngAfterViewInit() {
      this.id = parseInt(this.activatedRoute.snapshot.params['id']);
      if(this.id !== null){
        this.setValuesDefaul(this.id);
      }
    }
  
   
    setValuesDefaul(id: number){
      this.service.getById(this.id).subscribe((resp)=>{
        this.pettyCashObj = resp;
      });
    }

    selectTab(event:any){
      this.viewGraphics = (event.index === 0);
      this.viewMovements = (event.index === 1);
      this.viewOperators = (event.index === 2);
      if(this.viewOperators){
          this.getListOperators();
      }
    }

    getListOperators(){
        this.service.getOperatorsByPettyCashId(this.id).subscribe((resp : [])=>{
          this.dataSource = resp;
        });
    }

    closePettyCash(){
      const dialogRef = this.dialog.open(CloseAdminComponent, {
        panelClass: 'custom-container',
        data: {id: this.id},
     });
  
     dialogRef.afterClosed().subscribe(result => {
          if(result){
            this.router.navigate(['petty-cash/petty-cash']);
          }
     });
    }


    updateChartData() {
      setTimeout(() => {
        this.service.getMovementsById(this.id).subscribe((resp: any[]) => {
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

    downloadPDFTermic(){
      this.service.getReportExcelPettyCashById(this.id).subscribe(
        (response: Blob) => {
            const fileURL = URL.createObjectURL(response);
            window.open(fileURL, '_blank');
            setTimeout(() => {
                URL.revokeObjectURL(fileURL);
            }, 100);
        },
        err => {
            console.error('Error al descargar el Excel:', err);
     });
    }
  
    exportPdf(){
      this.service.getReportPettyCashById(this.id).subscribe(
          (response: Blob) => {
              const fileURL = URL.createObjectURL(response);
              window.open(fileURL, '_blank');
              setTimeout(() => {
                  URL.revokeObjectURL(fileURL);
              }, 100);
          },
          err => {
              console.error('Error al descargar el PDF:', err);
      });
    }

    addCollaborators(){
      const dialogRef = this.dialog.open(AddOperatorsComponent, {
        panelClass: 'custom-container',
        data: {id: this.id},
     });
  
     dialogRef.afterClosed().subscribe(result => {
          if(result){
             this.getListOperators();
          }
     });
    }
  
  
  
  }
  
  export interface PeriodicElement {
    id: number;
    name: string;
    description: string;
    code: string;
    location: string;
    isActive: boolean;
  }
  