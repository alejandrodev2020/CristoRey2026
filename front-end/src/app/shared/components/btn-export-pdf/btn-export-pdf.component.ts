import { Component, Input } from '@angular/core';

@Component({
  selector: 'btn-export-pdf',
  templateUrl: './btn-export-pdf.component.html',
  styleUrls: ['./btn-export-pdf.component.scss']
})
export class BtnExportPdfComponent {

  
  label: string = 'Exportar';

  @Input('label')
  set item1(val: any) {
    this.label = val;
  }
}
