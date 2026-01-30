import { Component, Input } from '@angular/core';

@Component({
  selector: 'btn-export-excel',
  templateUrl: './btn-export-excel.component.html',
  styleUrls: ['./btn-export-excel.component.scss']
})
export class BtnExportExcelComponent {
  label: string = 'Exportar';

  @Input('label')
  set item1(val: any) {
    this.label = val;
  }
}
