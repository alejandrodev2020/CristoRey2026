import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BaseService } from 'app/shared/services/base.service';
import { Product } from 'app/modules/product/models/product';

@Injectable({
    providedIn: "root"
})


export class OptionsService extends BaseService {

    constructor(http: HttpClient) {
        super(http); 
    }

    getListOptions() {
        return this.http.get(`${this.baseUri}api/options/list?limit=1000&page=0`, this.getHttpOptions());
    }

    store(data: Product) {
        if (data?.id) {
            return this.http.put(`${this.baseUri}api/options/${data.id}`, data,this.getHttpOptions());
        }
        else {
            return this.http.post(`${this.baseUri}api/options`, data,this.getHttpOptions());
        }
    }

    storeDiasnostic(data: Product) {
        if (data?.id) {
            return this.http.put(`${this.baseUri}api/options/${data.optionId}/diasnostic/${data.id}`, data,this.getHttpOptions());
        }
        else {
            return this.http.put(`${this.baseUri}api/options/${data.optionId}/diasnostic`, data,this.getHttpOptions());
        }
    }

    storeTratament(data: Product) {
        if (data?.id) {
            return this.http.put(`${this.baseUri}api/options/${data.optionId}/tratament/${data.id}`, data,this.getHttpOptions());
        }
        else {
            return this.http.put(`${this.baseUri}api/options/${data.optionId}/tratament`, data,this.getHttpOptions());
        }
    }

    getById(id: number) {
        return this.http.get<Product>(`${this.baseUri}api/options/${id}`,this.getHttpOptions());
    }

    getDiasnosticById(id: number) {
        return this.http.get<Product>(`${this.baseUri}api/options/diasnostic/${id}`,this.getHttpOptions());
    }

    lowById(id: number) {
        return this.http.put(`${this.baseUri}api/options/${id}/low`, {},this.getHttpOptions());
    }


    getListDiasnosticByOptionId(id: number) {
        return this.http.get(`${this.baseUri}api/options/${id}/diasnostic/list`, this.getHttpOptions());
    }

    getListTratamientByOptionId(id: number) {
        return this.http.get(`${this.baseUri}api/options/${id}/tratament/list`, this.getHttpOptions());
    }



}
