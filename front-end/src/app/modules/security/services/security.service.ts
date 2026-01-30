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

export class SecurityService {
  baseUri : string = '';
  constructor(private http: HttpClient) {
      this.baseUri = (environment.production)? environment.apiUrlProd: environment.apiUrlLocal;
   }

  getListUser() {
    return this.http.get(`${this.baseUri}api/auth/user/list`, httpOptions);
  }
  getListUserAdmin() {
    return this.http.get(`${this.baseUri}api/auth/user/admin-list`, httpOptions);
  }
  store(data: Provider) {
    if (data?.id) {
      return this.http.put(`${this.baseUri}api/auth/user/${data.id}`, data);
    }
    else {
      return this.http.post(`${this.baseUri}api/auth/user`, data);
    }
  }
  getById(id: number) {
    return this.http.get<Provider>(`${this.baseUri}api/auth/user/` + id);
  }

  lowById(id: number) {
    return this.http.put(`${this.baseUri}api/auth/user/${id}/low`, {});
  }

  getUserById(id : number){
    return this.http.get(`${this.baseUri}api/auth/user/${id}`, httpOptions);
  }

  updateUser(id: number, data:any){
    return this.http.put(`${this.baseUri}api/auth/user/${id}`, data);
  }

}
