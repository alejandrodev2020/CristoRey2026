import { Injectable } from '@angular/core';
import { HttpClient} from "@angular/common/http";
import { Client } from '../models/client';
import { BaseService } from 'app/shared/services/base.service';

@Injectable({
  providedIn: "root"
})

export class ClientService extends BaseService{

    constructor(http: HttpClient) {
        super(http);
    }


  getAllClient(){
     return  this.http.get(`${this.baseUri}api/client/list`,this.getHttpOptions());
  }
  store(data:Client){
    if(data?.id){
      return  this.http.put(`${this.baseUri}api/client/${data.id}`,data,this.getHttpOptions());
    }
    else{
      return  this.http.post(`${this.baseUri}api/client`,data,this.getHttpOptions());
    }
 }
 getById( id : number){
  return  this.http.get<Client>(`${this.baseUri}api/client/${id}`,this.getHttpOptions());
  }
  lowById( id : number){
    return  this.http.put(`${this.baseUri}api/client/${id}/low`,this.getHttpOptions());
  }
  getListZone(){
    return  this.http.get(`${this.baseUri}api/client/zone/list`,this.getHttpOptions());
 }

}
