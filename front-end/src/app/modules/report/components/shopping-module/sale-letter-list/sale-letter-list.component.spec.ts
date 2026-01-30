import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleLetterListComponent } from './sale-letter-list.component';

describe('SaleLetterListComponent', () => {
  let component: SaleLetterListComponent;
  let fixture: ComponentFixture<SaleLetterListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaleLetterListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaleLetterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
