import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewDetailProductComponent } from './preview-detail-product.component';

describe('PreviewDetailProductComponent', () => {
  let component: PreviewDetailProductComponent;
  let fixture: ComponentFixture<PreviewDetailProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviewDetailProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreviewDetailProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
