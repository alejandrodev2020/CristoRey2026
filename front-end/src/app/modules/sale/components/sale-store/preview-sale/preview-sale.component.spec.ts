import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewSaleComponent } from './preview-sale.component';

describe('PreviewSaleComponent', () => {
  let component: PreviewSaleComponent;
  let fixture: ComponentFixture<PreviewSaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviewSaleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreviewSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
