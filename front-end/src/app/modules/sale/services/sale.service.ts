import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from 'environments/enviroments';
import { of } from 'rxjs';
import { BaseService } from 'app/shared/services/base.service';

const httpOptions = {
    headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'authkey',
        'userid': '1'
    })
};

const httpOptions2 = {
    headers: new HttpHeaders({
        'Authorization': 'Bearer EAACgOY6LeWMBANPLSZAQm6ixiweWA25SzybGaUOQf6iBLUMJDtj1ByGaJej1FP1MySZBpyTZABXmngjaOl1alruVqhoMiZCAeFsDcp61Hkg6SrTucgWcSZBuozcqo7DApukjbfWDZALfC4IysDX0qn7M68cQIhK2P7kyy8RjIiDJ79Wbd3aZC3IuALOX3KPEJsMuI6mRojAni6P9xg6Bsau',

    })
};

@Injectable({
    providedIn: "root"
})


export class SaleService  extends BaseService {

    constructor(http: HttpClient) {
        super(http); // Llama al constructor del servicio base
    }

    getListSale(query: string) {
        return this.http.get(`${this.baseUri}api/sale/list${query}`, this.getHttpOptions());
    }
    getListSaleAssistant(query: string) {
        return this.http.get(`${this.baseUri}api/sale/list/assistant${query}`, this.getHttpOptions());
    }
    store(data: any) {
        if (data?.id) {
            return this.http.put(`${this.baseUri}api/product/${data.id}`, data,this.getHttpOptions());
        }
        else {
            return this.http.post(`${this.baseUri}api/sale`, data,this.getHttpOptions());
        }
    }
    saveQuotation(data: any) {
        return this.http.post(`${this.baseUri}api/sale/quotation`, data,this.getHttpOptions());
    }

    getById(id: number) {
        return this.http.get<any>(`${this.baseUri}api/sale/${id}`,this.getHttpOptions());
    }

    getSaleCreditById(id: number) {
        return this.http.get<any>(`${this.baseUri}api/sale/credit/` + id);
    }


    getSaleStatus() {
        return of([
            {
                id: 1,
                name: 'Reservado'
            },
            {
                id: 2,
                name: 'Entregado'
            },
            {
                id: 3,
                name: 'Pendiente'
            },
            {
                id: 4,
                name: 'Con Deuda'
            },
            {
                id: 5,
                name: 'Finalizado'
            }
        ])
    }


    lowById(id: number) {
        return this.http.put(`${this.baseUri}api/product/${id}/low`, {});
    }

    sendMessageWhatsApp(data: any) {
        var data2 = {
            "token": "im3q0x5rf48k4i8e",
            "to": data.to,
            "body": "HOla Como EStas",
            "priority": 10,
            "referenceId": "",
            "msgId": "",
            "mentions": ""
        };
        return this.http.post(`https://api.ultramsg.com/instance55483/messages/chat`, data2, httpOptions2);
    }

    getAllSaleByWarehouseAndPettyCash(warehouseId: number, pettyCashId: number,query: string) {
        return this.http.get(`${this.baseUri}api/sale/warehouse/${warehouseId}/petty-cash/${pettyCashId}/list${query}`, this.getHttpOptions());
    }

    generateReportingPdfSaleById(data: any) {
        const httpOptions2 = {
            responseType: 'arraybuffer' as 'json',
        };
        return this.http.post(`https://report.takysoft.com/api/pdf-termic`, data, httpOptions2);
    }

    generateReportingPdfSaleById2() {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            }),
            responseType: 'blob' as 'json' // Asegúrate de que la respuesta sea del tipo blob
        };

        return this.http.get(`${this.baseUri}api/reporting/sales`, httpOptions);
    }


    generateReportingPdfSaleById3(id : number) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            }),
            responseType: 'blob' as 'json' // Asegúrate de que la respuesta sea del tipo blob
        };

        return this.http.get(`${this.baseUri}api/reporting/sale/${id}`, httpOptions);
    }

    
    generateReportingPdfSaleByIdLetter(id : number) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            }),
            responseType: 'blob' as 'json' // Asegúrate de que la respuesta sea del tipo blob
        };

        return this.http.get(`${this.baseUri}api/reporting/sale/${id}/letter`, httpOptions);
    }

    getSaleLastDay() {
        return this.http.get(`${this.baseUri}api/sale/last-day`, httpOptions);
    }

    savePayment(id: number, data: any) {
        return this.http.post(`${this.baseUri}api/sale/credit/${id}`, data, this.getHttpOptions());
    }
    saveSaleReject(id: number) {
        return this.http.put(`${this.baseUri}api/sale/${id}/low`, this.getHttpOptions());
    }

    getListEarning() {
        return this.http.get<any>(`${this.baseUri}api/earning/list`, this.getHttpOptions());
    }


}
