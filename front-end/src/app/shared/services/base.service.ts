import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/enviroments';
import { AuthStorageService } from 'app/modules/auth/services/authStorage.service';

@Injectable({
    providedIn: 'root'
})

export class BaseService {
    protected baseUri: string;

    constructor(protected http: HttpClient,
                protected authStorage: AuthStorageService
    ) {
        this.baseUri = environment.production ? environment.apiUrlProd : environment.apiUrlLocal;
    }

    protected getHttpOptions() {
        const token = this.authStorage.getToken();
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });
        return { headers };
    }

    protected getHttpOptionsDocument(responseType: 'blob', observe: 'response'): {
        headers: HttpHeaders;
        responseType: 'blob';
        observe: 'response';
    };

    protected getHttpOptionsDocument(responseType: 'json'): { headers: HttpHeaders; responseType: 'json' };

    protected getHttpOptionsDocument(responseType: 'blob'): { headers: HttpHeaders; responseType: 'blob' };


    protected getHttpOptionsDocument(responseType: 'json' | 'blob', observe: 'body' | 'response' = 'body') {
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });

        return {
            headers,
            responseType,
            observe
        } as any;
    }
}