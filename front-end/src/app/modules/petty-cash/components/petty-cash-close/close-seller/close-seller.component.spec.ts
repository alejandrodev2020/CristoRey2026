import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CloseSellerComponent } from './close-seller.component';

describe('CloseSellerComponent', () => {
  let component: CloseSellerComponent;
  let fixture: ComponentFixture<CloseSellerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CloseSellerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CloseSellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
