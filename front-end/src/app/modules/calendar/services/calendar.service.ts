import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";

import { BaseService } from 'app/shared/services/base.service';
import { AuthStorageService } from 'app/modules/auth/services/authStorage.service';

@Injectable({
  providedIn: "root"
})

export class CalendarService extends BaseService{

    constructor(http: HttpClient, authStorage: AuthStorageService) {
        super(http, authStorage); 
    }

    getListAppoint(id: number){
     return  this.http.get(`${this.baseUri}api/doctor/${id}/clinical-history`,this.getHttpOptions());
    }

    getLoggedDoctorAppointments(dateInit: string, dateEnd: string) {
      const params = new HttpParams()
        .set('DateInit', dateInit)
        .set('DateEnd', dateEnd)
        .set('Limit', '100')
        .set('Page', '0');

      return this.http.get(
        `${this.baseUri}api/doctor/clinical-history`,
        { ...this.getHttpOptions(), params }
      );
    }

    aceptCita(id: number){
     return  this.http.put(`${this.baseUri}api/doctor/clinical-history/${id}/acept`,{},this.getHttpOptions());
    }

    rejectCita(id: number){
     return  this.http.put(`${this.baseUri}api/doctor/clinical-history/${id}/reject`,{},this.getHttpOptions());
    }

}
