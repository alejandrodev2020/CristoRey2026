import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnActionsExcelComponent } from './btn-actions-excel.component';

describe('BtnActionsExcelComponent', () => {
  let component: BtnActionsExcelComponent;
  let fixture: ComponentFixture<BtnActionsExcelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BtnActionsExcelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BtnActionsExcelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
