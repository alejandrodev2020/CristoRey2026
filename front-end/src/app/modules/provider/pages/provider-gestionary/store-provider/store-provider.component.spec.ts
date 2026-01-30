import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreProviderComponent } from './store-provider.component';

describe('StoreProviderComponent', () => {
  let component: StoreProviderComponent;
  let fixture: ComponentFixture<StoreProviderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreProviderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoreProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
