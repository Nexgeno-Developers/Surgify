import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AskDoctorComponent } from './ask-doctor.component';

describe('AskDoctorComponent', () => {
  let component: AskDoctorComponent;
  let fixture: ComponentFixture<AskDoctorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AskDoctorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AskDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
