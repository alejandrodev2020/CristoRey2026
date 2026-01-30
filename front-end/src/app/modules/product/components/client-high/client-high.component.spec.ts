import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientHighComponent } from './client-high.component';

describe('ClientHighComponent', () => {
  let component: ClientHighComponent;
  let fixture: ComponentFixture<ClientHighComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientHighComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientHighComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
