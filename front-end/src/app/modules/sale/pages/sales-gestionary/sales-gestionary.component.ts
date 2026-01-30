import { DataList } from 'app/shared/models/data-list';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { PettyCashService } from 'app/modules/petty-cash/services/petty-cash.service';
import Swal from 'sweetalert2';
import { OverviewSaleComponent } from '../../components/overview-sale/overview-sale.component';
import { Product } from '../../models/product';
import { SaleService } from '../../services/sale.service';
import { roleCode } from 'app/modules/auth/models/plan-professional/role-code';
import { property } from 'lodash';
import { DateFormatHoursPipe } from 'app/shared/tools/pipe/date-format-hours.pipe';
import { PreviewSaleWhatsappComponent } from '../../components/preview-sale-whatsapp/preview-sale-whatsapp.component';



export interface Sale {
    id: number | null;
    name: string;
    description: string;
    code: string;
    expired: Date;
    purcharsePrice: string | null;
    salePrice: string | null;
    categoryId: number | null;
}

const ELEMENT_DATA: Product[] = [];
@Component({
    selector: 'app-sales-gestionary',
    templateUrl: './sales-gestionary.component.html',
    styleUrls: ['./sales-gestionary.component.scss']
})
export class SalesGestionaryComponent implements AfterViewInit {
    displayedColumns: string[] = ['order',  'client', 'saleDate', 'amountTotal', 'saleType', 'paymentType','isActive', 'acciones'];
    dataSource = new MatTableDataSource<any>(ELEMENT_DATA);
    dataValue: any[] = [];

    warehouseId: number;
    PettyCashId: number;
    data: any[] = [];
    screenWidth: number = 0;
    isPhone: boolean = false;
    isFilterVisible: boolean = false;
    isAdmin: boolean = false;

    @ViewChild(MatPaginator) paginator: MatPaginator

    listOptionsPage: number[] = [5, 10, 20, 50, 100];
    totalLength: number = 400;
    page = 0;
    limit = 10;
    queryFilter = '';

    objComplete = null;

    constructor(private service: SaleService,
        private router: Router,
        public dialog: MatDialog,
        private servicePettyCash: PettyCashService) {
    }


    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
        this.dataSource.filter = filterValue;
    }

    ngAfterViewInit() {
        // this.dataSource.paginator = this.paginator;
    }

    listWarehouse: any[] = [];
    columns: any[] = [];
    actions: any[] = [];

    ngOnInit(): void {
        let role = localStorage.getItem('role');
        let userLogged = localStorage.getItem('userLogged');
        let roleJson = JSON.parse(role);
        let userJson = JSON.parse(userLogged);
        this.screenWidth = window.innerWidth;
        if (this.screenWidth <= 599) {
            this.isPhone = true;
        }
        else {
            this.isPhone = false;
        }

        if (roleJson.id == roleCode.admin) {
            this.isAdmin = true;
            this.displayedColumns.splice(1, 0, 'warehouse');
            // this.displayedColumns['warehouse'] = { label: 'warehouse', value: '3', maxWidth: '200px' };


            this.getSale(this.CurrentPaginator);
        }
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

    getSale(queryString: string) {
        if (this.isAdmin) {
            this.service.getListSale(queryString).subscribe((ele: any) => {
                this.dataSource.data = ele.listSale;
                this.data = ele.listSale;
                this.objComplete = ele;
                this.totalLength = ele.total;
            });
        }
        else {
            this.service.getAllSaleByWarehouseAndPettyCash(this.warehouseId, this.PettyCashId, queryString).subscribe((ele: any) => {
                this.dataSource.data = ele.listSale;
                this.data = ele.listSale;
                this.objComplete = ele;
                this.totalLength = ele.total;
            });
        }

    }

    senfilter(event: any) {
        this.resetPaginator();
        this.queryFilter = event;
        let queryString = this.CurrentPaginator + event;
        this.getSale(queryString);
    }

    resetPaginator() {
        this.page = 0;
        this.limit = 10;
    }

    pageEvent(event) {
        this.limit = event.pageSize;
        this.page = event.pageIndex;
        this.getSale(this.CurrentPaginator + this.queryFilter);
    }

    get CurrentPaginator() {
        return `?Limit=${this.limit}&Page=${this.page}`;
    }


    createNew() {
        this.router.navigate(['sale/sale/store']);
    }

    update(data: any) {
        this.router.navigate(['sale/sale/store/' + data.id]);
    }

    overView(data: any) {
        const dialogRef = this.dialog.open(OverviewSaleComponent, {
            panelClass: 'custom-container',
            maxWidth: '90vw',
            width:'450px',
            maxHeight:'85vh',
            data: { id: data.id },
        });

        dialogRef.afterClosed().subscribe(result => {
            let tes = result;
        });
    }

    toggleFilter() {
        this.isFilterVisible = !this.isFilterVisible;
    }

    lowWarehouse(data: any) {
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
                this.service.saveSaleReject(data.id).subscribe((resp) => {
                    this.ngOnInit();
                    Swal.fire(
                        'Baja Exitosa!',
                        'Su Almacen se dio de baja exitosamente.',
                        'success'
                    );
                })

            }
        })
    }

    dowloadTermic(data :any): void {
        this.service.generateReportingPdfSaleById3(data?.id).subscribe(
            (response: Blob) => {
                const fileURL = URL.createObjectURL(response);
                window.open(fileURL, '_blank');
                setTimeout(() => {
                    URL.revokeObjectURL(fileURL);
                }, 100);
            },
            err => {
                console.error('Error al descargar el PDF:', err);
            });
    }

       SendMessageWhatsApp(data: any) {
            let validNumber = data?.client?.phone && (data.client.phone.length === 8);
            if (validNumber != null || validNumber) {
                // Swal.fire({
                //     title: 'El cliente "' + this.saleOrder.client.firstName + '"  tiene el numero:' + this.saleOrder?.client?.phone,
                //     showDenyButton: true,
                //     showCancelButton: true,
                //     cancelButtonText: 'Cancelar',
                //     confirmButtonText: 'Enviar',
                //     denyButtonText: `Enviar a otro numero`,
                // }).then((result) => {
                //     if (result.isConfirmed) {
                //         const dialogRef = this.dialog.open(PreviewSaleWhatsappComponent, {
                //             maxWidth: '90vw',
                //             autoFocus: false,
                //             maxHeight: '90vh',
                //             width:'50px',
                //             data: {
                //                 order: this.saleOrder,
                //                 phone: this.saleOrder?.client?.phone
                //             },
                //         });
                //         dialogRef.afterClosed().subscribe(result => {
                //             if (result) {
                //                 Swal.fire({
                //                     position: 'top-end',
                //                     icon: 'success',
                //                     title: 'Se Envió el comprobante Exitosamente',
                //                     showConfirmButton: false,
                //                     timer: 1500
                //                 })
                //                 this.dialogRef.close();
                //             }
                //             else {
                //                 Swal.fire({
                //                     icon: 'error',
                //                     title: 'Oops...',
                //                     text: 'Ocurrio un error al enviar'
                //                 })
                //             }
                //         });
                //     }
                //     else if (result.isDenied) {
                //         Swal.fire({
                //             title: 'Ingrese nuevo numero',
                //             input: 'text',
    
                //             inputAttributes: {
                //                 autocapitalize: 'off'
                //             },
                //             showCancelButton: true,
                //             cancelButtonText: 'Cancelar',
                //             confirmButtonText: 'Enviar',
                //             showLoaderOnConfirm: true,
                //             preConfirm: (login) => {
                //                 const dialogRef = this.dialog.open(PreviewSaleWhatsappComponent, {
                //                     autoFocus: false,
                //                     maxHeight: '90vh',
                //                     maxWidth: '90vh',
                //                     width:'450px',
                //                     data: {
                //                         order: this.saleOrder,
                //                         phone: login
                //                     },
                //                 });
    
                //                 dialogRef.afterClosed().subscribe(result => {
                //                     if (result.statusCode === "COD000") {
                //                         Swal.fire({
                //                             position: 'top-end',
                //                             icon: 'success',
                //                             title: 'Se Envió el comprobante Exitosamente',
                //                             showConfirmButton: false,
                //                             timer: 1500
                //                         })
                //                         this.dialogRef.close();
                //                     }
                //                     else {
                //                         Swal.fire({
                //                             icon: 'error',
                //                             title: 'Oops...',
                //                             text: 'Ocurrio un error al enviar'
                //                         })
                //                     }
                //                 });
                //             },
                //             allowOutsideClick: () => !Swal.isLoading()
                //         }).then((result) => {
                //             if (result.isConfirmed) {
                //             }
                //         })
                //     }
                // });
            }
            else {
                Swal.fire({
                    title: 'Ingrese el numero destino',
                    input: 'text',
                    inputAttributes: {
                        autocapitalize: 'off'
                    },
                    showCancelButton: true,
                    cancelButtonText: 'Cancelar',
                    confirmButtonText: 'Enviar',
                    showLoaderOnConfirm: true,

                    
                    preConfirm: (numer) => {
                        Swal.close();
                        const dialogRef = this.dialog.open(PreviewSaleWhatsappComponent, {
                            autoFocus: false,
                            maxHeight: '90vh',
                            maxWidth: '90vw',
                            width:'450px',
                            data: {
                                order: data,
                                phone: numer
                            },
                        });
    
                        dialogRef.afterClosed().subscribe(result => {
                            if (result) {
                                Swal.fire({
                                    position: 'top-end',
                                    icon: 'success',
                                    title: 'Se Envió el comprobante Exitosamente',
                                    showConfirmButton: false,
                                    timer: 1500
                                })
                                // this.dialogRef.close();
                            }
                            else {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Oops...',
                                    text: 'Ocurrio un error al enviar'
                                })
                            }
                        });
    
                        return false;
                    },
    
                    allowOutsideClick: () => !Swal.isLoading()
                }).then((result) => {
                });
            }
    
        }



}
