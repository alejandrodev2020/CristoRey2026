import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/enviroments';

@Injectable({
    providedIn: 'root'
})

export class BaseService {
    protected baseUri: string;

    constructor(protected http: HttpClient) {
        this.baseUri = environment.production ? environment.apiUrlProd : environment.apiUrlLocal;
    }

    protected getHttpOptions() {
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });
        return { headers };
    }
}

