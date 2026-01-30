import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BaseService } from 'app/shared/services/base.service';


@Injectable({
  providedIn: "root"
})


export class ReportService extends BaseService{

  constructor(http: HttpClient) {
    super(http); 
}
getListSaleReport(query : string){ 
   return  this.http.get(`${this.baseUri}api/reporting/sales/data${query}`,this.getHttpOptions());
}

getListShoppingReport(query : string){ 
   return  this.http.get(`${this.baseUri}api/shopping/list${query}`,this.getHttpOptions());
}

getListEarningReport(query : string){
  return  this.http.get(`${this.baseUri}api/reporting/earning/data${query}`,this.getHttpOptions());
}


getEarningByIdReport(id : number){
  return  this.http.get(`${this.baseUri}api/earning/${id}`,this.getHttpOptions());
}




store(data:any){
  if(data?.id){
    return  this.http.put(`${this.baseUri}api/product/${data.id}`,data);
  }
  else{
    return  this.http.post(`${this.baseUri}api/sale`,data);
  }
 }

 getById( id : number){
  return  this.http.get<any>(`${this.baseUri}api/sale/`+ id,this.getHttpOptions());
  }


  generateReportingPdfSale(queryString: string){
    let httpOptions = this.getHttpOptions();

    const specificHttpOptions = {
      ...httpOptions,
      responseType: 'blob' as 'json'
    };
    return  this.http.get<any>(`${this.baseUri}api/reporting/sales${queryString}`,specificHttpOptions);
  }


  lowById( id : number){
    return  this.http.put(`${this.baseUri}api/product/${id}/low`,{});
  }

}
