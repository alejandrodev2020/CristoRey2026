import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnAddCustonComponent } from './btn-add-custon.component';

describe('BtnAddCustonComponent', () => {
  let component: BtnAddCustonComponent;
  let fixture: ComponentFixture<BtnAddCustonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BtnAddCustonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BtnAddCustonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
