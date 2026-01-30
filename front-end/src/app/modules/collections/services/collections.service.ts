import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from 'environments/enviroments';
import { BaseService } from 'app/shared/services/base.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin':'*',
    'Authorization':'authkey',
    'userid':'1'
  })
};

const httpOptions2 = {
  headers: new HttpHeaders({
    'Authorization':'Bearer EAACgOY6LeWMBANPLSZAQm6ixiweWA25SzybGaUOQf6iBLUMJDtj1ByGaJej1FP1MySZBpyTZABXmngjaOl1alruVqhoMiZCAeFsDcp61Hkg6SrTucgWcSZBuozcqo7DApukjbfWDZALfC4IysDX0qn7M68cQIhK2P7kyy8RjIiDJ79Wbd3aZC3IuALOX3KPEJsMuI6mRojAni6P9xg6Bsau'
  })
};

@Injectable({
  providedIn: "root"
})


export class CollectionsService extends BaseService{

    constructor(http: HttpClient) {
        super(http); // Llama al constructor del servicio base
    }


getAllSaleCredit(query:string){
   return  this.http.get(`${this.baseUri}api/sale/credit/list${query}`, this.getHttpOptions());
}
store(data:any){
  if(data?.id){
    return  this.http.put(`${this.baseUri}api/product/${data.id}`,data);
  }
  else{
    return  this.http.post(`${this.baseUri}api/sale`,data);
  }
 }

 getById( id : number){
  return  this.http.get<any>(`${this.baseUri}api/sale/`+ id);
  }


  lowById( id : number){
    return  this.http.put(`${this.baseUri}api/product/${id}/low`,{});
  }

  sendMessageWhatsApp(data:any){
    return  this.http.post(`https://graph.facebook.com/v16.0/105589029214638/messages`,data,httpOptions2);
  }

  getAllSaleByWarehouseAndPettyCash( warehouseId:number, pettyCashId : number ){
    return  this.http.get(`${this.baseUri}api/sale/warehouse/${warehouseId}/petty-cash/${pettyCashId}/list`,httpOptions);
 }

}
