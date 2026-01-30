import {Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { WarehouseService } from 'app/modules/warehouse/services/warehouse.service';
import { Warehouse } from 'app/modules/warehouse/models/warehouse';
const ELEMENT_DATA: Warehouse[] = [];
@Component({
  selector: 'app-warehouse-report',
  templateUrl: './warehouse-report.component.html',
  styleUrls: ['./warehouse-report.component.css']
})
export class WarehouseReportComponent {
  displayedColumns: string[] = ['id', 'name', 'description', 'code','location','isActive','gestionary'];
  dataSource = new MatTableDataSource<Warehouse>(ELEMENT_DATA);
  isFilterVisible: boolean = false;
  searchValue: string = '';
  form: FormGroup;

  @ViewChild(MatPaginator) paginator: MatPaginator

  constructor(private service: WarehouseService,private fb: FormBuilder,
    private router: Router,public dialog: MatDialog) {
      this.form = this.fb.group({
        search: [''],
      });
  
      this.form.get('search')?.valueChanges.subscribe((searchValue) => {
        this.applyFilter(searchValue);
      });

      this.dataSource.filterPredicate = (data, filter) => {
      const firstName =  data.name.toLowerCase().includes(filter.toLowerCase());
      const lastName =  data.code.toLowerCase().includes(filter.toLowerCase());
      return firstName || lastName;
      };      

  }

  applyFilter(searchValue: string) {
    this.searchValue = searchValue;
    this.dataSource.filter = searchValue.trim().toLowerCase(); // Aplicar el filtro
  }

  clearSearch() {
    this.searchValue = '';
    this.form.get('search').setValue('');
 }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  listWarehouse: any[] = [];
  columns: any[] = [];
  actions: any[] = [];
  ngOnInit(): void {
   this.readData();
    this.columns = [
      {
        prop: 'Id',
        value: 'id'
      },
      {
        prop: 'Nombre',
        value: 'name'
      },
      {
        prop: 'Descripción',
        value: 'Description'
      },
      {
        prop: 'Ubicación',
        value: 'ubication'
      },
    ];

  }

  readData(){
    this.service.getAllWarehouse().subscribe((ele: any) => {
      this.dataSource = new MatTableDataSource(ele);
    });
  }

  gestioinaryProduct(id:any) {
    this.router.navigate(['warehouse/warehouse/warehouse-product-report/'+id]);
  }

  senfilter(event: string) {
  }

  toggleFilter() {
    this.isFilterVisible = !this.isFilterVisible;
  }

}
