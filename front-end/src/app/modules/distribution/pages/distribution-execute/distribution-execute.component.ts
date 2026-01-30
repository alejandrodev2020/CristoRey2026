import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import {  ApexAxisChartSeries, ApexChart, ApexXAxis, ApexTitleSubtitle } from "ng-apexcharts";
import { PettyCashService } from 'app/modules/petty-cash/services/petty-cash.service';
import { CloseAdminComponent } from 'app/modules/petty-cash/components/petty-cash-close/close-admin/close-admin.component';
import { MatTabGroup } from '@angular/material/tabs';
import { Product } from 'app/modules/warehouse/models/warehouseProduct';
import { DistributionService } from '../../services/distribution.service';
import { Distribution } from '../../models/distributionModel';
import { OrverviewOrderComponent } from '../../components/orverview-order/orverview-order.component';
import { GoogleMap } from '@angular/google-maps';
import { GeolocationService } from 'app/modules/client/services/geolocation.service';


export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  colors: string[];
  title: ApexTitleSubtitle;
};


const ELEMENT_DATA: Product[] = [];

@Component({
  selector: 'app-distribution-execute',
  templateUrl: './distribution-execute.component.html',
  styleUrls: ['./distribution-execute.component.css']
})
export class DistributionExecuteComponent implements AfterViewInit{
  public chartOptions: Partial<ChartOptions>;

    @ViewChild(GoogleMap) googleMap!: GoogleMap;
  
    // Coordenadas y zoom del mapa
    center: google.maps.LatLngLiteral = { lat: -17.851511, lng: -63.099127 };
    zoom = 17;
  
    markers: google.maps.LatLngLiteral[] = [];  // Lista de marcadores
  

  @ViewChild('tabGroup') tabGroup: MatTabGroup;
  listOptionsPage: number[] = [5, 10, 20, 50, 100];
  page = 0;
  limit = 10;
  totalLength: number = 400;
  queryFilter = '';
  data: any[] = [];
  objComplete = null;
  id : number| null = null;
  pettyCashObj:any;
  viewMovements : boolean = false;
  viewGraphics : boolean = true;
  viewOperators : boolean = false;
  viewRoute : boolean = false;
  amountTotalData:any[];
  saleDateData: any[];
  listOperators : any [] = [];
  listDetailOrder: any[] = [];

  displayedColumns: string[] = ['order',  'client', 'saleDate', 'amountTotal','isActive', 'acciones'];
  dataSource = new MatTableDataSource<any>(ELEMENT_DATA);


     constructor(private activatedRoute: ActivatedRoute,
                 private service: PettyCashService,
                 private serviceDistribution: DistributionService,
                 public dialog: MatDialog,
                 private geoService: GeolocationService,
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
  
  onMarkerClick(marker: google.maps.LatLngLiteral) {
    console.log('Clic en marcador:', marker);
    alert(`Clic en marcador en lat: ${marker.lat}, lng: ${marker.lng}`);
  }
   
    setValuesDefaul(id: number){


      this.serviceDistribution.getDistributionById(this.id).subscribe((resp : Distribution)=>{
        this.pettyCashObj = resp.pettyCash;
      });

      this.serviceDistribution.getListDetailOrderDistributionById(this.id).subscribe((resp: any)=>{
        this.listDetailOrder = resp.listDetail;
      })


    }

    selectTab(event:any){
      this.viewGraphics = (event.index === 0);
      this.viewMovements = (event.index === 1);
      this.viewOperators = (event.index === 2);
      this.viewRoute = (event.index === 3);
      if(this.viewOperators){
          this.getSale(this.CurrentPaginator);
      }
      if(this.viewRoute){
        this.loadCoordsMap();
        this.getRoute();
      }
    }


    get CurrentPaginator() {
      return `?Limit=${this.limit}&Page=${this.page}`;
    }

    goOrders() {
      this.tabGroup.selectedIndex = 1;
    }
    goSales() {
      this.tabGroup.selectedIndex = 2; 
    }

    getRoute() {
      this.serviceDistribution.getDistributionRouteById(this.id)
        .subscribe((response: any[]) => {
          this.markers = response.map((item) => ({
            lat: item.latitude,
            lng: item.longitude
          }));
        });
    }


    async loadCoordsMap() {
      this.geoService.getCurrentLocation()
        .then(position => {
          this.center = {lat: position.coords.latitude, lng: position.coords.longitude };
        })
        .catch(error => {
          console.error('Error al obtener ubicación:', error);
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
        this.service.getMovementsById(this.pettyCashObj?.id).subscribe((resp: any[]) => {
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

    goRaiseOrder(){
      this.router.navigate([`distribution/distribution/raise-order/${this.id}`]);
    }

    pageEvent(event) {
      this.limit = event.pageSize;
      this.page = event.pageIndex;
      this.getSale(this.CurrentPaginator + this.queryFilter);
  }

    overView(data: any) {
        const dialogRef = this.dialog.open(OrverviewOrderComponent, {
            panelClass: 'custom-container',
            maxWidth: '90vw',
            width:'450px',
            maxHeight:'85vh',
            data: { id: data.id },
        });

        dialogRef.afterClosed().subscribe(result => {
            let tes = result;
        });
    }
  
    getSale(queryString: string) {
      // if (this.isAdmin) {
          this.serviceDistribution.getListOrders(this.id,queryString).subscribe((ele: any) => {
              this.dataSource.data = ele.listSale;
              this.data = ele.listSale;
              this.objComplete = ele;
              this.totalLength = ele.total;
          });
  //     }
  //     else {
  //         this.service.getAllSaleByWarehouseAndPettyCash(this.warehouseId, this.PettyCashId, queryString).subscribe((ele: any) => {
  //             this.dataSource.data = ele.listSale;
  //             this.data = ele.listSale;
  //             this.objComplete = ele;
  //             this.totalLength = ele.total;
  //         });
  //  }

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
  