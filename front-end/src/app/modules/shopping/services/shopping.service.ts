import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Product } from '../models/product';
import { BaseService } from 'app/shared/services/base.service';

const httpOptions = {
  headers: new HttpHeaders({ 
    'Access-Control-Allow-Origin':'*',
    'Authorization':'authkey',
    'userid':'1'
  })
};

@Injectable({
  providedIn: "root"
})


export class ShoppingService  extends BaseService {
  
  constructor(http: HttpClient) {
    super(http); // Llama al constructor del servicio base
}
      // ESTE ES EL SERVICIO QUE VOY A UTILIZAR 
   getAllShopping(query :string){
     return  this.http.get(`${this.baseUri}api/shopping/list${query}`,httpOptions);
  }


  getAllProductShopping(limit: number, page : number){
    return  this.http.get(`${this.baseUri}api/product/list/shopping-fast?limit=${limit}&page=${page}`,this.getHttpOptions());
 }

  store(data:Product){
    if(data?.id){
      return  this.http.put(`${this.baseUri}api/product/${data.id}`,data, this.getHttpOptions());
    }
    else{
      return  this.http.post(`${this.baseUri}api/shopping`,data,this.getHttpOptions());
    }
 }
 getById( id : number){
  return  this.http.get<Product>(`${this.baseUri}api/product/`+ id);
  }


  getShoppingById( id : number){
    return  this.http.get<any>(`${this.baseUri}api/shopping/`+ id);
    }
  lowById( id : number){
    return  this.http.put(`${this.baseUri}api/shopping/${id}/low`,{});
  }

  generateReportingPdfShopingById3(id : number) {
    const httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        }),
        responseType: 'blob' as 'json'
    };
    return this.http.get(`${this.baseUri}api/reporting/shoping/${id}`, httpOptions);
  }
}
