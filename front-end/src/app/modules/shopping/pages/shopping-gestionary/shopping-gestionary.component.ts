import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Product } from '../../models/product';
import { ShoppingService } from '../../services/shopping.service';
import { OverviewShoppingComponent } from '../../components/overview-shopping/overview-shopping.component';



const ELEMENT_DATA: Product[] = [];
@Component({
  selector: 'app-sales-gestionary',
  templateUrl: './shopping-gestionary.component.html',
  styleUrls: ['./shopping-gestionary.component.scss']
})
export class ShoppingGestionaryComponent implements AfterViewInit{
  displayedColumns: string[] = ['id','warehouse','provider','shoppingDate','amountTotal','isActive','acciones'];
  dataSource = new MatTableDataSource<Product>(ELEMENT_DATA);
  isFilterVisible: boolean = false;
  @ViewChild(MatPaginator) paginator: MatPaginator

  constructor(private service: ShoppingService,
    private router: Router,public dialog: MatDialog) {
  }


  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  totalLength: number = 400;
  data: any[] = [];
  objComplete = null;
  listWarehouse: any[] = [];
  columns: any[] = []; 
  actions: any[] = [];
  ngOnInit(): void {
    let queString = this.CurrentPaginator
    this.service.getAllShopping(queString).subscribe((ele: any) => {
      this.dataSource.data = ele.listShopping; 
      this.data = ele.listShopping;
      this.objComplete = ele;
      this.totalLength = ele.total;
    });
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

    this.actions = [
      'Ver',
      'Editar',
      'Eliminar'
    ];
  }



  createNew() {
    this.router.navigate(['shopping/shopping/store']);
  }

  update(data: any) {
    this.router.navigate(['sale/sale/store/' + data.id]);
  }

  overView(data:any){
    const dialogRef = this.dialog.open(OverviewShoppingComponent, {
       data: {id: data.id},
       maxWidth:"500px",
       maxHeight: '90vh'
    });

    dialogRef.afterClosed().subscribe(result => {
     let tes = result;
    });
  }

  lowWarehouse(data : any){
    if(data?.shoppingStatusId === 2)
    {
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "¡Esta compra ya fue cancelada!",
        text: "Solo se pueden cancelar las compras activas!",
        showConfirmButton: false,
        timer: 1500
      });
    }
    else{
      Swal.fire({
        title: 'Seguro que quiere dar de baja?',
        text: "Recuerda que no estas eliminando permanentemente!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, dar de Baja!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.service.lowById(data.id).subscribe((resp)=>{
            Swal.fire(
              'Baja Exitosa!',
              'Su Almacen se dio de baja exitosamente.',
              'success'
            )
          }); 
        }
      });
    }

  }
 
  page = 0;
  limit = 10;
  queryFilter = '';
  senfilter(event: string) {
    this.resetPaginator();
    this.queryFilter = event;
    let queryString = this.CurrentPaginator + event;
    this.service.getAllShopping(queryString).subscribe((ele: any) => {
      this.dataSource.data = ele.listShopping; 
      this.data = ele.listShopping;
      this.objComplete = ele;
      this.totalLength = ele.total;
    });

  }


  resetPaginator() {
    this.page = 0;
    this.limit = 10;
}

  get CurrentPaginator() {
    return `?Limit=${this.limit}&Page=${this.page}`;
  }

  toggleFilter() {
    this.isFilterVisible = !this.isFilterVisible;
  }
}
