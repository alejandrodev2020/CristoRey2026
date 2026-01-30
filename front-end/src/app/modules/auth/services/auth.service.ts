import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/enviroments';
const baseUrl = 'http://localhost:8080/api/tutorials';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUri : string = '';
  constructor(private http: HttpClient) {
    this.baseUri = (environment.production)? environment.apiUrlProd: environment.apiUrlLocal;
   }

  login(data:any): Observable<any> {
    return new Observable(x=>x.next({user:"admin",id:"admin"}))
  }  

  singIn(data:any){
      return  this.http.post(`${this.baseUri}api/auth/user/loggin`,data);  
 }

 
}
