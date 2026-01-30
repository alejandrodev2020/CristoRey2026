import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CloseAdminComponent } from './close-admin.component';

describe('CloseAdminComponent', () => {
  let component: CloseAdminComponent;
  let fixture: ComponentFixture<CloseAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CloseAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CloseAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
