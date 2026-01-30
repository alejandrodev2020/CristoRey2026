import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Provider } from '../models/provider';
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


export class ProviderService {
  baseUri : string = '';

  constructor(private http: HttpClient) {
    this.baseUri = (environment.production)? environment.apiUrlProd: environment.apiUrlLocal;
   }

  getListProvider(){
     return  this.http.get(`${this.baseUri}api/provider/list`,httpOptions);
  }
  store(data:Provider){
    if(data?.id){
      return  this.http.put(`${this.baseUri}api/doctor/${data.id}`,data);
    }
    else{
      return  this.http.post(`${this.baseUri}api/doctor`,data);
    }
 }
 getById( id : number){
  return  this.http.get<Provider>(`${this.baseUri}api/doctor/`+ id);
  }
  lowById( id : number){
    return  this.http.put(`${this.baseUri}api/provider/${id}/low`,{});
  }

}

enum AlertType {
  success,
  error,
  info,
  warning,
  question
}

enum typeInput {
  text,
  number
}
