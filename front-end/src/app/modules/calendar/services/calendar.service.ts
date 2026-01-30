import { Injectable } from '@angular/core';
import { HttpClient} from "@angular/common/http";

import { BaseService } from 'app/shared/services/base.service';

@Injectable({
  providedIn: "root"
})

export class CalendarService extends BaseService{

    constructor(http: HttpClient) {
        super(http);
    }

    getListAppoint(id: number){
     return  this.http.get(`${this.baseUri}api/doctor/${id}/clinical-history`,this.getHttpOptions());
    }

    aceptCita(id: number){
     return  this.http.put(`${this.baseUri}api/doctor/clinical-history/${id}/acept`,{},this.getHttpOptions());
    }

    rejectCita(id: number){
     return  this.http.put(`${this.baseUri}api/doctor/clinical-history/${id}/reject`,{},this.getHttpOptions());
    }

}
