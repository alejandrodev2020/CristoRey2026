import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Provider } from '../models/provider';
import { BaseService } from 'app/shared/services/base.service';
import { AuthStorageService } from 'app/modules/auth/services/authStorage.service';


@Injectable({
  providedIn: "root"
})


export class DoctorService extends BaseService {
  constructor(http: HttpClient, authStorage: AuthStorageService) {
    super(http, authStorage);
  }

  getListDoctors(queryString: string) {
    return this.http.get(`${this.baseUri}api/doctor/list${queryString}`, this.getHttpOptions());
  }

  store(data: Provider) {
    if (data?.id) {
      return this.http.put(`${this.baseUri}api/doctor/${data.id}`, data, this.getHttpOptions());
    }
    else {
      return this.http.post(`${this.baseUri}api/doctor`, data, this.getHttpOptions());
    }
  }

  getById(id: number) {
    return this.http.get<Provider>(`${this.baseUri}api/doctor/` + id, this.getHttpOptions());
  }

  lowById(id: number) {
    return this.http.put(`${this.baseUri}api/doctor/${id}/low`, {}, this.getHttpOptions());
  }

  highById(id: number) {
    return this.http.put(`${this.baseUri}api/doctor/${id}/up`, {}, this.getHttpOptions());
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
