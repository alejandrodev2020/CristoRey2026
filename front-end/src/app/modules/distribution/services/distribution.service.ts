import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { of } from 'rxjs';
import { BaseService } from 'app/shared/services/base.service';

@Injectable({
    providedIn: "root"
})


export class DistributionService  extends BaseService {

    constructor(http: HttpClient) {
        super(http); // Llama al constructor del servicio base
    }

    getListDistribution(query: string) {
        return this.http.get(`${this.baseUri}api/distribution/list${query}`, this.getHttpOptions());
    }
    getListSaleAssistant(query: string) {
        return this.http.get(`${this.baseUri}api/sale/list/assistant${query}`, this.getHttpOptions());
    }
    store(data: any) {
        if (data?.id) {
            return this.http.put(`${this.baseUri}api/distribution/${data.id}`, data,this.getHttpOptions());
        }
        else {
            return this.http.post(`${this.baseUri}api/distribution`, data,this.getHttpOptions());
        }
    }

    saveOrder(data: any) {
        return this.http.post(`${this.baseUri}api/distribution/order`, data,this.getHttpOptions());
    }
    getListOrders(id: number,query: string) {
        return this.http.get(`${this.baseUri}api/distribution/${id}/orders${query}`, this.getHttpOptions());
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

    getDistributionById(id: number){
        return this.http.get(`${this.baseUri}api/distribution/${id}`, this.getHttpOptions());
    }

    getListDetailOrderDistributionById(id: number){
        return this.http.get(`${this.baseUri}api/distribution/${id}/detail-order?Limit=1000&Page=0`, this.getHttpOptions());
    }

    getDistributionRouteById(id: number){
        return this.http.get(`${this.baseUri}api/distribution/${id}/tracking/list`, this.getHttpOptions());
    }


    lowById(id: number) {
        return this.http.put(`${this.baseUri}api/product/${id}/low`, {});
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
