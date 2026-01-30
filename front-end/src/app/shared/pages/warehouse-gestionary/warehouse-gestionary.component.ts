import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator,MatPaginatorIntl  } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { WarehouseService } from '../../services/warehouse.service';


const ELEMENT_DATA: PeriodicElement[] = [
  { 
    position: 1,
    name: 'Hydrogen',
    weight: 1.0079,
    symbol: 'H',
    actions : 'TET',
    casa : 'TET',
  },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
  { position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na' },
  { position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg' },
  { position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al' },
  { position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si' },
  { position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P' },
  { position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S' },
  { position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl' },
  { position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar' },
  { position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K' },
  { position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca' },
];




@Component({
  selector: 'app-warehouse-gestionary',
  templateUrl: './warehouse-gestionary.component.html',
  styleUrls: ['./warehouse-gestionary.component.css']
})
export class WarehouseGestionaryComponent implements AfterViewInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol','actions','casa'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  icono = "heroicons_outline";

  board = {
    "id": "2c82225f-2a6c-45d3-b18a-1132712a4234",
    "title": "Admin Dashboard",
    "description": "Roadmap for the new project",
    "icon": "heroicons_outline:template",
    "lastActivity": "2023-03-10T00:00:00.000-04:00",
    "lists": [],
    "labels": [],
    "members": [
      {
        "id": "9c510cf3-460d-4a8c-b3be-bcc3db578c08",
        "name": "Lorraine Barnett",
        "avatar": "assets/images/avatars/female-03.jpg"
      },
      {
        "id": "baa88231-0ee6-4028-96d5-7f187e0f4cd5",
        "name": "Wilkins Gilmore",
        "avatar": "assets/images/avatars/male-03.jpg"
      },
      {
        "id": "18bb18f3-ea7d-4465-8913-e8c9adf6f568",
        "name": "Keith Neal",
        "avatar": "assets/images/avatars/male-02.jpg"
      }
    ]
  };



  constructor(private service: WarehouseService,
    public _MatPaginatorIntl: MatPaginatorIntl,
    private router: Router) {
      this._MatPaginatorIntl.itemsPerPageLabel = 'Seleccione cant. paginas';
     }


  listWarehouse: any[] = [];
  ngOnInit(): void {
    this.service.getAllWarehouse().subscribe((ele: any) => {
      this.listWarehouse = ele;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  store() {
    this.router.navigate(['warehouse/warehouse/store']);
  }

  update(data: any) {
    this.router.navigate(['warehouse/warehouse/store/' + data.id]);
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