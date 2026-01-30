import { Component, OnInit, AfterViewInit, ViewChild, Input } from '@angular/core';
import { MatPaginator,MatPaginatorIntl  } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';


const ELEMENT_DATA: PeriodicElement[] = [
  { 
    position: 1,
    name: 'Hydrogen',
    weight: 1.0079,
    symbol: 'H',
    casa : 'TET',
  },
];


@Component({
  selector: 'table-faam3',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements AfterViewInit {


  dataList: any[] = [];
  dataActions: any[] = [];
  dataColumns: columns[] = [];

  @Input('columns')
  set item1(val: columns[]) {
    this.dataColumns = val;
    this.changeColumns();
  }


  @Input('list')
  set item(val: any[]) {
    this.dataList = val;
    if(this.dataList.length > 0){
        this.parseDataToColums();
    }
  }


  @Input('actions')
  set item2(val: any) {
    this.dataActions = val;
  }


  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource<any>(ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public _MatPaginatorIntl: MatPaginatorIntl,
              private router: Router) 
    {
      this._MatPaginatorIntl.itemsPerPageLabel = 'Seleccione cant. paginas';
     }

     ngOnInit(): void {


    }

    parseDataToColums(){

      let cas = this.displayedColumns;
      let temp = this.dataColumns;
      let data = this.dataList;
      let newTable = [];
      this.dataList.map((ele)=>{
         this.convertItem(ele);
      });
    }
    convertItem(row : any){
      let ss :any[]=[];
      let cont = -1;
      let rowConverArr = (Object.entries(row));
      rowConverArr.forEach((element , index )=> {
        let elez = element[0];
        let value = element[1];

        let casa = this.dataColumns.filter((ele)=>{
          if(ele.value === elez){
            return ele;
          }
        });
         ss[cont=cont+1] = casa[0].prop;
         ss[cont=cont+1] = value;
      });
      
      let obj = {};
      return obj;
    }

    changeColumns(){
        this.dataColumns.forEach((ele)=>{
           this.displayedColumns.push(ele.prop);
        });
    }
  

     ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
    }

    getProperty(data : any, currentKey: string): string{ 
      for (const key in data){
           if(key == currentKey)
           {
            return data[key];
           }
      }
    }


}


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  actions ?: string;
  casa ?: string;
}

export interface columns {
  prop?: string;
  value?: string;
}