import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewShoppingComponent } from './preview-shopping.component';

describe('PreviewShoppingComponent', () => {
  let component: PreviewShoppingComponent;
  let fixture: ComponentFixture<PreviewShoppingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviewShoppingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreviewShoppingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
