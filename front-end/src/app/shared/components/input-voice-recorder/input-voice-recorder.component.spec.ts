import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputVoiceRecorderComponent } from './input-voice-recorder.component';

describe('InputVoiceRecorderComponent', () => {
  let component: InputVoiceRecorderComponent;
  let fixture: ComponentFixture<InputVoiceRecorderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputVoiceRecorderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputVoiceRecorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
