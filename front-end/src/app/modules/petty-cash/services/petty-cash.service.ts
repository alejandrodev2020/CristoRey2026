import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { PettyCash } from '../models/petty-cash';
import { environment } from 'environments/enviroments';

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


export class PettyCashService {
  baseUri : string = '';
  constructor(private http: HttpClient) {
      this.baseUri = (environment.production)? environment.apiUrlProd: environment.apiUrlLocal;
   }

  getAllPettyCash(query: string){
     return  this.http.get(`${this.baseUri}api/petty-cash/list${query}`,httpOptions);
  }
  store(data:any){
    if(data?.id){
      return  this.http.put(`${this.baseUri}api/petty-cash/${data.id}`,data);
    }
    else{
      return  this.http.post(`${this.baseUri}api/petty-cash`,data);
    }
 }
 getById( id : number){
  return  this.http.get<any>(`${this.baseUri}api/petty-cash/`+ id);
  }

  getBySellerId( id : number){
    return  this.http.get<any>(`${this.baseUri}api/petty-cash/seller/`+ id);
    }

  getByWarehouseId( id : number){
    return  this.http.get<any>(`${this.baseUri}api/petty-cash/warehouse/`+ id);
  }

  lowById( id : number){
    return  this.http.put(`${this.baseUri}api/petty-cash/${id}/low`,{});
  }

  closePettyCash( id : number, data : any){
    return  this.http.put(`${this.baseUri}api/petty-cash/${id}/close`, data);
  }

  getMovementsById( id : number){
    return  this.http.get(`${this.baseUri}api/petty-cash/${id}/movements`);
  }

  getReportPettyCashById(id : number){
    const httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        }),
        responseType: 'blob' as 'json'
    };

    return this.http.get(`${this.baseUri}api/reporting/petty-cash/${id}/movement`, httpOptions);
  }

  getReportExcelPettyCashById(id : number){
    const httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        }),
        responseType: 'blob' as 'json'
    };

    return this.http.get(`${this.baseUri}api/reporting/excel/petty-cash/${id}/movement`, httpOptions);
  }

  saveOperators(data: any){
    return  this.http.post(`${this.baseUri}api/petty-cash/assistant`,data);
  }


  getOperatorsByPettyCashId( id : number){
    return  this.http.get(`${this.baseUri}api/petty-cash/${id}/assistant`);
  }
}
