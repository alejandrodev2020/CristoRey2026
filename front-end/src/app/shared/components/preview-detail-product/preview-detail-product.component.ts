import { UnitMeasurement } from './../../../modules/product/models/product';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'preview-detail-product',
    templateUrl: './preview-detail-product.component.html',
    styleUrls: ['./preview-detail-product.component.scss']
})
export class PreviewDetailProductComponent {

    image: string | null = 'none';
    name: string = 'none';
    description: string | null = 'none';
    amount: string = 'none';
    unitMeasurementLabel: string = 'none';
    subTotalLabel: string | null = "none";


    /**
     * Establece la imagen que llevara a mostrar
     * @param {string} val - La imagen a mostrar del producto.
     */
    @Input('image')
    set item1(val: string) {
        this.image = val;
    }

    /**
     * Establece El nombre del producto.
     * @param {string} val - La El nombre del producto.
     */
    @Input('name')
    set item2(val: string) {
        this.name = val;
    }

    /**
     * Establece El descripción del producto.
     * @param {string} val - La El descripción del producto.
     */
    @Input('description')
    set item3(val: string) {
        this.description = val;
    }

    /**
     * Establece El cantidad del producto.
     * @param {string} val - La El cantidad del producto.
     */
    @Input('amount')
    set item4(val: string) {
        this.amount = val;
    }

    /**
     * Establece la unidad de medida del producto.
     * @param {string} val - La la unidad de medida del producto.
     */
    @Input('unitMeasurement')
    set item5(val: string) {
        this.unitMeasurementLabel = val;
    }


    /**
     * Establece el subtotal del producto.
     * @param {string} val - La el subtotal del producto.
     */
    @Input('subTotal')
    set item6(val: string) {
        this.subTotalLabel = val;
    }

}
