import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorsSummaryComponent } from './doctors-summary.component';

describe('DoctorsSummaryComponent', () => {
  let component: DoctorsSummaryComponent;
  let fixture: ComponentFixture<DoctorsSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorsSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorsSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
