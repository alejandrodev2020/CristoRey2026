import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableFaamComponent } from './table-faam.component';

describe('TableFaamComponent', () => {
  let component: TableFaamComponent;
  let fixture: ComponentFixture<TableFaamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableFaamComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableFaamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
