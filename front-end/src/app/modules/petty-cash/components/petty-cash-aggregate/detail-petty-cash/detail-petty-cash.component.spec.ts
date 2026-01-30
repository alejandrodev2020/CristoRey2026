import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailPettyCashComponent } from './detail-petty-cash.component';

describe('DetailPettyCashComponent', () => {
  let component: DetailPettyCashComponent;
  let fixture: ComponentFixture<DetailPettyCashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailPettyCashComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailPettyCashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
