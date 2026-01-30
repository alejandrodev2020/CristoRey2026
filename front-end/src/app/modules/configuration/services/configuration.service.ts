import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from 'environments/enviroments';
import { BaseService } from 'app/shared/services/base.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Authorization': 'authkey',
    'userid': '1'
  })
};
const httpOptions2 = {
  headers: new HttpHeaders({
    'cache-control': 'no-cache',
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJSb2xlIjoiVE9LRU4iLCJJbnZvbHZlZFBhcnR5SWQiOiI2NjkiLCJJbnZvbHZlZFBhcnR5SWRUeXBlIjoiMyIsIkNyZWRlbnRpYWxTdGF0dXMiOiIxIiwiZXhwIjoxNjk2MDgwNDMzLCJpc3MiOiJibmIuY29tLmJvIn0.1gMbhuvNzPIO2yC4u2Lk-4mn3IlGGrncFh1oDgkZtN0'
  })

};
const httpOptions3 = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  })
};

const httpHeaderWhatsApp = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};


@Injectable({
  providedIn: "root"
})


export class ConfigurationService extends BaseService {

  constructor(http: HttpClient) {
    super(http);
  }




  generateReportingPdf() {
    //  let options = {'responseType': 'arraybuffer'};
    let HTTPOptions: Object = { responseType: 'arraybuffer' };
    const httpOptions = {
      'responseType': 'arraybuffer' as 'json'
      //'responseType'  : 'blob' as 'json'        //This also worked
    };
    return this.http.get<any>(`https://reporting.takysoft.com/api/pdf`, httpOptions);
  }



  getAllUnitMeasurement() {
    return this.http.get(`${this.baseUri}api/classifier/unit-measurement/list`, httpOptions);
  }

  getAllProductCategory() {
    return this.http.get(`${this.baseUri}api/classifier/product-category/list`, httpOptions);
  }

  store(data: any, path: string) {
    if (data?.id) {
      return this.http.put(`${this.baseUri}api/classifier/${path}/${data.id}`, data);
    }
    else {
      return this.http.post(`${this.baseUri}api/classifier/${path}`, data);
    }
  }

  getById(id: number) {
    return this.http.get<any>(`${this.baseUri}api/product/` + id);
  }
  lowById(id: number) {
    return this.http.put(`${this.baseUri}api/product/${id}/low`, {});
  }


  /**
   * GENERACIÓN DE CODIGO QR
   * @param data
   * @param path
   * @returns
   *
   */


  generateTocken() {
    var dataTocken = {
      "accountId": "mjtrqZsTD7YMpFp2xndf+g==",
      "authorizationId": "JTgmad12022wp..*"
    };
    return this.http.post(`http://test.bnb.com.bo/ClientAuthentication.API/api/v1/auth/token`, dataTocken);
  }






  generateCodeQr(amount, date) {
    let data = {
      "currency": "BOB",
      "gloss": "Prueba QR",
      "amount": amount,
      "singleUse": true,
      "expirationDate": date,
      "additionalData": "Datos Adicionales para identificar el QR",
      "destinationAccountId": "1"
    };
    return this.http.post(`${this.baseUri}api/banking/generate-qr`, data, httpOptions3);
  }
  getStatusWhatsApp() {
    return this.http.get<any>(`${this.baseUri}api/configuration/whatsapp/status`);
  }

  generateCodeQrWhatsApp() {
    return this.http.get<any>(`${this.baseUri}api/configuration/whatsapp/generate-qr`);
  }

  SendMessageWhatsApp(data: any) {
    return this.http.post<any>(`${this.baseUri}api/configuration/whatsapp/send-data`, data);
  }
  closeSessionWhatsApp() {
    return this.http.post<any>(`${this.baseUri}api/configuration/whatsapp/close-session`, {});
  }
  updatePaymentMethod(data: any) {
    return this.http.post<any>(`${this.baseUri}api/configuration/payment-method`, data, this.getHttpOptions());
  }

  updateAuthUserConfiguration(data: any) {
    return this.http.put<any>(`${this.baseUri}api/auth/configuration`, data, this.getHttpOptions());
  }







  sendCodeQrClientOut(data: any, path: string) {
    var data2 = {
      "token": "im3q0x5rf48k4i8e",
      "to": data.to,
      "image": path,
      "caption": "Con este codigo Qr, podras realizar tu pago.!  ",
      "priority": "",
      "referenceId": "",
      "nocache": "",
      "msgId": "",
      "mentions": ""
    };
    return this.http.post(`https://api.ultramsg.com/instance55483/messages/image`, data2, httpHeaderWhatsApp);
  }


  sendCodeQrClient(data: any, path: string) {
    var data2 = {
      "token": "im3q0x5rf48k4i8e",
      "to": data.to,
      "image": path,
      "caption": "Con este codigo Qr, podras realizar tu pago.!  ",
      "priority": "",
      "referenceId": "",
      "nocache": "",
      "msgId": "",
      "mentions": ""
    };
    var data3 = {
      "number": data.to,
      "image": path.split(",")[1],
      "caption": "Con este codigo Qr, podras realizar tu pago.!  "
    };
    return this.http.post(`${this.baseUri}api/configuration/whatsapp/send-image`, data3, httpHeaderWhatsApp);
  }

  sendSaleNoteImageClient(phone: any, photo: string) {
    var data2 = {
      "number": 591 + phone,
      "image": photo.split(",")[1],
      "caption": "Gracias por su compra..! Adjuntamos la nota de compra",
    };
    return this.http.post(`${this.baseUri}api/configuration/whatsapp/send-image`, data2, httpHeaderWhatsApp);
  }

  
  sendReceipt(data) {
    return this.http.post(`${this.baseUri}api/configuration/whatsapp/send-receipt`, data, this.getHttpOptions());
  }


}
