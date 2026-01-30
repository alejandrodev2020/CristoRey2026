import { Component, SimpleChanges, EventEmitter, OnInit, Input, Output, HostListener } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

let ELEMENT_DATA: any[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'table-faam',
  templateUrl: './table-faam.component.html',
  styleUrls: ['./table-faam.component.scss']
})
export class TableFaamComponent implements OnInit {
  @Output() enterPressed: EventEmitter<void> = new EventEmitter<void>();
  @Output() valueChanged: EventEmitter<string> = new EventEmitter<string>();
  dataSource = new MatTableDataSource<any>(ELEMENT_DATA);
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];

  newOb = [
    { column: 'position', label: 'Uno', value: 'position' },
    { column: 'name', label: 'Dos', value: 'name' },
    { column: 'weight', label: 'Tres', value: 'weight' },
    { column: 'symbol', label: 'Cuatro', value: 'symbol' }
  ];
  private _dataList: any[] = [];
  private _columns: any[] = [];
  // dataList: any[] = [];
  // columns: any[] = [];
  // actions: any[] = [];

  @Input()
  set dataList(value: any[]) {
    
    // this._dataList = value;
    // this.updateTable();
    // // this.dataList = value;
    // this.dataSource.data = value; // Asignar datos a la fuente de datos del MatTableDataSource
  }
  updateTable(): void {
    this.dataSource.data = this._dataList;
    this.displayedColumns = this._columns.map(col => col.column);
  }

  @Input()
  set columns(value: any[]) {
    // this.columns = value;
  }

  @Input()
  set actions(value: any[]) {
    this.actions = value;
  }

  screenWidth: number;

  constructor() {}

  ngOnInit(): void {
    this.updateScreenWidth();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.updateScreenWidth();
  }

  updateScreenWidth(): void {
    this.screenWidth = window.innerWidth;
  }
}
