import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { TableComponent } from './components/table/table.component';
import { InputTextComponent } from './components/input-text/input-text.component';
import { InputNumberComponent } from './components/input-number/input-number.component';
import { InputDecimalComponent } from './components/input-decimal/input-decimal.component';
import { InputDateComponent } from './components/input-date/input-date.component';
import { InputTextareaComponent } from './components/input-textarea/input-textarea.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule } from '@angular/material/core';
import { MatStepperModule } from '@angular/material/stepper';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatCardModule } from "@angular/material/card";
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FilterPipe } from './tools/pipe/filter.pipe';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { DateFormatPipe } from './tools/pipe/date-format.pipe';
import { DateFormatHoursPipe } from './tools/pipe/date-format-hours.pipe';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSidenavModule  } from '@angular/material/sidenav';
import { ScrollingModule } from '@angular/cdk/scrolling';
import {CdkVirtualScrollViewport} from "@angular/cdk/scrolling";
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { NgApexchartsModule } from 'ng-apexcharts';
import { BtnExportPdfComponent } from './components/btn-export-pdf/btn-export-pdf.component';
import { BtnExportWhatsappComponent } from './components/btn-export-whatsapp/btn-export-whatsapp.component';
import { BtnExportExcelComponent } from './components/btn-export-excel/btn-export-excel.component';
import {MatTabsModule} from '@angular/material/tabs';
import { ChipsPersonComponent } from './components/chips-person/chips-person.component';
import { ChipsFaamComponent } from './components/chips-faam/chips-faam.component';
import { CardPaymentTypeComponent } from './components/card-payment-type/card-payment-type.component';
import { QrCodeImageComponent } from './components/qr-code-image/qr-code-image.component';
import { BtnGenericComponent } from './components/btn-generic/btn-generic.component';
import { MatSortModule } from '@angular/material/sort';
import { BtnGenericSquareComponent } from './components/btn-generic-square/btn-generic-square.component';
import { PopupAlertPackageComponent } from './components/popup-alert-package/popup-alert-package.component';
import { TableFaamComponent } from './components/table-faam/table-faam.component';
import { CustomNumberPipe } from './tools/pipe/customNumber.pipe';
import { CardStatusViewComponent } from './components/card-status-view/card-status-view.component';
import { CardInfoLabelComponent } from './components/card-info-label/card-info-label.component';
import { InputVoiceRecorderComponent } from './components/input-voice-recorder/input-voice-recorder.component';
import { TruncatePipe } from './tools/pipe/truncate.pipe';
import { ChipsInfoLabelComponent } from './components/chips-info-label/chips-info-label.component';
import { BtnAddCustonComponent } from './components/btn-add-custon/btn-add-custon.component';
import { BtnActionsComponent } from './components/btn-actions/btn-actions.component';
import { SelectSearchComponent } from './components/select-search/select-search.component';
import { InputAmountCashComponent } from './components/input-amount-cash/input-amount-cash.component';
import { InputInvoiceDecimalComponent } from './components/input-invoice-decimal/input-invoice-decimal.component';
import { PreviewAmountCashComponent } from './components/preview-amount-cash/preview-amount-cash.component';
import { PreviewDetailProductComponent } from './components/preview-detail-product/preview-detail-product.component';
import { ListGenericComponent } from './components/list-generic/list-generic.component';
import { DynamicPipe } from './tools/pipe/dynamic.pipe';
import { TablerIconsComponent } from './components/tabler-icons/tabler-icons.component';
import { DecimalMaskDirective } from './directives/decima-number.directive';
import { DecimalNumberDirective } from './directives/decimal-number.directive';
import { DecimalNumberComponent } from './components/decimal-number/decimal-number.component';
import { BtnActionsWhatsappComponent } from './components/btn-actions-whatsapp/btn-actions-whatsapp.component';
import { BtnActionsPdfComponent } from './components/btn-actions-pdf/btn-actions-pdf.component';
import { BtnActionsExcelComponent } from './components/btn-actions-excel/btn-actions-excel.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatTableModule,
        MatPaginatorModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatRippleModule,
        MatRadioModule,
        MatStepperModule,
        MatSelectModule,
        MatDividerModule,
        MatCheckboxModule,
        MatGridListModule,
        MatCardModule,
        MatIconModule,
        MatTableModule,
        MatPaginatorModule,
        MatChipsModule,
        MatAutocompleteModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatButtonToggleModule,
        MatSlideToggleModule,
        MatSidenavModule,
        CdkVirtualScrollViewport,
        ScrollingModule,
        MatExpansionModule,
        MatSnackBarModule,
        MatProgressBarModule,
        NgApexchartsModule,
        MatTabsModule,
        MatSortModule,

        // QRCodeModule,

        // FilterPipe

                // BrowserAnimationsModule,
    ],
    exports: [
        CommonModule,
        FormsModule,
        MatIconModule,
        ReactiveFormsModule,
        TableComponent,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatRippleModule,
        MatRadioModule,
        MatStepperModule,
        MatSelectModule,
        MatDividerModule,
        MatCheckboxModule,
        MatGridListModule,
        MatCardModule,
        MatTableModule,
        MatPaginatorModule,
        MatChipsModule,
        MatAutocompleteModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatButtonToggleModule,
        MatSlideToggleModule,
        MatSidenavModule,
        CdkVirtualScrollViewport,
        ScrollingModule,
        NgApexchartsModule,
        MatTabsModule,
        MatSortModule,
        InputDecimalComponent,
        DecimalNumberComponent,
        InputNumberComponent,
        // QRCodeModule,

        FilterPipe ,
        MatExpansionModule,
        MatSnackBarModule,
        MatProgressBarModule,
        DateFormatPipe,
        DateFormatHoursPipe,
        CustomNumberPipe,
        TruncatePipe,
        DynamicPipe,
        /**
         * Compónentes reutlizables
         */
        SelectSearchComponent,
        InputTextComponent,
        BtnExportExcelComponent,
        BtnExportPdfComponent,
        BtnExportWhatsappComponent,
        ChipsFaamComponent,
        CardPaymentTypeComponent,
        CardStatusViewComponent,
        QrCodeImageComponent,
        BtnGenericComponent,
        BtnGenericSquareComponent,
        TableFaamComponent,
        CardInfoLabelComponent,
        InputVoiceRecorderComponent,
        ChipsInfoLabelComponent,
        BtnAddCustonComponent,
        BtnActionsComponent,
        InputAmountCashComponent,
        InputInvoiceDecimalComponent,
        PreviewAmountCashComponent,
        PreviewDetailProductComponent,
        ListGenericComponent,
        TablerIconsComponent,
        BtnActionsWhatsappComponent,
        BtnActionsPdfComponent,
        BtnActionsExcelComponent
    ],
    providers:[
        DateFormatPipe,
        TruncatePipe,
        DynamicPipe,
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: [InputTextComponent,InputDecimalComponent],
            multi: true,
        }
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    declarations: [
        TableComponent,
        InputTextComponent,
        InputNumberComponent,
        InputDecimalComponent,
        InputDateComponent,
        InputTextareaComponent,
        FilterPipe,
        DateFormatPipe,
        DateFormatHoursPipe,
        CustomNumberPipe,
        BtnExportPdfComponent,
        BtnExportWhatsappComponent,
        BtnExportExcelComponent,
        ChipsPersonComponent,
        ChipsFaamComponent,
        CardPaymentTypeComponent,
        QrCodeImageComponent,
        BtnGenericComponent,
        BtnGenericSquareComponent,
        PopupAlertPackageComponent,
        TableFaamComponent,
        CardStatusViewComponent,
        CardInfoLabelComponent,
        InputVoiceRecorderComponent,
        TruncatePipe,
        ChipsInfoLabelComponent,
        BtnAddCustonComponent,
        BtnActionsComponent,
        SelectSearchComponent,
        InputAmountCashComponent,
        InputInvoiceDecimalComponent,
        PreviewAmountCashComponent,
        PreviewDetailProductComponent,
        ListGenericComponent,
        DynamicPipe,
        TablerIconsComponent,
        DecimalMaskDirective,
        DecimalNumberDirective,
        DecimalNumberComponent,
        InputNumberComponent,
        BtnActionsWhatsappComponent,
        BtnActionsPdfComponent,
        BtnActionsExcelComponent
  ]
})
export class SharedModule{}
