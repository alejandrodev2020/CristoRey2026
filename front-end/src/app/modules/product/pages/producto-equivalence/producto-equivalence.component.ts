import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, isFormRecord, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Classifier } from 'app/modules/configuration/models/classifier';
import { ConfigurationService } from 'app/modules/configuration/services/configuration.service';
import { PreviewQuestionsUnitmeasurementComponent } from 'app/modules/product/components/preview-questions-unitmeasurement/preview-questions-unitmeasurement.component';
import { image } from 'app/modules/product/models/image-default.const';
import { Product } from 'app/modules/product/models/product';
import { ProductService } from 'app/modules/product/services/product.service';
import Swal from 'sweetalert2';
import { FormStoreComponent } from '../../components/producto-equivalence/form-store/form-store.component';
import { StoreClassifierComponent } from 'app/modules/configuration/components/store-classifier/store-classifier.component';



export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: any[] = [];


@Component({
  selector: 'app-producto-equivalence',
  templateUrl: './producto-equivalence.component.html',
  styleUrls: ['./producto-equivalence.component.scss']
})
export class ProductoEquivalenceComponent implements OnInit {


  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;

  form: FormGroup;
  id: number | null = null;
  currentProduct:any;
  listCategories : Classifier[];
  listUnitMeasurement : Classifier[];
  listEquivalence : any[];
  isCreate = false;
  selectUnitmeasurementName : string = '';
  imgBase64 :any;
  unitMeasurementDefault : number;
  unitsOfMeasurementAllowed : any[] = [];
  imageSource = ``;
  listUnitMeasurementActive : any[];
  prop = [
    "id",
    "name",
    "description",
    "code",
    "suggestedPriceShopping",
    "suggestedPriceSale",
    "requiredExpired",
    "productCategoryId",
    "unitMeasurementId"
  ];
  get formLabel() {
    return this.isCreate ? 'Regístro' : 'Actualización';
  }
  constructor(private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private service : ProductService,
    public dialog: MatDialog,
    private serviceConfiguration : ConfigurationService) {

      this.form = this.fb.group({
        id : [null],
        picture: [null],
        name : [null,[Validators.required]],
        description : [null],
        code : [null],
        suggestedPriceShopping : [null,[Validators.required]],
        suggestedPriceSale : [null,[Validators.required]],
        productCategoryId : [null],
        unitMeasurementId : [null],
        requiredExpired : [true,null],
      });
     }

   ngOnInit(): void {
      this.id = parseInt(this.activatedRoute.snapshot.params['id']);
       this.service.getById(this.id).subscribe((response: any) => {
        this.currentProduct = response;
        this.currentProduct.picture = (this.currentProduct.picture)? `data:image/png;base64,${this.currentProduct.picture}`:null;
          this.getAllEquivalenceById(this.currentProduct.id);
        });
        this.getAllUnitmeasurement();
        if(this.listEquivalence && this.listUnitMeasurement){
          this.generateListActive();
        }
        this.imageSource = image;
    }

   async getAllUnitmeasurement (){
    await this.serviceConfiguration.getAllUnitMeasurement().subscribe((resp: Classifier[]) =>{
          this.listUnitMeasurement = resp;
          this.comprobarListasCompletas();
      });
   };

   async getAllEquivalenceById(id: number){
     await this.service.getAllProductEquivalence(id).subscribe((equivalences : any[]) => {
       this.listEquivalence = equivalences;
       this.comprobarListasCompletas();
    });
   };


   comprobarListasCompletas(): void {
    if (this.listEquivalence && this.listUnitMeasurement) {
      this.generateListActive();
    }
  }

  createNewUnit(){
    const dialogRef = this.dialog.open(StoreClassifierComponent, {
        data: {
            id: null,
            classifier: 'Unidad de Medida',
            pathClassifier: 'unit-measurement'
        },
    });

    dialogRef.afterClosed().subscribe(result => {
        if (result) {
            this.getAllUnitmeasurement();
        }
    });
  }

   generateListActive(){
    var listUnitMeasurementActive = [];
    this.listUnitMeasurement.forEach(item1 => {
        var match = this.listEquivalence.find(item2 => item2.unitMeasurementMotiveId === item1.id);
        if (match) {
            listUnitMeasurementActive.push({
                ...item1,
                exist: true,
                equivalenceItem : match,
                suggestedPricePurchase: match.suggestedPricePurchase,
                suggestedPriceSale: match.suggestedPriceSale,
                isActive: match.isActive,
                favoriteUnitMeasurement: match?.favoriteUnitMeasurement,
                unitMeasurementPrint: match?.unitMeasurementPrint,

            });
        } else {
            listUnitMeasurementActive.push({...item1, exist: false });
        }
    });

     listUnitMeasurementActive.sort((a, b) => {
          if (a.exist && !b.exist) {
              return -1;
          } else if (!a.exist && b.exist) {
              return 1;
          } else {
              return 0;
          }
      });
      this.listUnitMeasurementActive = listUnitMeasurementActive;
   }



  gestionaryItem(data: any){
    const dialogRef = this.dialog.open(FormStoreComponent, {
      data: {
              listActive: this.listUnitMeasurementActive,
              dataRequest :data,
              productId : this.id
            },
      disableClose:true,
      maxWidth:'500px'
    });
    dialogRef.afterClosed().subscribe(result => {
        if(result) this.ngOnInit();
    });
  }


  selectUnitmeasurement(data : any ){
    let unitMeasurementSelect = this.listUnitMeasurement.filter((ele)=>((ele.id === data.value)));
    this.selectUnitmeasurementName = unitMeasurementSelect[0].name;
  }

  cancelStore(){
    this.router.navigate(['product/product']);
  }


  getionaryStatusItem(data : any){
    let messaje = (data.isActive)? 'Inavilitarlo' : 'Habilitarlo';
    let messajeConfirm = (data.isActive)? 'Inavilitado' : 'Habilitado';
    Swal.fire({
      title: `Seguro quieres ${messaje}`,
      text: "Esta acción podra revertise!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Sí, ${messaje}`
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.getionaryStatusItem(data?.equivalenceItem).subscribe(() => {
            this.ngOnInit();
            Swal.fire({
              title: `${messajeConfirm}!`,
              text: "Su actualización fue exitosa!",
              icon: "success"
            });
          });
      }
    });
  }

  selectFavorite(data: any){
    Swal.fire({
      title:`Seguro que quieres usar "${data?.name}" favorito?`,
      text: "Se visualizara con esta unidad de medida!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, es mi Favorito!",
      cancelButtonText:'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.selectFavorite(this.id,data?.equivalenceItem?.id).subscribe((resp)=> {
          this.ngOnInit();
          Swal.fire({
            title: "Actualizado!",
            text: "Se usará esta medida como favorito.",
            icon: "success"
          });
        })
      }
    });
  }

  selectPrint(data: any){
    Swal.fire({
      title: `Quieres usar "${data?.name}" para tus impresiones?`,
      text: `Recuerda que al momento de imprimir se usará esta medida !`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Sí, usar ${data?.name} !`,
      cancelButtonText:'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.selectPrint(this.id, data?.equivalenceItem?.id).subscribe((resp)=>{
          this.ngOnInit();
          Swal.fire({
            title: "Actualizado!",
            text: "Se usará esta medida para las impresiones.",
            icon: "success"
          });
        });
      }
    });
  }


}
