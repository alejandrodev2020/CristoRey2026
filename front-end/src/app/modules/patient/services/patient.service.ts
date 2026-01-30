import { Injectable } from '@angular/core';
import { HttpClient} from "@angular/common/http";
// import { Client } from '../models/client';
import { BaseService } from 'app/shared/services/base.service';

@Injectable({
  providedIn: "root"
})

export class PatientService extends BaseService{

    constructor(http: HttpClient) {
        super(http);
    }


  getlistPatients(queryString: string){
     return  this.http.get(`${this.baseUri}api/patient/list?${queryString}`,this.getHttpOptions());
  }
  store(data:any){
    if(data?.id){
      return  this.http.put(`${this.baseUri}api/patient/${data.id}`,data,this.getHttpOptions());
    }
    else{
      return  this.http.post(`${this.baseUri}api/patient`,data,this.getHttpOptions());
    }
 }
 getById( id : number){
  return  this.http.get<any>(`${this.baseUri}api/patient/${id}`,this.getHttpOptions());
  }
  lowById( id : number){
    return  this.http.put(`${this.baseUri}api/patient/${id}/low`,this.getHttpOptions());
  }
  getListZone(){
    return  this.http.get(`${this.baseUri}api/client/zone/list`,this.getHttpOptions());
  }

  getListClinicHistoryById(id: number, queryString: string){
    return  this.http.get(`${this.baseUri}api/patient/${id}/clinical-history${queryString}`,this.getHttpOptions());
  }

  printReport(patientId: number, doctorId: number) {
    return this.http.get(
      `${this.baseUri}api/patient/report?PatientId=${patientId}&DoctorId=${doctorId}`,
      {
        ...this.getHttpOptions(),
        responseType: 'blob'
      }
    );
  }

  updateCita( id : number, data: any){
    return  this.http.put(`${this.baseUri}api/patient/clinical-history/${id}/gestionary`, data,this.getHttpOptions());
  }

}
