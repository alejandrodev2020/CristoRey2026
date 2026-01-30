import { AfterViewInit, Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ClientService } from 'app/modules/client/services/client.service';
import { Classifier } from 'app/modules/configuration/models/classifier';
import { SaleDetail } from 'app/modules/sale/models/saleDetail';
import { map, Observable, startWith } from 'rxjs';
import Swal from 'sweetalert2';
import { SaleTypes } from 'app/modules/sale/models/saleTypes';
import { StoreClientComponent } from 'app/modules/client/pages/client-gestionary/store-client/store-client.component';
import { PaymentType } from 'app/modules/sale/models/PaymentType';
import { SaleStatus } from 'app/modules/sale/models/saleStatus';
import { isNumber } from 'lodash';
import { Configuration } from 'app/modules/configuration/models/configuration.model';
import { AuthUserConfiguration } from 'app/modules/auth/models/authUser.configuration.model';
import { SaleCreditStoreComponent } from 'app/modules/sale/components/sale-store/sale-credit-store/sale-credit-store.component';
import { OverviewQrCodeComponent } from 'app/modules/sale/components/overview-qr-code/overview-qr-code.component';
import { FormMixPaymentComponent } from 'app/modules/sale/components/sale-store/form-mix-payment/form-mix-payment.component';
import { DistributionService } from '../../services/distribution.service';

@Component({
  selector: 'app-preview-order',
  templateUrl: './preview-order.component.html',
  styleUrls: ['./preview-order.component.scss']
})
export class PreviewOrderComponent implements AfterViewInit  {
  form: FormGroup;
  options: any[] = [];
  myDate = new Date();
  listSaleType: Classifier[];
  pettyCashId: number;
  detailParsed: SaleDetail[] = [];
  filteredOptions: Observable<string[]>;
  orderNote: any;
  saleCredit: boolean = false;
  amountCredit: number;
  buttonDisabled : boolean = false
  amountPaymentDelivered: number;
  methoPaymentEfective = true;
  methoPaymentQr = false;
  methoPaymentTarjet = false;
  methoPaymentMix = false;
  change: number = 0;
  amountRecived: number;
  modeTypeSaleDirecct = true;
  modeTypeSaleReserved = false;
  viewInpuntAmountRecived = true;

  configuration: Configuration;
  authUserConfiguration : AuthUserConfiguration = {
    id:0,
    authUserId:0,
    allItemsSale:false,
    countItemsSale:0,
    printNoteSale:false,
    allItemsShopping:false,
    countItemsShopping:0,
    printNoteShopping:false
  };
  printEnabled : boolean = false;


  @ViewChild('aForm2') aForm2: ElementRef;

  constructor(private dialogRef: MatDialogRef<any>,
    private serviceClient: ClientService,
    private router: Router,
    public dialog: MatDialog,
    private service : DistributionService,
    @Inject(MAT_DIALOG_DATA) data,
    private fb: FormBuilder) {
    this.orderNote = data;
    if(this.orderNote.total <= 0){
      this.buttonDisabled = true
    }
    this.pettyCashId = data?.pettyCash?.id;
    this.form = this.fb.group({
      id: [null],
      // myControl: ['Venta directa'],
      myControl: [null],
      clientId: [null,[Validators.required]],
      warehouseId: [2],
      discount: [null],
      saleTypeId: [1],
      pettyCashId: [null, [Validators.required]],
      paymentTypeId: [1, [Validators.required]],
      amountTotal: [null],
      amountOfDebt: [null],
      paymentDelivered: [null],
      saleStatus: [2,null],
      note: [null],
      search: [''],
      amountRecived:[null],
    });

    let storedUserLogged = localStorage.getItem('userLogged');
    if (storedUserLogged) {
      let userLogged : Configuration= JSON.parse(storedUserLogged);
      this.authUserConfiguration = userLogged?.authUserConfiguration;
      this.printEnabled = this.authUserConfiguration.printNoteSale;
    } else {
      console.log('No se encontró el dato en el localStorage.');
    }

    this.form.get('warehouseId').setValue(data?.form?.warehouseId);
    this.form.get('pettyCashId').setValue(this.pettyCashId);
    this.form.get('saleTypeId').setValue(SaleTypes.Al_CONTADO);
    this.form.get('amountTotal').setValue( {amountMain:data?.total } );
    this.serviceClient.getAllClient().subscribe((ele: any) => {
    this.options = ele;
    });

    this.filteredOptions = this.form.get('myControl').valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
    this.listSaleType = [
      {
        id: 1,
        name: 'Al Contado'
      },
      {
        id: 2,
        name: 'Al Credito'
      },
      {
        id: 3,
        name: 'Cotización'
      }
    ];

  }

  ngAfterViewInit() {
    setTimeout(() => {
      const ele = this.aForm2.nativeElement['mat-input-10'];
      if (this.viewInpuntAmountRecived &&  ele) {
        ele.focus();
      }
    }, 100); 

  }

  close() {
    this.dialogRef.close(this.orderNote.detailProduct);
  }



  private _filter(value: any): any[] {
    value = (value?.firstName) ? value?.firstName : value;
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.firstName.toLowerCase().includes(filterValue));
  }

  onSelectionChange(select: any) {
    this.form.get('myControl').setValue(select?.option?.value?.firstName + ' ' + select?.option?.value?.lastName);
    this.form.get('clientId').setValue(select?.option?.value?.id);
  }

  private isValidForm(): boolean {
    let values = this.form.controls;
    Object.keys(this.form.controls).forEach((field) => {
      const control = this.form.get(field);
      control?.markAsTouched({ onlySelf: true });
    });
    return this.form.valid;
  }

  selectSaleType() {
    let select = this.form?.value?.saleTypeId;
    if (select === SaleTypes.AL_CREDITO) {
      const dialogRef2 = this.dialog.open(SaleCreditStoreComponent, {
        maxWidth:'300px',
        data: this.orderNote.total
      });

      dialogRef2.afterClosed().subscribe(result => {
        if (result !== undefined && result !== false) {
          this.saleCredit = true;
          this.form.get('amountOfDebt').setValue(result?.amountCredit);
          this.form.get('paymentDelivered').setValue( {amountMain:result?.paymentDelivered } );
          this.amountCredit = result?.amountCredit;
          this.amountPaymentDelivered = result?.paymentDelivered;
        }
        else {
          this.form.get('amountOfDebt').setValue(null);
          this.form.get('paymentDelivered').setValue(null);
          this.form.get('saleTypeId').setValue(SaleTypes.Al_CONTADO);
          this.saleCredit = false;
        }
      });
    }
    if (select === SaleTypes.Al_CONTADO) {
      this.saleCredit = false;
      this.form.get('amountOfDebt').setValue(null);
      this.form.get('paymentDelivered').setValue(null);
      this.form.get('saleTypeId').setValue(SaleTypes.Al_CONTADO);
    }
    if (select === SaleTypes.COTIZACION) {
        this.saleCredit = false;
        this.form.get('amountOfDebt').setValue(null);
        this.form.get('paymentDelivered').setValue(null);
        this.form.get('saleTypeId').setValue(SaleTypes.COTIZACION);
      }
  }

  selectPayment(value) {
    this.calculateTotal();
    switch (value) {
      case 'Efectivo':
        this.methoPaymentEfective = true;
        this.methoPaymentQr = false;
        this.methoPaymentTarjet = false;
        this.methoPaymentMix = false;
        this.form.get('paymentTypeId').setValue(PaymentType.CASH);
        break;
      case 'Qr':
        this.methoPaymentEfective = false;
        this.methoPaymentQr = true;
        this.methoPaymentTarjet = false;
        this.methoPaymentMix = false;
        this.previewCodeQr();
        this.form.get('paymentTypeId').setValue(PaymentType.QR);
        break;
      case 'Tarjeta':
        this.methoPaymentEfective = false;
        this.methoPaymentQr = false;
        this.methoPaymentTarjet = true;
        this.methoPaymentMix = false;
        this.form.get('paymentTypeId').setValue(PaymentType.CARD);
        break;
      case 'mix':
        this.methoPaymentEfective = false;
        this.methoPaymentQr = false;
        this.methoPaymentTarjet = false;
        this.methoPaymentMix = true;
        this.previewMixPayment();
        this.form.get('paymentTypeId').setValue(PaymentType.MIX);
        break;
      
      default:
        break;
    }
  }

  updateChange() {
    if(this.amountRecived == 0 || this.amountRecived ==null){
      this.change = 0;
    }else{
      if(isNumber(this.amountRecived)){
        // let value =  this.isCre
        this.change = Math.abs(this.orderNote.total - this.amountRecived);
      }
    }

  }
  
  onAmountReceivedChanged(value: number) {
    this.amountRecived =  parseInt(this.control('amountRecived').value);
    this.updateChange();
  }

  handleFormChange(formValue: any) {
    this.viewInpuntAmountRecived = (formValue.amountMain === formValue.amountCash);
    setTimeout(() => {
      const ele = this.aForm2.nativeElement['mat-input-11'];
      if (this.viewInpuntAmountRecived &&  ele) {
        ele.focus();
      }
    }, 100); 
  
  }

  selectMode(value) {
    switch (value) {
      case 'sale':
        this.modeTypeSaleDirecct = true;
        this.modeTypeSaleReserved = false;
        this.form.get('saleStatus').setValue(SaleStatus.DELIVERED);
        break;
      case 'reserved':
        this.modeTypeSaleDirecct = false;
        this.modeTypeSaleReserved = true;
        this.form.get('saleStatus').setValue(SaleStatus.RESERVED);
        break;
      default:
        break;
    }
  }

  previewCodeQr(){
    let amountEnd= (this.saleCredit)?this.amountPaymentDelivered:this.orderNote.total;
    let clientId = this.form.get('clientId').value;
    let client = this.options.filter((ele)=>(ele.id === clientId))[0];
    const dialogRef = this.dialog.open(OverviewQrCodeComponent, {
      autoFocus: false,
      maxHeight: '90vh',
      data : {
               client : client,
               amountTotal : amountEnd,
             }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  previewMixPayment(){
    let amountEnd= (this.saleCredit)?this.amountPaymentDelivered:this.orderNote.total;
    let clientId = this.form.get('clientId').value;
    let client = this.options.filter((ele)=>(ele.id === clientId))[0];
    const dialogRef = this.dialog.open(FormMixPaymentComponent, {
      autoFocus: false,
      maxHeight: '90vh',
      data : {
               client : client,
               amountTotal : amountEnd,
             }
    });

    dialogRef.afterClosed().subscribe(result => {
        if(result === null){
            this.selectPayment('Efectivo');
        }
    });
  }

  saveShopping() {
    let data = this.form.value;

    this.parseDataDetail();
    data.distributionId = this.orderNote.distributionId;
    data.detail = this.detailParsed;
    delete data.search;
    delete data.myControl;
    data.warehouseId = 2;
    // if (this.isValidForm()) {
    if (true) {
      let t = data;
      if(data.saleTypeId !==  SaleTypes.COTIZACION)
        {
            this.service.saveOrder(data).subscribe((resp : number) => {
                this.close();
                this.buttonDisabled = true
                // if(resp !== null){
                //   const currentId  : number = resp;
                //   if(this.printEnabled){
                //       this.service.generateReportingPdfSaleById3(currentId).subscribe(
                //         (response: Blob) => {
                //             const fileURL = URL.createObjectURL(response);
                //             window.open(fileURL, '_blank');
                //             setTimeout(() => {
                //                 URL.revokeObjectURL(fileURL);
                //             }, 100);
                //         },
                //         err => {
                //             console.error('Error al descargar el PDF:', err);
                //         });
                //   }
                // }
                Swal.fire({
                  position: 'top-end',
                  icon: 'success',
                  title: 'Su pedido se guardo  con exito!',
                  showConfirmButton: false,
                  timer: 1500
                })
                this.router.navigate(['/distribution']);
              });
        }
      //  if(data.saleTypeId ===  SaleTypes.COTIZACION){
      //   this.service.saveQuotation(data).subscribe((resp) => {
      //       this.close();
      //       Swal.fire({
      //         position: 'top-end',
      //         icon: 'success',
      //         title: 'Su venta se realizo con exito!',
      //         showConfirmButton: false,
      //         timer: 1500
      //       })
      //       this.router.navigate(['sale/sale']);
      //     });
      //  }
    }
  }


  control(key: string): FormControl {
    return this.form.controls[key] as FormControl;
  }

  parseDataDetail() {
    let detail: [] = this.orderNote.detailProduct;
    for (let index = 0; index < detail.length; index++) {
      const element = this.orderNote.detailProduct[index];
      var item: SaleDetail = {
        productId: element?.product?.id,
        amount: element?.count,
        price: element?.price,
        discount: element?.discount,
        unitMeasurenmentSelectId: element?.unitMeasurementSelect?.unitMeasurement?.id,
        subTotal: element?.subTotal
      };
      this.detailParsed.push(item)
    }
  }

  addClient(){
    const dialogRef = this.dialog.open(StoreClientComponent, {
      panelClass: 'custom-container',
      maxHeight: '80vh',
      width:'450px',
      data: {id : 1},
   });

   dialogRef.afterClosed().subscribe(result => {
    if(result != undefined && result != false){
        this.options.push(result);
        let nameComplet = result.firstName + ' ' + result.lastName;
        this.form.get('myControl').setValue(nameComplet);
        this.form.get('clientId').setValue(result?.id);
    }
   });
  }

  updateAmount(item, action) {
    if (action === 'increment') {
      item.count++;
      item.subTotal = item.count * item.price;
    } else if (action === 'decrement' && item.count > 0) {
      item.count--;
      item.subTotal = item.count * item.price;
    }
    this.calculateTotal();
    this.validateStockAvailable(item);
  }

  removeItem(itemDetail: any){
    Swal.fire({
      html: `
        <br>
        <label style="color: #ff6c00; font-size: 30px; font-weight: 600">¡Eliminar!</label>
        <img src='data:image/png;base64,${itemDetail?.product?.picture}' style="width: 150px; height: auto; justify-self: center;"  />
        <br>
        Seguro que quieres eliminar, <b>${itemDetail?.product?.name}</b>,
        <a href="#" autofocus>de tu lista?</a>`,
      showCloseButton: false,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: `<button class="background:'red'"> Sí, quitar</button>`,
      cancelButtonText: `<button>Cancelar</button>  `,
      customClass: {
        confirmButton: 'confirm-btn', 
        cancelButton: 'cancel-btn'
      }
    }).then((result) => {
        if (result.isConfirmed) {
          this.orderNote.detailProduct = this.orderNote.detailProduct.filter(detail => detail.id !== itemDetail.id);
          this.form.get('saleTypeId').setValue(SaleTypes.Al_CONTADO);
          this.selectSaleType();
          this.calculateTotal();
          Swal.fire({
            title: '¡Eliminado!',
            text: 'Ese producto no pertenece a la lista de tu venta',
            icon: 'success',
            showConfirmButton: false, 
            timer: 1500 
          });
        }
    });
  }



  calculateTotal() {
    let total = 0;
    this.orderNote.detailProduct.forEach(item => {
      total += item.subTotal;
    });
    this.orderNote.total = total;
    this.form.get('amountTotal').setValue( {amountMain:total} );
  }

  cleanSearch(){
    this._filter('');
    this.form.get('myControl').setValue('');
  }




  validateStockAvailable(data: any){
    // let count =     parseFloat(this.form.get('amount').value);
    // let available = parseFloat(this.form.get('avaliable').value);
    // let name = this.checkUnitMeasurement.name;
    // if(count > available){
    //     this.message = 'Stock Disponible : ' + available +' ' +name;
    //     this.isValidData=false;
    // }
    // else{
    //   this.message = '';
    //   this.isValidData=true;
    // }
  }


}
