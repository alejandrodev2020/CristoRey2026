import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DataList } from 'app/shared/models/data-list';
const ELEMENT_DATA: any[] = [];

@Component({
  selector: 'list-generic',
  templateUrl: './list-generic.component.html',
  styleUrls: ['./list-generic.component.scss']
})



export class ListGenericComponent {
    displayedColumns: [];
    listOptionsPage: number[] = [5, 10, 20, 50, 100];
    totalLength: number = 0;
    page : number = 0;
    limit : number = 10;
    dataSource = new MatTableDataSource<any>(ELEMENT_DATA);
    myData : any;



    @Output() pageChange: EventEmitter<any> = new EventEmitter();


    @Input('columns')
    set item1(val: []) {
      this.displayedColumns = val;
    }

    @Input('listOptionsPage')
    set item2(val: number[]) {
      this.listOptionsPage = val;
    }


    @Input('totalLength')
    set item3(val: number) {
      this.totalLength = val;
    }

    @Input('pageIndex')
    set item4(val: number) {
      this.page = val;
    }

    @Input('pageSize')
    set item5(val: number) {
      this.limit = val;
    }

    @Input('dataSource')
    set item6(val: any) {
      this.dataSource.data = val;
    }

    @Input('data')
    set item7(val: any) {
      this.myData = val;
    }



    @Input('actions')
    set item8(val: any) {
      this.myData = val;
    }


    trackByKey(index: number, item: any) {
        return item.key;  // Usa la clave de cada columna como identificador único
    }

    get columnKeys(): string[] {
        return Object.keys(this.displayedColumns);
    }

    pageEvent(event) {
        this.limit = event.pageSize;
        this.page = event.pageIndex;
        this.pageChange.emit(event);
    }
    getValueByPath(item: any, path: string): any {
        return path.split('.').reduce((acc, part) => acc && acc[part], item);
      }

}
