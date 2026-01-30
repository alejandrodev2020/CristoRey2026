import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Product } from '../models/product';
import { BaseService } from 'app/shared/services/base.service';

@Injectable({
    providedIn: "root"
})


export class ProductService extends BaseService {

    constructor(http: HttpClient) {
        super(http); 
    }

    getAllProduct() {
        return this.http.get(`${this.baseUri}api/product/list?limit=1000&page=0`, this.getHttpOptions());
    }
    store(data: Product) {
        if (data?.id) {
            return this.http.put(`${this.baseUri}api/product/${data.id}`, data,this.getHttpOptions());
        }
        else {
            return this.http.post(`${this.baseUri}api/product`, data,this.getHttpOptions());
        }
    }

    getById(id: number) {
        return this.http.get<Product>(`${this.baseUri}api/product/${id}`,this.getHttpOptions());
    }
    
    lowById(id: number) {
        return this.http.put(`${this.baseUri}api/product/${id}/low`, {},this.getHttpOptions());
    }

    saveEquivalenceMassive(id, data) {
        return this.http.post(`${this.baseUri}api/product/${id}/equivalence-massive`, data,this.getHttpOptions());
    }

    storeEquivalence(data: any) {
        return this.http.post(`${this.baseUri}api/product/${data?.productId}/equivalence`, data, this.getHttpOptions());
    }
    updateEquivalence(data: any) {
        return this.http.put(`${this.baseUri}api/product/${data?.productId}/equivalence/${data?.productId}`, data, this.getHttpOptions());
    }
    getionaryStatusItem(data: any) {
        if (data.isActive) {
            return this.http.put(`${this.baseUri}api/product/${data?.productId}/equivalence/${data?.id}/low`, {}, this.getHttpOptions());
        }
        else {
            return this.http.put(`${this.baseUri}api/product/${data?.productId}/equivalence/${data?.id}/active`, {}, this.getHttpOptions());
        }
    }

    getAllProductEquivalence(id: number) {
        return this.http.get(`${this.baseUri}api/product/${id}/equivalence`, this.getHttpOptions());
    }

    getWarehouseProductEquivalence(id: number) {
        return this.http.get(`${this.baseUri}api/warehouse/product/${id}/equivalence`, this.getHttpOptions());
    }

    storeProductMassive(data: any) {
        return this.http.post(`${this.baseUri}api/configuration/save/massive`, data, this.getHttpOptions());
    }

    getListWarehouseProductEquivalence(id: number) {
        return this.http.get(`${this.baseUri}api/warehouse/warehouse-product/${id}/equivalences`, this.getHttpOptions());
    }

    selectFavorite(productId: number,id: number) {
        return this.http.put(`${this.baseUri}api/product/${productId}/equivalence/${id}/favorite`, {}, this.getHttpOptions());
    }
    selectPrint(productId: number,id: number) {
        return this.http.put(`${this.baseUri}api/product/${productId}/equivalence/${id}/print`, {}, this.getHttpOptions());
    }

}
