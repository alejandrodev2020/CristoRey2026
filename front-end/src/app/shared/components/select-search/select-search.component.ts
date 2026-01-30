import { ControlValueAccessor, NgControl } from '@angular/forms';
import { Component, Input, OnInit, Output, Self, EventEmitter } from '@angular/core';

@Component({
  selector: 'select-search',
  templateUrl: './select-search.component.html',
  styleUrls: ['./select-search.component.scss']
})
export class SelectSearchComponent implements OnInit, ControlValueAccessor {
  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};
  disabled = false;
  list: any[] = [];
  model: any = null;
  keyField: string = '';
  valueField: string = '';
  placeholder: string = 'Seleccionar registro...';
  isMultiSelect: boolean = false;
  groupBy: string = '';
  materialize: boolean = false;
  isFocusActive: boolean = false; // Añadir esta línea


  constructor(@Self() public ngControl: NgControl) {
    this.ngControl.valueAccessor = this;
  }

  ngOnInit(): void {}

  @Input() set items(value: any[]) {
    this.list = value;
  }

  @Input() set key(value: string) {
    this.keyField = value;
  }

  @Input() set value(value: string) {
    this.valueField = value;
  }

  @Input() set isplaceholder(value: string) {
    this.placeholder = value;
  }

  @Input() set isdisabled(value: boolean) {
    this.disabled = value;
  }
  @Input() set focusActive(value: boolean) { // Añadir un setter para isFocusActive
    this.isFocusActive = value;
  }

  @Input() set MultiSelect(value: boolean) {
    this.isMultiSelect = value;
  }

  writeValue(obj: any): void {
    this.model = obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onItemSelect(item: any): void {
    this.onChange(this.model);
  }

  onSearch(event: any): void {
    // Emitir el evento de búsqueda si es necesario
  }

  showErrors(): string {
    return this.ngControl.invalid && this.ngControl.touched ? 'Obligatorio' : '';
  }
}
