import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Warehouse } from '../models/warehouse';
import { BaseService } from 'app/shared/services/base.service';


@Injectable({
    providedIn: "root"
})

export class WarehouseService  extends BaseService{   
    constructor(http: HttpClient) {
        super(http); 
    }


    getAllWarehouse() {
        return this.http.get(`${this.baseUri}api/warehouse/list`, this.getHttpOptions());
    }

    getAllProvider(){
        return this.http.get(`${this.baseUri}api/provider/list`, this.getHttpOptions());
    }

    store(data: Warehouse) {
        if (data?.id) {
            return this.http.put(`${this.baseUri}api/warehouse/${data.id}`, data,this.getHttpOptions());
        }
        else {
            return this.http.post(`${this.baseUri}api/warehouse`, data,this.getHttpOptions());
        }
    }
    getById(id: number) {
        return this.http.get<Warehouse>(`${this.baseUri}api/warehouse/` + id,this.getHttpOptions());
    }

    getProductByWarehouseId(id: number, query: string) {
        return this.http.get(`${this.baseUri}api/warehouse/${id}/product${query}`, this.getHttpOptions());
    }

    lowWarehouseById(id: number) {
        return this.http.put(`${this.baseUri}api/warehouse/${id}/low`, {},this.getHttpOptions());
    }

    upWarehouseById(id: number) {
        return this.http.put(`${this.baseUri}api/warehouse/${id}/up`, {},this.getHttpOptions());
    }

    createMovementRequest(data: any) {
        return this.http.post(`${this.baseUri}api/warehouse/movement/request`, data,this.getHttpOptions());
    }
    getListMovementRequest(id: number) {
        return this.http.get(`${this.baseUri}api/warehouse/${id}/movement/request`, this.getHttpOptions());
    }

    getMovementById(id: number) {
        return this.http.get(`${this.baseUri}api/warehouse/movement/${id}/request`, this.getHttpOptions());
    }
    rejectRequestMovement(id: number, data: any) {
        return this.http.put(`${this.baseUri}api/warehouse/movement/${id}/reject`, data, this.getHttpOptions());
    }
    acceptRequestMovement(id: number, data: any) {
        return this.http.put(`${this.baseUri}api/warehouse/movement/${id}/accept`, data, this.getHttpOptions());
    }
    getMovementByProductId(WarehouseId: number, productId : number) {
        return this.http.get(`${this.baseUri}api/warehouse/${WarehouseId}/movement/product/${productId}`, this.getHttpOptions());
    }
    getHistoryByProductId(productId : number) {
        return this.http.get(`${this.baseUri}api/warehouse/batch/product/${productId}`, this.getHttpOptions());
    }
    getWarehouseMovementByWarehouseId(warehouseId : number, query : string) {
        return this.http.get(`${this.baseUri}api/warehouse/${warehouseId}/movement${query}`, this.getHttpOptions());
    }

    generateReportingExcelProductById(id: number, query: string) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            }),
            responseType: 'blob' as 'json'
        };
        return this.http.get(`${this.baseUri}api/reporting/warehouse/${id}/product${query}`, httpOptions);
    }

    UpdatePriceWarehouseProduct(id: number, data: any) {
        return this.http.put(`${this.baseUri}api/warehouse/warehouse-product/${id}/price`, data, this.getHttpOptions());
    }


    removeWarehouseProduct(id: number) {
        return this.http.put(`${this.baseUri}api/warehouse/warehouse-product/${id}/remove`,{}, this.getHttpOptions());
    }


    getWahouseIdByAssistant(){
        return  this.http.get(`${this.baseUri}api/warehouse/assistant-current`,this.getHttpOptions());
    }
    


}
